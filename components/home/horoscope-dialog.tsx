"use client";

import { getDailyHoroscope } from "@/lib/api";
import { HoroscopeData, ZodiacSign, ScoreFactor } from "@/lib/types";
import {
  CircleIcon,
  MoonIcon,
  SparklesIcon,
  WindIcon,
  ZapIcon,
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { ZodiacSignCard } from "./zodiac-sign-card";
import Image from "next/image";

function Factor(factor: ScoreFactor ) {
  return (<></>)
}

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

function HoroscopeContent({ data }: { data: HoroscopeData }) {
  return (
    <div className="flex flex-col gap-8 pb-2">
      {/* Moon phase + date */}
      <div className="flex items-center justify-center gap-4 text-[10px] text-star-dust-500 tracking-widest uppercase font-sans">
        <span>{data.date}</span>
        <CircleIcon className="w-1 h-1 fill-current" />
        <span>Fase {data.astro.moon_phase.label}</span>
      </div>

      {/* Overall score ring */}
      <div className="flex justify-center">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 border border-star-dust-800 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-2 border border-star-dust-800/50 rounded-full animate-[spin_15s_linear_infinite_reverse] shadow" />
          <div className="text-center z-10">
            <span className="block text-3xl font-extralight text-star-dust-200 font-title">
              {data.scores.overall}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* SVG del Progreso Circular */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-lg"
            viewBox="0 0 100 100"
          >
            {/* Círculo de fondo (track) */}
            <circle
              cx="50"
              cy="50"
              r={45}
              fill="transparent"
              strokeWidth="1"
              className="stroke-star-dust-800/40"
            />
            {/* Círculo de progreso */}
            <circle
              cx="50"
              cy="50"
              r={45}
              fill="transparent"
              strokeWidth="2"
              strokeDasharray={2 * Math.PI * 45}
              strokeDashoffset={
                2 * Math.PI * 45 -
                (2 * Math.PI * 45 * data.scores.overall) / 100
              }
              strokeLinecap="round"
              // Cambia el color del stroke según tu paleta (ej. stroke-amber-500 o stroke-star-dust-400)
              className="stroke-amber-500 transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Opcional: Mantenemos un anillo interior sutil girando para el efecto místico */}
          <div className="absolute inset-4 border border-star-dust-800/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

          {/* Texto Central */}
          <div className="text-center z-10 flex flex-col items-center justify-center">
            <span className="block text-3xl font-extralight text-star-dust-200 font-title">
              {data.scores.overall}
            </span>
            {/* Opcional: Un pequeño subtítulo si quieres darle más contexto */}
            {/* <span className="text-[8px] uppercase tracking-widest text-star-dust-500 mt-1">Balance</span> */}
          </div>
        </div>
      </div>

      {/* Prediction text */}
      <article className="relative px-1">
        <div className="absolute -left-1 -top-1 text-koromiko-500/20">
          <SparklesIcon className="w-5 h-5" />
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
          <WindIcon className="w-4 h-4 text-star-dust-600" />
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
          <ZapIcon className="w-4 h-4 text-star-dust-600" />
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
          <MoonIcon className="w-4 h-4 text-star-dust-600" />
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
              {h.label}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}

interface HoroscopeDialogProps {
  sign: ZodiacSign;
}

export function HoroscopeDialog({ sign }: HoroscopeDialogProps) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<HoroscopeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = async () => {
    setOpen(true);
    setLoading(true);
    setError(null);
    try {
      const response = await getDailyHoroscope("v2", sign.id);
      setData(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <ZodiacSignCard sign={sign} onClick={handleOpen} />
      </DialogTrigger>
      <DialogContent size="4xl" loading={loading}>
        {error && (
          <p className="text-center text-sm text-star-dust-500 font-sans py-8">
            {error}
          </p>
        )}
        {data && (
          <>
            <DialogHeader>
              <span className="text-[10px] uppercase font-bold tracking-[0.4em]">
                Daily Horoscope
              </span>
              <span className="text-[10px] uppercase tracking-widest text-star-dust-500 font-sans">
                {data?.date}
              </span>
            </DialogHeader>
            <div className="px-6 pb-8 overflow-y-auto max-h-[65vh] flex gap-6">
              <div className="flex-2 pb-6">
                <div className="w-full flex gap-3 items-center mb-4">
                  <figure className="w-10 aspect-square overflow-hidden">
                    <Image
                      src={sign.image}
                      alt={sign.name}
                      width={100}
                      height={100}
                      className="w-full h-full object-contain"
                    />
                  </figure>
                  <h2 className="text-4xl font-extralight text-koromiko-300 tracking-tighter capitalize font-title">
                    {sign.name}
                  </h2>
                  <span className="text-[10px] uppercase font-bold tracking-[0.4em] ml-auto text-koromiko-500/80 border border-star-dust-700 px-4 py-1">
                    {data.content.theme}
                  </span>
                </div>
                <p className="text-base text-center text-star-dust-300 leading-relaxed font-medium font-sans p-4">
                  {data.content.text}
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {data.content.keywords.map((keyword, i) => (
                    <span key={i} className="text-[10px] uppercase font-bold tracking-[0.4em] text-koromiko-500/80">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              {/* Divider */}
              <div className="w-px bg-star-dust-800"></div>
              <div className="flex-1 pb-6 flex flex-col items-center">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  {/* SVG del Progreso Circular */}
                  <svg
                    className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-lg"
                    viewBox="0 0 100 100"
                  >
                    {/* Círculo de fondo (track) */}
                    <circle
                      cx="50"
                      cy="50"
                      r={45}
                      fill="transparent"
                      strokeWidth="1"
                      className="stroke-star-dust-800/40"
                    />
                    {/* Círculo de progreso */}
                    <circle
                      cx="50"
                      cy="50"
                      r={45}
                      fill="transparent"
                      strokeWidth="2"
                      strokeDasharray={2 * Math.PI * 45}
                      strokeDashoffset={
                        2 * Math.PI * 45 -
                        (2 * Math.PI * 45 * data.scores.overall) / 100
                      }
                      strokeLinecap="round"
                      // Cambia el color del stroke según tu paleta (ej. stroke-amber-500 o stroke-star-dust-400)
                      className="stroke-amber-300 transition-all duration-1000 ease-out"
                    />
                  </svg>

                  {/* Opcional: Mantenemos un anillo interior sutil girando para el efecto místico */}
                  <div className="absolute inset-4 border border-star-dust-800/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                  {/* Texto Central */}
                  <div className="text-center z-10 flex flex-col items-center justify-center">
                    <span className="block text-3xl font-extralight text-star-dust-200 font-title">
                      {data.scores.overall}
                    </span>
                    {/* Opcional: Un pequeño subtítulo si quieres darle más contexto */}
                    <span className="text-[8px] uppercase tracking-widest text-star-dust-500 mt-1">
                      Overall
                    </span>
                  </div>
                </div>
                <section className="w-full flex flex-col gap-4 pt-6">
                  <Metric label="Love" value={data.scores.love} />
                  <Metric label="Career" value={data.scores.career} />
                  <Metric label="Money" value={data.scores.money} />
                  <Metric label="Health" value={data.scores.health} />
                </section>
              </div>
            </div>
          </>
        )}    

        {/* Body
        <div className="overflow-y-auto max-h-[65vh] px-6 py-6">
          {error ? (
            <p className="text-center text-sm text-star-dust-500 font-sans py-8">
              {error}
            </p>
          ) : data ? (
            <HoroscopeContent data={data} />
          ) : null}
        </div> */}
      </DialogContent>
    </Dialog>
  );
}
