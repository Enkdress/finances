import { ButtonHTMLAttributes } from "react";
import clsx from "classnames";

type Variants = "primary" | "secondary" | "label" | "gray";
type CustomButtonProps = {
  variant?: Variants;
};

export default function Button({
  variant,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & CustomButtonProps) {
  const primaryButton = "bg-emerald-600 dark:hover:bg-emerald-800";
  const secondaryButton = "";
  const grayButton = "bg-gray-700 dark:hover:bg-gray-800";
  const labelButton = "dark:hover:bg-gray-800 hover:bg-gray-300";

  return (
    <button
      {...props}
      className={clsx(
        "text-xs py-1 px-2 md:text-sm md:p-2 outline-none rounded-md",
        variant === "primary" ? primaryButton : "",
        variant === "secondary" ? secondaryButton : "",
        variant === "gray" ? grayButton : "",
        variant === "label" ? labelButton : "",
        className
      )}
    >
      {props.children}
    </button>
  );
}
