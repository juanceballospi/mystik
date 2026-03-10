import Image from "next/image";

export function Hero() {
  return <section className="w-full relative isolate px-8 py-60 flex flex-col items-center gap-4">
    <figure className="absolute w-full inset-0 top-0 bottom-0 -z-10">
      <Image src="/hero.jpg" width={1000} height={100} alt="Hero Background" className="w-full h-full object-cover" />
    </figure>
    <div className="w-full max-w-3xl text-center">

    <h1 className="text-4xl font-bold">Welcome to Mystik</h1>
    </div>
  </section>
}