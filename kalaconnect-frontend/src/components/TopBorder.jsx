import React from 'react';
import './TopBorder.css';

const COLORS = ['#e74c3c','#e67e22','#f1c40f','#27ae60','#2980b9','#8e44ad'];

export default function TopBorder() {
  return (
    <div className="top-border">
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} className="border-segment" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
      ))}
    </div>
  );
}
