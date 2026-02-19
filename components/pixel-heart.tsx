"use client"

export function PixelHeart({ className = "", size = 12, style }: { className?: string; size?: number; style?: React.CSSProperties }) {
  // Classic pixel heart pattern (13x12 grid)
  const heart = [
    [0,0,1,1,0,0,0,1,1,0,0,0,0],
    [0,1,1,1,1,0,1,1,1,1,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,0],
  ]

  const pixelSize = size

  return (
    <div className={className} style={style} aria-hidden="true">
      <svg
        width={13 * pixelSize}
        height={10 * pixelSize}
        viewBox={`0 0 ${13 * pixelSize} ${10 * pixelSize}`}
      >
        {heart.map((row, y) =>
          row.map((cell, x) =>
            cell ? (
              <rect
                key={`${x}-${y}`}
                x={x * pixelSize}
                y={y * pixelSize}
                width={pixelSize}
                height={pixelSize}
                fill="var(--primary)"
                rx={1}
              />
            ) : null
          )
        )}
      </svg>
    </div>
  )
}
