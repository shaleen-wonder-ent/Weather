import React from 'react'
import { Heart, MapPin, Thermometer, Eye, Wind, Droplets } from 'lucide-react'
import ForecastSection from './ForecastSection'
import './WeatherCard.css'

const WeatherCard = ({ weatherData, forecastData, forecastLoading, forecastError, onAddToFavorites, isFavorite }) => {
  if (!weatherData) return null

  const {
    name,
    main: { temp, feels_like, humidity, pressure },
    weather: [{ main: weatherMain, description, icon }],
    wind: { speed },
    visibility,
    sys: { country }
  } = weatherData

  const tempCelsius = Math.round(temp - 273.15)
  const feelsLikeCelsius = Math.round(feels_like - 273.15)
  const windSpeedKmh = Math.round(speed * 3.6)
  const visibilityKm = Math.round(visibility / 1000)

  const getWeatherEmoji = (main) => {
    const emojiMap = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Smoke': '🌫️',
      'Haze': '🌫️',
      'Dust': '🌫️',
      'Fog': '🌫️',
      'Sand': '🌫️',
      'Ash': '🌫️',
      'Squall': '💨',
      'Tornado': '🌪️'
    }
    return emojiMap[main] || '🌤️'
  }

  const getTemperatureColor = (temp) => {
    if (temp >= 30) return '#ff6b6b'
    if (temp >= 20) return '#ffa726'
    if (temp >= 10) return '#66bb6a'
    if (temp >= 0) return '#42a5f5'
    return '#9c27b0'
  }

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="location">
          <MapPin size={20} />
          <h2>{name}, {country}</h2>
        </div>
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => onAddToFavorites(name)}
          disabled={isFavorite}
        >
          <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="weather-main">
        <div className="weather-icon-section">
          <div className="weather-emoji">{getWeatherEmoji(weatherMain)}</div>
          <div className="weather-description">
            <h3>{weatherMain}</h3>
            <p>{description}</p>
          </div>
        </div>
        
        <div className="temperature-section">
          <div 
            className="temperature"
            style={{ color: getTemperatureColor(tempCelsius) }}
          >
            {tempCelsius}°C
          </div>
          <div className="feels-like">
            Feels like {feelsLikeCelsius}°C
          </div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <div className="detail-icon">
            <Thermometer size={16} />
          </div>
          <div className="detail-content">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{pressure} hPa</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">
            <Droplets size={16} />
          </div>
          <div className="detail-content">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{humidity}%</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">
            <Wind size={16} />
          </div>
          <div className="detail-content">
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">{windSpeedKmh} km/h</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">
            <Eye size={16} />
          </div>
          <div className="detail-content">
            <span className="detail-label">Visibility</span>
            <span className="detail-value">{visibilityKm} km</span>
          </div>
        </div>
      </div>

      <div className="weather-footer">
        <p>Last updated: {new Date().toLocaleTimeString()}</p>
      </div>

      <ForecastSection 
        forecastData={forecastData}
        loading={forecastLoading}
        error={forecastError}
      />
    </div>
  )
}

export default WeatherCard
