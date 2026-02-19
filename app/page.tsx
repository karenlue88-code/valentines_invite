"use client"

import { useState } from "react"
import { FloatingHearts } from "@/components/floating-hearts"
import { PixelFish } from "@/components/pixel-fish"
import { ProposalScreen } from "@/components/proposal-screen"
import { DateDetailsScreen } from "@/components/date-details-screen"
import { InterstitialScreen } from "@/components/interstitial-screen"

type Screen = "proposal" | "goodboy" | "date"

export default function Home() {
  const [screen, setScreen] = useState<Screen>("proposal")

  const handleYes = () => {
    setScreen("goodboy")
    setTimeout(() => setScreen("date"), 3000)
  }

  return (
    <main className="relative min-h-dvh bg-background">
      <FloatingHearts />
      <PixelFish />
      {screen === "proposal" && <ProposalScreen onYes={handleYes} />}
      {screen === "goodboy" && (
        <InterstitialScreen
          imageSrc="/images/goodboy.jpg"
          imageAlt="Good boy"
          text="GOOD BOY... 😏"
        />
      )}
      {screen === "date" && <DateDetailsScreen />}
    </main>
  )
}
