import { Hero } from "@/components/home/hero";
import { Horoscope } from "@/components/home/horoscope";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center font-sans">
      <Hero />
      <Horoscope />
    </main>
  );
}
