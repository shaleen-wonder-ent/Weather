import React from 'react'
import ForecastCard from './ForecastCard'
import './ForecastSection.css'

const ForecastSection = ({ forecastData, loading, error }) => {
  if (loading) {
    return (
      <div className="forecast-section">
        <h3 className="forecast-title">5-Day Forecast</h3>
        <div className="forecast-loading">
          <div className="forecast-loading-spinner"></div>
          <p>Loading forecast...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="forecast-section">
        <h3 className="forecast-title">5-Day Forecast</h3>
        <div className="forecast-error">
          <p>⚠️ {error}</p>
        </div>
      </div>
    )
  }

  if (!forecastData || forecastData.length === 0) {
    return null
  }

  return (
    <div className="forecast-section">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-container">
        <div className="forecast-list">
          {forecastData.map((forecast, index) => (
            <ForecastCard 
              key={`${forecast.date}-${index}`} 
              forecast={forecast} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ForecastSection