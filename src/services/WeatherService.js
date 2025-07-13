import axios from 'axios'

const API_KEY = '06c21ec8f8428309f292844e93cce2a7' // In production, this should be in environment variables
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

class WeatherService {
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
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      } else {
        throw new Error('Failed to fetch weather data for your location');
      }
    }
  }
}

export default WeatherService
