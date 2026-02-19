"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { PixelHeart } from "./pixel-heart"
import { Calendar, Clock, MapPin, Backpack } from "lucide-react"

export function DateDetailsScreen() {
  const [visible, setVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 200)
    const t2 = setTimeout(() => setCardsVisible(true), 900)
    const t3 = setTimeout(() => setFooterVisible(true), 1800)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  const details = [
    {
      icon: Calendar,
      label: "Date",
      value: "1st of March",
    },
    {
      icon: Clock,
      label: "Time",
      value: "11:00 AM",
    },
    {
      icon: MapPin,
      label: "Where",
      value: "Secret! 🤫",
    },
    {
      icon: Backpack,
      label: "Bring",
      value: "Change of clothes, swimmers & hiking clothes! and a empty tummyyyy",
    },
  ]

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 py-8">
      {/* Invite card */}
      <div
        className={`relative w-full max-w-3xl overflow-hidden rounded-3xl border-2 border-primary/20 bg-card shadow-xl transition-all duration-700 ease-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        {/* Decorative top border */}
        <div className="h-2 w-full bg-gradient-to-r from-primary/40 via-primary to-primary/40" />

        <div className="flex flex-col md:flex-row">
          {/* Left side: Polaroid photos */}
          <div className="relative flex items-center justify-center bg-secondary/50 p-8 md:w-2/5">
            {/* Photo stack container */}
            <div className="relative h-72 w-56 md:h-80 md:w-64">
              {/* Back photo - tilted left */}
              <div
                className={`absolute -left-3 -top-2 -rotate-6 transition-all delay-500 duration-700 ease-out ${
                  visible
                    ? "scale-100 opacity-100"
                    : "scale-75 opacity-0"
                }`}
              >
                <div className="rounded-lg bg-card p-2 shadow-lg">
                  <div className="overflow-hidden rounded-sm">
                    <Image
                      src="/images/img0054.jpg"
                      alt="Us lying together under the stars"
                      width={220}
                      height={280}
                      className="h-56 w-44 object-cover md:h-64 md:w-52"
                      priority
                    />
                  </div>
                  <p className="mt-1.5 text-center font-serif text-xs text-muted-foreground">us</p>
                </div>
              </div>

              {/* Front photo - tilted right */}
              <div
                className={`absolute -right-3 top-4 rotate-6 transition-all delay-700 duration-700 ease-out ${
                  visible
                    ? "scale-100 opacity-100"
                    : "scale-75 opacity-0"
                }`}
              >
                <div className="rounded-lg bg-card p-2 shadow-xl">
                  <div className="overflow-hidden rounded-sm">
                    <Image
                      src="/images/img4112.jpg"
                      alt="Us being cute with shaved ice"
                      width={220}
                      height={280}
                      className="h-56 w-44 object-cover md:h-64 md:w-52"
                      priority
                    />
                  </div>
                  <p className="mt-1.5 text-center font-serif text-xs text-muted-foreground">{"<3"}</p>
                </div>
              </div>
            </div>

            {/* Pixel heart accents */}
            <div className="absolute right-3 top-4 rotate-12 opacity-60">
              <PixelHeart size={6} />
            </div>
            <div className="absolute bottom-6 left-3 -rotate-12 opacity-40">
              <PixelHeart size={5} />
            </div>
          </div>

          {/* Right side: Invite content */}
          <div className="flex flex-1 flex-col justify-center p-6 md:p-10">
            {/* Header */}
            <div
              className={`mb-6 text-center transition-all duration-700 ease-out md:text-left ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              <div className="mb-3 flex items-center justify-center gap-2 md:justify-start">
                <PixelHeart size={6} />
                <PixelHeart size={9} />
                <PixelHeart size={6} />
              </div>
              <h1 className="font-serif text-4xl leading-tight tracking-wide text-primary md:text-5xl">
                Yayyyyy!
              </h1>
              <p className="mt-2 font-sans text-sm text-muted-foreground md:text-base">
                {"I knew you'd say yes!"}
              </p>
              <p className="mt-1 font-serif text-xl text-foreground md:text-2xl">
                {"Here's what's planned..."}
              </p>
            </div>

            {/* Divider */}
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <PixelHeart size={4} className="opacity-40" />
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Details */}
            <div className="flex flex-col gap-4">
              {details.map((detail, i) => (
                <div
                  key={detail.label}
                  className={`flex items-start gap-4 transition-all duration-500 ease-out ${
                    cardsVisible
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: cardsVisible ? `${i * 150}ms` : "0ms",
                  }}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <detail.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-sans text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                      {detail.label}
                    </p>
                    <p className="mt-0.5 font-serif text-lg text-foreground md:text-xl">
                      {detail.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div
              className={`mt-8 transition-all duration-700 ease-out ${
                footerVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <PixelHeart size={4} className="opacity-40" />
                <div className="h-px flex-1 bg-border" />
              </div>
              <p className="mt-4 text-center font-serif text-xl text-foreground md:text-left md:text-2xl">
                {"Can't wait"}
              </p>
              <div className="mt-3 flex items-center justify-center gap-1 md:justify-start">
                {Array.from({ length: 5 }).map((_, i) => (
                  <PixelHeart
                    key={i}
                    size={5}
                    className="animate-pulse-gentle"
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </div>
              <p className="mt-3 text-center font-sans text-xs text-muted-foreground md:text-left">
                {"HEHE can't wait to have the best day ever with you!!!!!"}
              </p>
            </div>
          </div>
        </div>

        {/* Decorative bottom border */}
        <div className="h-2 w-full bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
      </div>
    </div>
  )
}
