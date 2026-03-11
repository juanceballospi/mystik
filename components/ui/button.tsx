import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"


const buttonVariants = cva(
    "inline-flex items-center justify-center text-xs font-semibold tracking-widest transition-all focus:outline-none focus:ring-none focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 duration-300 ease-in-out cursor-pointer disabled:cursor-not-allowed",
    {
        variants: {
            variant: {
                default: "bg-star-dust-950 border-star-dust-700 hover:text-star-dust-950 hover:bg-koromiko-300 hover:border-koromiko-300",
                outline: "border border-star-dust-700 text-star-dust-700 hover:bg-star-dust-100",
                ghost: "text-star-dust-700 hover:bg-star-dust-100",
                primary: "bg-koromiko-300 border-koromiko-300 text-star-dust-950 hover:bg-koromiko-50 hover:border-koromiko-50",
            },
            size: {
                default: "px-9 py-2",
                sm: "px-3 py-1.5 text-sm",
                lg: "px-12 py-3",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>) {
  const Comp = "button"
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }