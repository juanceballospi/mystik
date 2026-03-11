"use client";

import { zodiacSigns } from "@/lib/zodiac-signs";
import { Subtitle } from "../ui/subtitle";
import { ZodiacSign } from "./zodiac-sign";

export function Horoscope() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center px-8 py-16 font-sans">
      <div className="max-w-6xl mx-auto">
        <Subtitle
          subtitle="Choose Your Zodiac Sign"
          description="What's Your Sign? Read Your Daily Horoscope Today"
        />
        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {zodiacSigns.map((sign) => (
            <div key={sign.id} className="w-full">
              <ZodiacSign sign={sign} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
