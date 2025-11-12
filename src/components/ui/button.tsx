import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[hsl(38,44%,49%)] to-[hsl(42,68%,69%)] text-white shadow-[0_2px_6px_rgba(182,140,69,0.4)] hover:brightness-110 rounded-[6px]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-[6px]",
        outline: "border border-[hsl(38,44%,49%)] bg-transparent text-[hsl(38,44%,49%)] hover:bg-[hsl(38,44%,49%)] hover:text-white rounded-[6px]",
        secondary: "bg-[hsl(14,65%,89%)] text-[hsl(20,9%,16%)] hover:bg-[hsl(14,65%,85%)] rounded-[6px]",
        ghost: "bg-transparent text-[hsl(38,44%,49%)] hover:underline",
        link: "text-[hsl(38,44%,49%)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8 text-base uppercase tracking-wide",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
