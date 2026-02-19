"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import Image from "next/image"
import { PixelHeart } from "./pixel-heart"

interface ProposalScreenProps {
  onYes: () => void
}

export function ProposalScreen({ onYes }: ProposalScreenProps) {
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 })
  const [moveCount, setMoveCount] = useState(0)
  const [noHidden, setNoHidden] = useState(false)
  const [showStopSir, setShowStopSir] = useState(false)
  const [heartDropped, setHeartDropped] = useState(false)
  const [textVisible, setTextVisible] = useState(false)
  const [buttonsVisible, setButtonsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const noBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const timer1 = setTimeout(() => setHeartDropped(true), 300)
    const timer2 = setTimeout(() => setTextVisible(true), 1400)
    const timer3 = setTimeout(() => setButtonsVisible(true), 2200)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  // Auto-hide the STOP SIR overlay after 3 seconds
  useEffect(() => {
    if (!showStopSir) return
    const timer = setTimeout(() => setShowStopSir(false), 3000)
    return () => clearTimeout(timer)
  }, [showStopSir])

  const moveNoButton = useCallback(() => {
    setMoveCount((prev) => {
      const next = prev + 1

      if (next >= 3) {
        // 3rd attempt: show STOP SIR overlay and hide the No button
        setShowStopSir(true)
        setNoHidden(true)
        return next
      }

      // Use the button's own position to calculate a safe offset
      // that keeps it within the viewport
      if (noBtnRef.current) {
        const rect = noBtnRef.current.getBoundingClientRect()
        const vw = window.innerWidth
        const vh = window.innerHeight

        // How far the button can move in each direction and still be fully visible
        const maxLeft = rect.left - 16               // can go left this many px
        const maxRight = vw - rect.right - 16         // can go right this many px
        const maxUp = rect.top - 16                   // can go up this many px
        const maxDown = vh - rect.bottom - 16          // can go down this many px

        // Pick a random offset within safe bounds
        const offsetX = Math.random() * (maxLeft + maxRight) - maxLeft
        const offsetY = Math.random() * (maxUp + maxDown) - maxUp

        setNoOffset({ x: offsetX, y: offsetY })
      }

      return next
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* Flowers on the right */}
      <div className="pointer-events-none absolute -right-4 bottom-0 w-48 opacity-80 md:-left-2 md:w-72">
        <Image
          src="/images/flowers.png"
          alt="Beautiful pink flowers"
          width={400}
          height={500}
          className="object-contain"
          priority
        />
      </div>

      {/* Animated pixel heart dropping in */}
      <div
        className={`mb-6 transition-all duration-1000 ease-out ${
          heartDropped
            ? "translate-y-0 opacity-100"
            : "-translate-y-[120vh] opacity-0"
        }`}
      >
        <div className="animate-pulse-gentle">
          <PixelHeart size={14} />
        </div>
      </div>

      {/* Question text */}
      <div
        className={`mb-10 text-center transition-all duration-700 ease-out ${
          textVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        <h1 className="font-serif text-5xl leading-tight tracking-wide text-foreground md:text-7xl">
          Papi, Will you be my
        </h1>
        <h1 className="mt-1 font-serif text-6xl leading-tight tracking-wide text-primary md:text-8xl">
          Valentine?
        </h1>
      </div>

      {/* Buttons */}
      <div
        className={`flex items-center gap-6 transition-all duration-700 ease-out ${
          buttonsVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        <button
          onClick={onYes}
          className="rounded-full bg-primary px-10 py-4 font-sans text-lg font-bold text-primary-foreground shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl active:scale-95 md:text-xl"
        >
          Yes!
        </button>

        {/* No button - hidden after 3rd attempt */}
        {!noHidden && (
          <button
            ref={noBtnRef}
            onMouseEnter={moveNoButton}
            onTouchStart={(e) => {
              e.preventDefault()
              moveNoButton()
            }}
            onClick={(e) => {
              e.preventDefault()
              moveNoButton()
            }}
            className="cursor-pointer rounded-full border-2 border-border bg-card px-10 py-4 font-sans text-lg font-bold text-muted-foreground shadow-md md:text-xl"
            style={{
              transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: `translate(${noOffset.x}px, ${noOffset.y}px)`,
              zIndex: 50,
            }}
          >
            No
          </button>
        )}
      </div>

      {/* Cute subtext when button has moved */}
      {moveCount >= 1 && moveCount < 3 && (
        <p className="mt-8 animate-bounce font-sans text-sm text-muted-foreground">
          {"That button seems to have a mind of its own..."}
        </p>
      )}

      {/* STOP SIR overlay - appears ON TOP of the proposal screen */}
      {showStopSir && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
          style={{ animation: "fade-in-scale 0.4s ease-out forwards" }}
        >
          <div className="relative h-72 w-72 overflow-hidden rounded-3xl shadow-2xl md:h-96 md:w-80">
            <Image
              src="/images/stopsir.png"
              alt="Stop sir"
              fill
              className="object-cover"
              priority
            />
          </div>
          <p className="mt-6 font-serif text-4xl tracking-wide text-foreground md:text-5xl">
            STOP SIR PLEASE....
          </p>
        </div>
      )}
    </div>
  )
}
