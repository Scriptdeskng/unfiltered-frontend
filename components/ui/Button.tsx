import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "white" | "black" | "outline" | "outlineDark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center rounded-sm font-dm-sans font-medium " +
  "transition-colors duration-200 whitespace-nowrap cursor-pointer " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-transparent disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  white: "bg-white text-black hover:bg-white/85 focus-visible:ring-white",
  black: "bg-black text-white hover:bg-black/85 focus-visible:ring-black",
  outline:
    "border border-[#FFFFFF] border-[1.5px] text-white font-semibold bg-transparent " +
    "hover:bg-white hover:text-black hover:border-white font-semibold focus-visible:ring-white",
  outlineDark:
    "border border-[#000000] border-[1.5px] text-black bg-transparent " +
    "hover:bg-black hover:text-white hover:border-black font-semibold focus-visible:ring-black",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-[52px] px-8 text-base",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps> & { href?: never };

type LinkProps = BaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof BaseProps | "href"> & {
    href: string;
  };

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "white", size = "md", className = "", children } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href) {
    const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    return (
      <Link className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as ButtonProps;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;