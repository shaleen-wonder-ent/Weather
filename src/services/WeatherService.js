import axios from 'axios'

const API_KEY = '06c21ec8f8428309f292844e93cce2a7' // In production, this should be in environment variables
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

class WeatherService {
  // Cache for forecast data to reduce API calls
  static forecastCache = new Map()
  static FORECAST_CACHE_DURATION = 5 * 60 * 1000 // 5 minutes in milliseconds

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
      // For demo purposes, provide mock data if API fails
      if (error.code === 'ERR_NETWORK' || error.message.includes('fetch')) {
        console.warn('API call failed, using mock data for demo:', error.message)
        return this.getMockWeatherData(city)
      }
      
      if (error.response?.status === 404) {
        throw new Error(`City "${city}" not found. Please check the spelling and try again.`)
      } else if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.')
      } else {
        throw new Error('Unable to fetch weather data. Please try again later.')
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
      console.error('Error fetching weather by coordinates:', error);
      // For demo purposes, provide mock data if API fails
      if (error.code === 'ERR_NETWORK' || error.message.includes('fetch')) {
        console.warn('API call failed, using mock data for demo:', error.message)
        return this.getMockWeatherData('Current Location')
      }
      
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      } else {
        throw new Error('Failed to fetch weather data for your location');
      }
    }
  }

  // Get 5-day weather forecast by city name
  static async getFiveDayForecast(city) {
    // Check cache first
    const cacheKey = `forecast_${city.toLowerCase()}`
    const cached = this.forecastCache.get(cacheKey)
    
    if (cached && (Date.now() - cached.timestamp) < this.FORECAST_CACHE_DURATION) {
      return cached.data
    }

    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric'
        }
      })
      
      const processedData = this.processForecastData(response.data)
      
      // Cache the processed data
      this.forecastCache.set(cacheKey, {
        data: processedData,
        timestamp: Date.now()
      })
      
      return processedData
      
    } catch (error) {
      // For demo purposes, return mock data if API fails
      console.warn('API call failed, using mock data:', error.message)
      return this.getMockForecastData(city)
    }
  }

  // Get 5-day weather forecast by coordinates
  static async getFiveDayForecastByCoords(lat, lon) {
    // Check cache first
    const cacheKey = `forecast_${lat}_${lon}`
    const cached = this.forecastCache.get(cacheKey)
    
    if (cached && (Date.now() - cached.timestamp) < this.FORECAST_CACHE_DURATION) {
      return cached.data
    }

    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat: lat,
          lon: lon,
          appid: API_KEY,
          units: 'metric'
        }
      })
      
      const processedData = this.processForecastData(response.data)
      
      // Cache the processed data
      this.forecastCache.set(cacheKey, {
        data: processedData,
        timestamp: Date.now()
      })
      
      return processedData
      
    } catch (error) {
      // For demo purposes, return mock data if API fails
      console.warn('API call failed, using mock data:', error.message)
      return this.getMockForecastData('Current Location')
    }
  }

  // Process forecast data from 3-hour intervals to daily summaries
  static processForecastData(apiData) {
    const dailyForecasts = new Map()
    
    // Group forecasts by day
    apiData.list.forEach(forecast => {
      const date = new Date(forecast.dt * 1000)
      const dateKey = date.toDateString()
      
      if (!dailyForecasts.has(dateKey)) {
        dailyForecasts.set(dateKey, {
          date: dateKey,
          forecasts: [],
          temps: [],
          conditions: []
        })
      }
      
      const dayData = dailyForecasts.get(dateKey)
      dayData.forecasts.push(forecast)
      dayData.temps.push(forecast.main.temp)
      dayData.conditions.push({
        main: forecast.weather[0].main,
        description: forecast.weather[0].description,
        icon: forecast.weather[0].icon,
        count: 1
      })
    })
    
    // Convert to daily summary format
    const processedDays = Array.from(dailyForecasts.values()).slice(0, 5).map(day => {
      // Calculate min/max temperatures
      const minTemp = Math.min(...day.temps)
      const maxTemp = Math.max(...day.temps)
      
      // Find most common weather condition
      const conditionCounts = new Map()
      day.conditions.forEach(condition => {
        const key = condition.main
        if (conditionCounts.has(key)) {
          conditionCounts.set(key, conditionCounts.get(key) + 1)
        } else {
          conditionCounts.set(key, 1)
        }
      })
      
      // Get the most frequent condition
      let mostFrequentCondition = day.conditions[0]
      let maxCount = 0
      day.conditions.forEach(condition => {
        const count = conditionCounts.get(condition.main)
        if (count > maxCount) {
          maxCount = count
          mostFrequentCondition = condition
        }
      })
      
      // Get day name
      const date = new Date(day.date)
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
      
      return {
        date: day.date,
        dayName: dayName,
        minTemp: Math.round(minTemp),
        maxTemp: Math.round(maxTemp),
        condition: mostFrequentCondition.main,
        description: mostFrequentCondition.description,
        icon: mostFrequentCondition.icon
      }
    })
    
    return processedDays
  }

  // Mock forecast data for demo when API is unavailable
  static getMockForecastData(city) {
    const today = new Date()
    const mockDays = []
    
    const conditions = [
      { main: 'Clear', description: 'clear sky', icon: '01d' },
      { main: 'Clouds', description: 'few clouds', icon: '02d' },
      { main: 'Rain', description: 'light rain', icon: '10d' },
      { main: 'Clouds', description: 'scattered clouds', icon: '03d' },
      { main: 'Clear', description: 'clear sky', icon: '01d' }
    ]
    
    const baseTemps = [22, 19, 15, 18, 25] // Base temperatures
    
    for (let i = 0; i < 5; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
      const condition = conditions[i]
      const baseTemp = baseTemps[i]
      
      mockDays.push({
        date: date.toDateString(),
        dayName: dayName,
        minTemp: baseTemp - 3,
        maxTemp: baseTemp + 5,
        condition: condition.main,
        description: condition.description,
        icon: condition.icon
      })
    }
    
    return mockDays
  }

  // Mock weather data for demo when API is unavailable
  static getMockWeatherData(city) {
    const mockData = {
      name: city,
      main: {
        temp: 295.15, // 22°C in Kelvin
        feels_like: 297.15, // 24°C in Kelvin
        temp_min: 291.15, // 18°C in Kelvin
        temp_max: 298.15, // 25°C in Kelvin
        humidity: 65,
        pressure: 1013
      },
      weather: [{
        main: 'Clear',
        description: 'clear sky',
        icon: '01d'
      }],
      wind: {
        speed: 3.5 // m/s
      },
      visibility: 10000, // meters
      sys: {
        country: 'DEMO'
      },
      coord: {
        lat: 51.5074,
        lon: -0.1278
      }
    }
    
    return mockData
  }
}

export default WeatherService
