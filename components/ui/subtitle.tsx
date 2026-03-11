import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";

interface SubtitleProps {
  subtitle: string;
  description?: string;
  className?: string;
  position?: "center" | "left" | "right";
}

const subtitleVariants = cva(
  "flex flex-col mb-20",
  {
    variants: {
      position: {
        center: "items-center justify-center text-center",
        left: "items-start justify-start text-left",
        right: "items-end justify-end text-right",
      },
    },
    defaultVariants: {
      position: "center",
    },
  }
);

export function Subtitle({ subtitle, description, className, position }: SubtitleProps & VariantProps<typeof subtitleVariants>) {
  return (
    <div className={cn(subtitleVariants({ position, className }))}>
      <Image src="/icon.png" alt="Icon" width={500} height={500} className="w-20 h-12" />
      <h2 className="text-5xl font-bold font-title tracking-wider leading-tight text-koromiko-300 mt-4 mb-8">
        {subtitle}
      </h2>
      {description && (
        <p className="max-w-xs mx-auto text-center font-medium leading-relaxed mt-2.5">
          {description}
        </p>
      )}
    </div>
  );
}
