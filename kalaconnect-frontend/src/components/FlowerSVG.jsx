import React from 'react';

export default function FlowerSVG({ size = 48, color = '#c0392b', opacity = 0.7 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ opacity }}>
      {[0, 45, 90, 135].map((angle) => (
        <ellipse
          key={angle}
          cx="50" cy="30" rx="10" ry="22"
          fill={color}
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="12" fill={color} />
    </svg>
  );
}
