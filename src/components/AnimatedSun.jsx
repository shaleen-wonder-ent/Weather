import React from 'react'
import './AnimatedSun.css'

const AnimatedSun = ({ size = 80 }) => {
  return (
    <div className="animated-sun-container" style={{ width: size, height: size }}>
      <svg 
        className="animated-sun" 
        viewBox="0 0 120 120" 
        width={size} 
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sun rays */}
        <g className="sun-rays">
          {/* Top rays */}
          <path d="M60 10 Q55 2 50 10 Q60 5 70 10 Q65 2 60 10" fill="currentColor" />
          <path d="M85 18 Q83 10 78 15 Q85 12 92 18 Q88 12 85 18" fill="currentColor" />
          <path d="M102 42 Q98 36 95 42 Q102 38 108 45 Q103 40 102 42" fill="currentColor" />
          <path d="M110 60 Q102 55 107 65 Q105 60 110 70 Q102 65 110 60" fill="currentColor" />
          <path d="M102 78 Q98 84 95 78 Q102 82 108 75 Q103 80 102 78" fill="currentColor" />
          <path d="M85 102 Q83 110 78 105 Q85 108 92 102 Q88 108 85 102" fill="currentColor" />
          <path d="M60 110 Q55 118 50 110 Q60 115 70 110 Q65 118 60 110" fill="currentColor" />
          <path d="M35 102 Q37 110 42 105 Q35 108 28 102 Q32 108 35 102" fill="currentColor" />
          <path d="M18 78 Q22 84 25 78 Q18 82 12 75 Q17 80 18 78" fill="currentColor" />
          <path d="M10 60 Q18 55 13 65 Q15 60 10 70 Q18 65 10 60" fill="currentColor" />
          <path d="M18 42 Q22 36 25 42 Q18 38 12 45 Q17 40 18 42" fill="currentColor" />
          <path d="M35 18 Q37 10 42 15 Q35 12 28 18 Q32 12 35 18" fill="currentColor" />
        </g>
        
        {/* Sun face circle */}
        <circle 
          cx="60" 
          cy="60" 
          r="25" 
          fill="currentColor" 
          stroke="currentColor" 
          strokeWidth="3"
        />
        
        {/* Eyes */}
        <ellipse cx="52" cy="52" rx="3" ry="4" fill="#000" />
        <ellipse cx="68" cy="52" rx="3" ry="4" fill="#000" />
        
        {/* Smile */}
        <path 
          d="M48 68 Q60 78 72 68" 
          stroke="#000" 
          strokeWidth="2.5" 
          fill="none" 
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export default AnimatedSun