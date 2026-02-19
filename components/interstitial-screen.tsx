"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface InterstitialScreenProps {
  imageSrc: string
  imageAlt: string
  text: string
}

export function InterstitialScreen({
  imageSrc,
  imageAlt,
  text,
}: InterstitialScreenProps) {
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 50)
    const leaveTimer = setTimeout(() => setLeaving(true), 2400)
    return () => {
      clearTimeout(showTimer)
      clearTimeout(leaveTimer)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <div
        className={`flex flex-col items-center gap-6 transition-all duration-500 ease-out ${
          leaving
            ? "scale-90 opacity-0"
            : visible
              ? "scale-100 opacity-100"
              : "scale-80 opacity-0"
        }`}
      >
        <div className="relative h-64 w-64 overflow-hidden rounded-3xl border-4 border-primary/30 shadow-2xl md:h-80 md:w-80">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
        <h2 className="font-serif text-4xl tracking-wide text-primary md:text-5xl">
          {text}
        </h2>
      </div>
    </div>
  )
}
