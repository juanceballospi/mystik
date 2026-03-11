import { ZodiacSign as ZodiacSignType } from "@/lib/zodiac-signs";
import Image from "next/image";

interface ZodiacSignProps {
  sign: ZodiacSignType;
}

export function ZodiacSign({ sign }: ZodiacSignProps) {
  const { start, end } = sign.date;
  const dateLabel = `${start.month} ${start.day} - ${end.month} ${end.day}`;

  return (
    <div className="w-full h-64 flex flex-col items-center justify-between p-6 border-2 border-star-dust-700 hover:border-koromiko-300 hover:-translate-y-1 hover:scale-102 transition-all duration-400 ease-in-out cursor-pointer">
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
        <p className="text-center text-xs">{dateLabel}</p>
      </div>
    </div>
  );
}
