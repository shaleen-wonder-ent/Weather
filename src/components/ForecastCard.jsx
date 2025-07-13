import React from 'react'
import './ForecastCard.css'

const ForecastCard = ({ forecast }) => {
  if (!forecast) return null

  const { dayOfWeek, minTemp, maxTemp, condition, description } = forecast

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
    <div className="forecast-card">
      <div className="forecast-day">
        {dayOfWeek}
      </div>
      
      <div className="forecast-icon">
        {getWeatherEmoji(condition)}
      </div>
      
      <div className="forecast-condition">
        {condition}
      </div>
      
      <div className="forecast-temps">
        <span 
          className="forecast-temp-max"
          style={{ color: getTemperatureColor(maxTemp) }}
        >
          {maxTemp}°
        </span>
        <span className="forecast-temp-min">
          {minTemp}°
        </span>
      </div>
      
      <div className="forecast-description">
        {description}
      </div>
    </div>
  )
}

export default ForecastCard