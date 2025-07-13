import React from 'react'
import './AnimatedSun.css'

const AnimatedSun = ({ className = '', size = 80 }) => {
  return (
    <div className={`animated-sun ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="sun-svg"
      >
        {/* Sun rays */}
        <g className="sun-rays">
          {/* Top ray */}
          <path d="M100 10 C95 10, 95 25, 100 25 C105 25, 105 10, 100 10 Z" fill="currentColor" />
          {/* Top-right ray */}
          <path d="M155 25 C150 20, 140 30, 145 35 C150 40, 160 30, 155 25 Z" fill="currentColor" />
          {/* Right ray */}
          <path d="M190 100 C190 95, 175 95, 175 100 C175 105, 190 105, 190 100 Z" fill="currentColor" />
          {/* Bottom-right ray */}
          <path d="M175 155 C170 150, 160 160, 165 165 C170 170, 180 160, 175 155 Z" fill="currentColor" />
          {/* Bottom ray */}
          <path d="M100 190 C95 190, 95 175, 100 175 C105 175, 105 190, 100 190 Z" fill="currentColor" />
          {/* Bottom-left ray */}
          <path d="M45 175 C40 170, 30 180, 35 185 C40 190, 50 180, 45 175 Z" fill="currentColor" />
          {/* Left ray */}
          <path d="M10 100 C10 95, 25 95, 25 100 C25 105, 10 105, 10 100 Z" fill="currentColor" />
          {/* Top-left ray */}
          <path d="M25 45 C20 40, 30 30, 35 35 C40 40, 30 50, 25 45 Z" fill="currentColor" />
          
          {/* Additional diagonal rays for more detail */}
          <path d="M140 40 C135 35, 125 45, 130 50 C135 55, 145 45, 140 40 Z" fill="currentColor" />
          <path d="M160 140 C155 135, 145 145, 150 150 C155 155, 165 145, 160 140 Z" fill="currentColor" />
          <path d="M60 160 C55 155, 45 165, 50 170 C55 175, 65 165, 60 160 Z" fill="currentColor" />
          <path d="M40 60 C35 55, 25 65, 30 70 C35 75, 45 65, 40 60 Z" fill="currentColor" />
        </g>
        
        {/* Sun face/center circle */}
        <circle
          cx="100"
          cy="100"
          r="45"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="3"
          className="sun-face"
        />
        
        {/* Sun eyes */}
        <ellipse cx="88" cy="90" rx="4" ry="8" fill="white" className="sun-eye" />
        <ellipse cx="112" cy="90" rx="4" ry="8" fill="white" className="sun-eye" />
        
        {/* Sun smile */}
        <path
          d="M 80 110 Q 100 125 120 110"
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          className="sun-smile"
        />
      </svg>
    </div>
  )
}

export default AnimatedSun