import { Title } from "../ui/title";

export function Hero() {
  return (
    <section className="w-full relative isolate px-8 py-64 flex flex-col items-center gap-4 bg-[url('/hero.jpg')]">
      <div className="absolute inset-0 bg-linear-to-b to-star-dust-950 from-star-dust-950/20 from-30% -z-20"></div>
      <div className="w-full max-w-3xl text-center">
        <Title>Astrology Readings & Shamanic Healing</Title>
        <p className="pt-4 text-center max-w-sm mx-auto font-medium leading-relaxed">
          Blend the timeless wisdom of classical astrology with shamanic energy
          work and modern cognitive psychology
        </p>
      </div>
    </section>
  );
}
