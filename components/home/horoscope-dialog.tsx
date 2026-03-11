"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ZodiacSign } from "@/lib/zodiac-signs";
import { Circle, Moon, Sparkles, Wind, Zap } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HoroscopeScore {
  overall: number;
  love: number;
  career: number;
  money: number;
  health: number;
}

interface HoroscopeLucky {
  color: { key: string; label: string };
  number: number;
  time_window?: { display: string };
}

interface HoroscopeContent {
  text: string;
  theme: string;
  keywords: string[];
}

interface HoroscopeAstro {
  moon_sign: { label: string };
  moon_phase: { label: string };
  highlights: string[];
}

interface HoroscopeData {
  sign: string;
  date: string;
  scores: HoroscopeScore;
  lucky: HoroscopeLucky;
  content: HoroscopeContent;
  astro: HoroscopeAstro;
}

// ---------------------------------------------------------------------------
// Metric bar
// ---------------------------------------------------------------------------

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-end">
        <span className="text-[10px] uppercase tracking-[0.2em] text-star-dust-500 font-medium font-sans">
          {label}
        </span>
        <span className="text-xs text-star-dust-400 font-light font-mono">
          {value}%
        </span>
      </div>
      <div className="h-px w-full bg-star-dust-800">
        <div
          className="h-full bg-koromiko-400 transition-all duration-1000"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Dialog body content
// ---------------------------------------------------------------------------

function HoroscopeContent({ data }: { data: HoroscopeData }) {
  return (
    <div className="flex flex-col gap-8 pb-2">
      {/* Moon phase + date */}
      <div className="flex items-center justify-center gap-4 text-[10px] text-star-dust-500 tracking-widest uppercase font-sans">
        <span>{data.date}</span>
        <Circle className="w-1 h-1 fill-current" />
        <span>Fase {data.astro.moon_phase.label}</span>
      </div>

      {/* Overall score ring */}
      <div className="flex justify-center">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 border border-star-dust-800 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-2 border border-star-dust-800/50 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          <div className="text-center z-10">
            <span className="block text-3xl font-extralight text-star-dust-200 font-title">
              {data.scores.overall}
            </span>
            <span className="text-[9px] uppercase tracking-widest text-star-dust-500 font-sans">
              Balance
            </span>
          </div>
        </div>
      </div>

      {/* Prediction text */}
      <article className="relative px-1">
        <div className="absolute -left-1 -top-1 text-koromiko-500/20">
          <Sparkles className="w-5 h-5" />
        </div>
        <p className="text-base text-star-dust-300 leading-relaxed font-light font-sans pl-4">
          {data.content.text}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {data.content.keywords.map((kw) => (
            <span
              key={kw}
              className="text-[10px] uppercase tracking-widest text-koromiko-500/80 italic font-sans"
            >
              #{kw}
            </span>
          ))}
        </div>
      </article>

      {/* Metrics */}
      <section className="grid grid-cols-1 gap-4 pt-6 border-t border-star-dust-800">
        <Metric label="Afecto" value={data.scores.love} />
        <Metric label="Propósito" value={data.scores.career} />
        <Metric label="Abundancia" value={data.scores.money} />
        <Metric label="Vitalidad" value={data.scores.health} />
      </section>

      {/* Lucky info */}
      <section className="flex flex-wrap justify-between gap-6 pt-6 border-t border-star-dust-800">
        <div className="flex items-center gap-3">
          <Wind className="w-4 h-4 text-star-dust-600" />
          <div>
            <p className="text-[10px] uppercase tracking-widest text-star-dust-500 font-sans">
              Color
            </p>
            <p className="text-sm text-star-dust-300 font-sans">
              {data.lucky.color.label}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Zap className="w-4 h-4 text-star-dust-600" />
          <div>
            <p className="text-[10px] uppercase tracking-widest text-star-dust-500 font-sans">
              Número
            </p>
            <p className="text-sm text-star-dust-300 font-sans">
              {data.lucky.number}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Moon className="w-4 h-4 text-star-dust-600" />
          <div>
            <p className="text-[10px] uppercase tracking-widest text-star-dust-500 font-sans">
              Luna en
            </p>
            <p className="text-sm text-star-dust-300 font-sans">
              {data.astro.moon_sign.label}
            </p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <footer className="pt-4 border-t border-star-dust-800/50">
        <div className="flex flex-wrap justify-center gap-4">
          {data.astro.highlights.map((h, i) => (
            <span
              key={i}
              className="text-[9px] uppercase tracking-[0.2em] text-star-dust-600 font-sans"
            >
              {h}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

interface HoroscopeDialogProps {
  sign: ZodiacSign;
}

export function HoroscopeDialog({ sign }: HoroscopeDialogProps) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<HoroscopeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { start, end } = sign.date;
  const dateLabel = `${start.month} ${start.day} - ${end.month} ${end.day}`;

  async function handleOpen() {
    setOpen(true);
    if (data) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/horoscope?sign=${sign.name.toLowerCase()}`
      );
      if (!res.ok) throw new Error("No se pudo obtener el horóscopo.");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {/* Zodiac card — same styles as the original ZodiacSign component */}
        <div
          onClick={handleOpen}
          className="w-full h-64 flex flex-col items-center justify-between p-6 border-2 border-star-dust-700 hover:border-koromiko-300 hover:-translate-y-1 hover:scale-102 transition-all duration-400 ease-in-out cursor-pointer"
        >
          <figure className="w-full aspect-square overflow-hidden">
            <Image
              src={sign.image}
              alt={sign.name}
              width={100}
              height={100}
              className="w-full h-full object-contain"
            />
          </figure>
          <div className="text-center">
            <h3 className="text-xl font-bold font-title text-koromiko-300">
              {sign.name}
            </h3>
            <p className="text-center text-xs font-sans">{dateLabel}</p>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent size="lg" loading={loading}>
        {/* Header */}
        <div className="flex flex-col items-center gap-3 px-6 pt-8 pb-4 border-b border-star-dust-800">
          <p className="text-[10px] uppercase tracking-[0.4em] text-koromiko-500/60 font-sans">
            Predicción Estelar
          </p>
          <h2 className="text-4xl font-extralight text-star-dust-100 tracking-tighter capitalize font-title">
            {sign.name}
          </h2>
        </div>

        {/* Body */}
        <div className="overflow-y-auto max-h-[65vh] px-6 py-6">
          {error ? (
            <p className="text-center text-sm text-star-dust-500 font-sans py-8">
              {error}
            </p>
          ) : data ? (
            <HoroscopeContent data={data} />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
