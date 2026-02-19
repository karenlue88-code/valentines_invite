"use client"

import { useEffect, useState } from "react"

function FishSvg({ color }: { color: string }) {
  // Fish faces RIGHT by default (eye on left, tail on right)
  return (
    <svg width="48" height="32" viewBox="0 0 12 8">
      {/* Body */}
      <rect x="4" y="0" width="2" height="1" fill={color} opacity="0.7" />
      <rect x="3" y="1" width="4" height="1" fill={color} opacity="0.8" />
      <rect x="1" y="2" width="7" height="1" fill={color} opacity="0.9" />
      <rect x="0" y="3" width="8" height="1" fill={color} />
      <rect x="0" y="4" width="8" height="1" fill={color} />
      <rect x="1" y="5" width="7" height="1" fill={color} opacity="0.9" />
      <rect x="3" y="6" width="4" height="1" fill={color} opacity="0.8" />
      <rect x="4" y="7" width="2" height="1" fill={color} opacity="0.7" />
      {/* Tail */}
      <rect x="8" y="2" width="1" height="4" fill={color} opacity="0.8" />
      <rect x="9" y="1" width="1" height="2" fill={color} opacity="0.6" />
      <rect x="9" y="5" width="1" height="2" fill={color} opacity="0.6" />
      <rect x="10" y="0" width="1" height="2" fill={color} opacity="0.4" />
      <rect x="10" y="6" width="1" height="2" fill={color} opacity="0.4" />
      {/* Eye */}
      <rect x="3" y="3" width="1" height="1" fill="#4a2c2a" />
      {/* Cheek */}
      <rect x="2" y="4" width="1" height="1" fill="#f8a4b8" opacity="0.6" />
    </svg>
  )
}

export function PixelFish() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 10 }}
      aria-hidden="true"
    >
      {/* Pair 1: swimming RIGHT across top area, pink leads blue follows */}
      <div
        className="absolute flex items-start gap-1"
        style={{
          top: "28%",
          animation: "swim-right 12s linear 0s infinite",
        }}
      >
        <div>
          <FishSvg color="#f8a4b8" />
        </div>
        <div style={{ marginTop: "18px", marginLeft: "-12px" }}>
          <FishSvg color="#7eb8d8" />
        </div>
      </div>

      {/* Pair 2: swimming RIGHT across lower area, blue leads pink follows, offset start */}
      <div
        className="absolute flex items-start gap-1"
        style={{
          top: "65%",
          animation: "swim-right 15s linear 0s infinite",
          animationDelay: "-7s",
        }}
      >
        <div>
          <FishSvg color="#7eb8d8" />
        </div>
        <div style={{ marginTop: "14px", marginLeft: "-12px" }}>
          <FishSvg color="#f8a4b8" />
        </div>
      </div>
    </div>
  )
}
