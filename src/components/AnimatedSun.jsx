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
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sun rays */}
        <g className="sun-rays">
          {/* Top rays */}
          <path d="M60 5 Q65 15, 70 5 Q65 10, 60 5" fill="currentColor" />
          <path d="M85 12 Q87 22, 95 15 Q90 17, 85 12" fill="currentColor" />
          <path d="M105 35 Q110 40, 115 35 Q112 37, 105 35" fill="currentColor" />
          <path d="M115 60 Q110 65, 115 70 Q112 65, 115 60" fill="currentColor" />
          <path d="M105 85 Q110 80, 115 85 Q112 82, 105 85" fill="currentColor" />
          <path d="M85 108 Q87 98, 95 105 Q90 103, 85 108" fill="currentColor" />
          <path d="M60 115 Q65 105, 70 115 Q65 110, 60 115" fill="currentColor" />
          <path d="M35 108 Q33 98, 25 105 Q30 103, 35 108" fill="currentColor" />
          
          {/* Left rays */}
          <path d="M15 85 Q10 80, 5 85 Q8 82, 15 85" fill="currentColor" />
          <path d="M5 60 Q10 65, 5 70 Q8 65, 5 60" fill="currentColor" />
          <path d="M15 35 Q10 40, 5 35 Q8 37, 15 35" fill="currentColor" />
          <path d="M35 12 Q33 22, 25 15 Q30 17, 35 12" fill="currentColor" />
        </g>
        
        {/* Sun center circle */}
        <circle 
          cx="60" 
          cy="60" 
          r="35" 
          fill="currentColor" 
          stroke="currentColor" 
          strokeWidth="3"
          className="sun-body"
        />
        
        {/* Sun face */}
        <g className="sun-face">
          {/* Eyes */}
          <ellipse cx="50" cy="50" rx="4" ry="7" fill="#333" />
          <ellipse cx="70" cy="50" rx="4" ry="7" fill="#333" />
          
          {/* Smile */}
          <path 
            d="M45 70 Q60 80, 75 70" 
            stroke="#333" 
            strokeWidth="3" 
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  )
}

export default AnimatedSun