import axios from 'axios'

const API_KEY = '06c21ec8f8428309f292844e93cce2a7' // In production, this should be in environment variables
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

class WeatherService {
  // Get 5-day weather forecast for a city
  static async getFiveDayForecast(city) {
    try {
      // REAL API CALL - Using OpenWeatherMap 5-day forecast API
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric' // Get temperature in Celsius
        }
      })
      
      return this.processForecastData(response.data)
      
    } catch (error) {
      // FALLBACK TO MOCK DATA for demo purposes
      console.log('API call failed, using mock forecast data for demo:', error.message)
      return this.getMockForecastData(city)
    }
  }

  // Mock forecast data for demonstration
  static getMockForecastData(city) {
    const today = new Date()
    const mockForecast = []
    
    const conditions = ['Clear', 'Clouds', 'Rain', 'Drizzle', 'Snow']
    const descriptions = {
      'Clear': 'clear sky',
      'Clouds': 'scattered clouds',
      'Rain': 'light rain',
      'Drizzle': 'light drizzle',
      'Snow': 'light snow'
    }
    
    for (let i = 1; i <= 5; i++) {
      const forecastDate = new Date(today)
      forecastDate.setDate(today.getDate() + i)
      
      const condition = conditions[Math.floor(Math.random() * conditions.length)]
      const baseTemp = Math.floor(Math.random() * 30) + 5 // 5-35°C
      const minTemp = baseTemp - Math.floor(Math.random() * 8)
      const maxTemp = baseTemp + Math.floor(Math.random() * 8)
      
      mockForecast.push({
        date: forecastDate.toISOString().split('T')[0],
        dayOfWeek: forecastDate.toLocaleDateString('en-US', { weekday: 'short' }),
        minTemp,
        maxTemp,
        condition,
        description: descriptions[condition],
        icon: '01d'
      })
    }
    
    return mockForecast
  }

  // Process 3-hour forecast data into daily summaries
  static processForecastData(data) {
    const dailyForecasts = {}
    
    data.list.forEach(item => {
      // Get the date string (YYYY-MM-DD format)
      const date = item.dt_txt.split(' ')[0]
      
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = {
          date: date,
          temps: [],
          conditions: [],
          icons: [],
          descriptions: []
        }
      }
      
      dailyForecasts[date].temps.push(item.main.temp)
      dailyForecasts[date].conditions.push(item.weather[0].main)
      dailyForecasts[date].icons.push(item.weather[0].icon)
      dailyForecasts[date].descriptions.push(item.weather[0].description)
    })
    
    // Convert to array and process daily data
    const processedForecasts = Object.keys(dailyForecasts)
      .slice(0, 5) // Get only 5 days
      .map(date => {
        const dayData = dailyForecasts[date]
        const temps = dayData.temps
        const minTemp = Math.round(Math.min(...temps))
        const maxTemp = Math.round(Math.max(...temps))
        
        // Get most common weather condition
        const conditionCounts = {}
        dayData.conditions.forEach(condition => {
          conditionCounts[condition] = (conditionCounts[condition] || 0) + 1
        })
        const mainCondition = Object.keys(conditionCounts).reduce((a, b) => 
          conditionCounts[a] > conditionCounts[b] ? a : b
        )
        
        // Get corresponding description
        const conditionIndex = dayData.conditions.findIndex(c => c === mainCondition)
        const description = dayData.descriptions[conditionIndex]
        
        // Get day of week
        const dateObj = new Date(date)
        const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'short' })
        
        return {
          date,
          dayOfWeek,
          minTemp,
          maxTemp,
          condition: mainCondition,
          description,
          icon: dayData.icons[conditionIndex]
        }
      })
    
    return processedForecasts
  }

  static async getWeatherByCity(city) {
    try {
      // REAL API CALL - Using OpenWeatherMap API
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric' // Get temperature in Celsius
        }
      })
      
      // Convert temperature to Kelvin for consistency with existing UI code
      const data = response.data
      data.main.temp = data.main.temp + 273.15
      data.main.feels_like = data.main.feels_like + 273.15
      data.main.temp_min = data.main.temp_min + 273.15
      data.main.temp_max = data.main.temp_max + 273.15
      
      return data
      
    } catch (error) {
      // FALLBACK TO MOCK DATA for demo purposes
      console.log('API call failed, using mock weather data for demo:', error.message)
      return this.getMockWeatherData(city)
    }
  }

  // Mock weather data for demonstration
  static getMockWeatherData(city) {
    const conditions = ['Clear', 'Clouds', 'Rain', 'Drizzle', 'Snow']
    const condition = conditions[Math.floor(Math.random() * conditions.length)]
    const temp = Math.floor(Math.random() * 30) + 275 // 2-32°C in Kelvin
    
    return {
      name: city,
      main: {
        temp: temp,
        feels_like: temp + Math.floor(Math.random() * 4) - 2,
        temp_min: temp - Math.floor(Math.random() * 5),
        temp_max: temp + Math.floor(Math.random() * 5),
        humidity: Math.floor(Math.random() * 40) + 40,
        pressure: Math.floor(Math.random() * 50) + 1000
      },
      weather: [{
        main: condition,
        description: condition === 'Clear' ? 'clear sky' : 
                    condition === 'Clouds' ? 'scattered clouds' :
                    condition === 'Rain' ? 'light rain' :
                    condition === 'Drizzle' ? 'light drizzle' : 'light snow',
        icon: '01d'
      }],
      wind: {
        speed: Math.floor(Math.random() * 10) + 1
      },
      visibility: Math.floor(Math.random() * 5000) + 5000,
      sys: {
        country: 'US'
      }
    }
  }

  // Get weather data by coordinates (for location detection)
  static async getCurrentLocationWeather() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const weather = await this.getWeatherByCoordinates(latitude, longitude);
            resolve(weather);
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          let errorMessage = 'Unable to retrieve your location';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied by user';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
            default:
              errorMessage = 'An unknown error occurred';
              break;
          }
          
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }

  // Get weather by coordinates (latitude, longitude)
  static async getWeatherByCoordinates(lat, lon) {
    try {
      // REAL API CALL - Using coordinates with OpenWeatherMap API
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat: lat,
          lon: lon,
          appid: API_KEY,
          units: 'metric'
        }
      });
      
      // Convert temperature to Kelvin for consistency with existing UI code
      const data = response.data
      data.main.temp = data.main.temp + 273.15
      data.main.feels_like = data.main.feels_like + 273.15
      data.main.temp_min = data.main.temp_min + 273.15
      data.main.temp_max = data.main.temp_max + 273.15
      
      return data;
      
    } catch (error) {
      console.log('API call failed, using mock location weather data for demo:', error.message);
      // FALLBACK TO MOCK DATA for demo purposes
      return this.getMockWeatherData('Your Location');
    }
  }
}

export default WeatherService
