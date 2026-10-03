import React, { useEffect, useState } from 'react';

const CompassArrow = ({ rotation, qiblaDirection, compassHeading }) => {
  const [displayRotation, setDisplayRotation] = useState(rotation || 0);

  useEffect(() => {
    if (rotation !== null && rotation !== undefined) {
      setDisplayRotation(rotation);
    }
  }, [rotation]);

  const size = 280;
  const center = size / 2;
  const radius = 120;

  // Compass tick marks
  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);
  const cardinals = ['N', 'E', 'S', 'W'];
  const cardinalAngles = [0, 90, 180, 270];

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-sky-400/5 blur-3xl scale-150" />

      <div className="relative compass-container">
        <svg width={size} height={size} className="relative z-10">
          {/* Outer ring */}
          <circle cx={center} cy={center} r={radius + 18}
            fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="1" />

          {/* Compass background */}
          <circle cx={center} cy={center} r={radius}
            fill="rgba(15,23,42,0.8)" stroke="rgba(148,163,184,0.2)" strokeWidth="1.5" />

          {/* Tick marks - rotate entire group with compass heading */}
          <g transform={`rotate(${-compassHeading} ${center} ${center})`}>
            {ticks.map((angle) => {
              const rad = (angle - 90) * (Math.PI / 180);
              const isMajor = angle % 45 === 0;
              const isMedium = angle % 15 === 0;
              const innerR = isMajor ? radius - 18 : isMedium ? radius - 12 : radius - 8;
              const x1 = center + radius * Math.cos(rad);
              const y1 = center + radius * Math.sin(rad);
              const x2 = center + innerR * Math.cos(rad);
              const y2 = center + innerR * Math.sin(rad);

              return (
                <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={isMajor ? 'rgba(148,163,184,0.5)' :
                    isMedium ? 'rgba(148,163,184,0.3)' : 'rgba(148,163,184,0.15)'}
                  strokeWidth={isMajor ? 2 : 1} />
              );
            })}

            {/* Cardinal letters */}
            {cardinals.map((label, i) => {
              const angle = cardinalAngles[i];
              const rad = (angle - 90) * (Math.PI / 180);
              const r = radius - 30;
              const x = center + r * Math.cos(rad);
              const y = center + r * Math.sin(rad);

              return (
                <text key={label} x={x} y={y}
                  textAnchor="middle" dominantBaseline="central"
                  fill={label === 'N' ? '#f87171' : 'rgba(148,163,184,0.7)'}
                  fontSize={label === 'N' ? '14' : '11'}
                  fontWeight={label === 'N' ? 'bold' : 'normal'}
                  fontFamily="Inter, sans-serif">
                  {label}
                </text>
              );
            })}
          </g>

          {/* Inner decorative rings */}
          <circle cx={center} cy={center} r={radius - 40}
            fill="none" stroke="rgba(148,163,184,0.08)" strokeWidth="1" />
          <circle cx={center} cy={center} r={radius - 60}
            fill="none" stroke="rgba(148,163,184,0.05)" strokeWidth="1" />

          {/* Qibla Arrow - this rotates to point to Qibla */}
          <g transform={`rotate(${displayRotation} ${center} ${center})`}
            style={{ transition: 'transform 0.3s ease-out' }}>
            {/* Arrow shadow/glow */}
            <line x1={center} y1={center + 10} x2={center} y2={center - (radius - 48)}
              stroke="rgba(212,175,55,0.2)" strokeWidth="8" strokeLinecap="round" />
            {/* Arrow stem */}
            <line x1={center} y1={center + 10} x2={center} y2={center - (radius - 48)}
              stroke="#d4af37" strokeWidth="3" strokeLinecap="round" />
            {/* Arrow head */}
            <polygon
              points={`${center},${center - (radius - 44)} ${center - 10},${center - (radius - 62)} ${center + 10},${center - (radius - 62)}`}
              fill="#d4af37" />
            {/* Counter arrow (tail) */}
            <polygon
              points={`${center},${center + 14} ${center - 6},${center + 4} ${center + 6},${center + 4}`}
              fill="rgba(212,175,55,0.4)" />
          </g>

          {/* Center dot */}
          <circle cx={center} cy={center} r="8" fill="#1e293b"
            stroke="#d4af37" strokeWidth="2" />
          <circle cx={center} cy={center} r="3" fill="#d4af37" />

          {/* Kaaba symbol at arrow tip */}
          <g transform={`rotate(${displayRotation} ${center} ${center})`}
            style={{ transition: 'transform 0.3s ease-out' }}>
            <text x={center} y={center - (radius - 35)}
              textAnchor="middle" dominantBaseline="central"
              fontSize="14" className="select-none">
              🕋
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default CompassArrow;