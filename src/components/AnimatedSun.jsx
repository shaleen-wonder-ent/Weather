import React from 'react'
import './AnimatedSun.css'

const AnimatedSun = () => {
  return (
    <div className="animated-sun-container">
      <svg
        className="animated-sun"
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sun rays */}
        <g className="sun-rays">
          {/* Top rays */}
          <path d="M60 5 Q65 15 60 25 Q55 15 60 5" stroke="currentColor" strokeWidth="2" fill="currentColor" />
          <path d="M85 10 Q90 20 85 30 Q80 20 85 10" stroke="currentColor" strokeWidth="2" fill="currentColor" />
          <path d="M105 25 Q115 30 105 40 Q95 30 105 25" stroke="currentColor" strokeWidth="2" fill="currentColor" />
          <path d="M110 60 Q120 65 110 75 Q100 65 110 60" stroke="currentColor" strokeWidth="2" fill="currentColor" />
          <path d="M105 95 Q115 90 105 80 Q95 90 105 95" stroke="currentColor" strokeWidth="2" fill="currentColor" />
          <path d="M85 110 Q90 100 85 90 Q80 100 85 110" stroke="currentColor" strokeWidth="2" fill="currentColor" />
          <path d="M60 115 Q65 105 60 95 Q55 105 60 115" stroke="currentColor" strokeWidth="2" fill="currentColor" />
          <path d="M35 110 Q30 100 35 90 Q40 100 35 110" stroke="currentColor" strokeWidth="2" fill="currentColor" />
          <path d="M15 95 Q5 90 15 80 Q25 90 15 95" stroke="currentColor" strokeWidth="2" fill="currentColor" />
          <path d="M10 60 Q0 65 10 75 Q20 65 10 60" stroke="currentColor" strokeWidth="2" fill="currentColor" />
          <path d="M15 25 Q5 30 15 40 Q25 30 15 25" stroke="currentColor" strokeWidth="2" fill="currentColor" />
          <path d="M35 10 Q30 20 35 30 Q40 20 35 10" stroke="currentColor" strokeWidth="2" fill="currentColor" />
        </g>
        
        {/* Sun face circle */}
        <circle
          cx="60"
          cy="60"
          r="25"
          stroke="currentColor"
          strokeWidth="3"
          fill="currentColor"
          fillOpacity="0.1"
          className="sun-face"
        />
        
        {/* Eyes */}
        <ellipse cx="52" cy="52" rx="3" ry="5" fill="currentColor" />
        <ellipse cx="68" cy="52" rx="3" ry="5" fill="currentColor" />
        
        {/* Smile */}
        <path
          d="M45 65 Q60 75 75 65"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export default AnimatedSun