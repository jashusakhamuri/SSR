import React from 'react';

/**
 * FarmerLogo — Vector emblem representing an Indian Telugu farmer
 * raising both hands to tie his traditional headcloth (Thalapaaga / Rumalu).
 */
function FarmerLogo({ size = 24, className = '', color = 'currentColor' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Farmer tying headcloth logo"
    >
      {/* Outer circular emblem border */}
      <circle cx="32" cy="32" r="30" stroke={color} strokeWidth="2" strokeOpacity="0.9" />
      <circle cx="32" cy="32" r="27.5" stroke={color} strokeWidth="0.75" strokeDasharray="2 2" strokeOpacity="0.5" />

      {/* ── Farmer Silhouette & Features ── */}
      
      {/* Torso / Banyan (Sleeveless vest) */}
      <path 
        d="M20 58 C21 51, 24 47, 28 46 C29 50, 35 50, 36 46 C40 47, 43 51, 44 58 C41 60, 23 60, 20 58 Z" 
        fill={color} 
      />

      {/* Neck */}
      <path 
        d="M28 38 L28 45 C30 47, 34 47, 36 45 L36 38 Z" 
        fill={color} 
        opacity="0.95"
      />

      {/* Head / Face */}
      <path 
        d="M27 28 C27 34, 29 38, 32 38 C35 38, 37 34, 37 28 C37 25, 27 25, 27 28 Z" 
        fill={color} 
      />
      
      {/* Farmer mustache accent */}
      <path 
        d="M28.5 33 C30.5 34.2, 33.5 34.2, 35.5 33 C34.5 34.8, 29.5 34.8, 28.5 33 Z" 
        fill="white" 
        opacity="0.4"
      />

      {/* ── Headcloth / Turban (Thalapaaga) ── */}
      {/* Main wrapped crown */}
      <path 
        d="M25 25 C26 19, 31 16, 37 17 C40 18, 41 22, 39 25 C37 23, 27 23, 25 25 Z" 
        fill={color} 
      />
      {/* Forehead wrap band */}
      <path 
        d="M25.5 27 C27 24, 37 23, 38.5 27 C37 28, 27 28, 25.5 27 Z" 
        fill={color} 
      />
      {/* Turban top knot/crossover */}
      <path 
        d="M29 18 C31 15, 35 15, 36.5 18 C34 19.5, 31 19.5, 29 18 Z" 
        fill={color} 
        opacity="0.9"
      />
      
      {/* Headcloth tail/drape flowing down over left shoulder */}
      <path 
        d="M23.5 20 C21.5 25, 21 34, 22 43 C22.5 45, 24.5 45, 24.5 43 C24 35, 24.5 27, 26.5 21 Z" 
        fill={color} 
        opacity="0.95"
      />
      <path 
        d="M22 43 C21.5 47, 23.5 49, 25 47 C26 44, 25 42, 24.5 43 Z" 
        fill={color} 
      />

      {/* ── Arms Raised Tying the Cloth ── */}

      {/* Left Arm: Shoulder -> Bent Elbow -> Forearm -> Hand at Turban */}
      {/* Bicep / Shoulder */}
      <path 
        d="M20 53 C16 49, 11 42, 10 35 C10 31, 13 29, 16 33 C17 36, 19 43, 22 48 Z" 
        fill={color} 
      />
      {/* Forearm rising */}
      <path 
        d="M11 34 C12 28, 16 22, 22 18 C24 16.5, 26 18, 24.5 21 C21 24.5, 17 30, 15 35 Z" 
        fill={color} 
      />
      {/* Left Hand gripping the cloth end */}
      <ellipse cx="23" cy="18" rx="2.5" ry="1.8" transform="rotate(-20 23 18)" fill={color} />

      {/* Right Arm: Shoulder -> Bent Elbow -> Forearm -> Hand at Turban */}
      {/* Bicep / Shoulder */}
      <path 
        d="M44 53 C48 49, 53 42, 54 35 C54 31, 51 29, 48 33 C47 36, 45 43, 42 48 Z" 
        fill={color} 
      />
      {/* Forearm rising */}
      <path 
        d="M53 34 C52 28, 48 22, 42 18 C40 16.5, 38 18, 39.5 21 C43 24.5, 47 30, 49 35 Z" 
        fill={color} 
      />
      {/* Right Hand knotting cloth at top-right */}
      <ellipse cx="41" cy="18" rx="2.5" ry="1.8" transform="rotate(20 41 18)" fill={color} />

      {/* Golden grain / harvest leaf sprig accents at bottom contour */}
      <path d="M19 55 C22 57, 26 58, 32 58 C38 58, 42 57, 45 55" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export default FarmerLogo;
