import { InputHTMLAttributes } from "react";

type CustomInputProps = {
  label?: string;
};

export default function Input({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & CustomInputProps) {
  return (
    <p>
      {label ?? ""}
      <input
        {...props}
        className=" dark:bg-slate-800 rounded-md text-sm w-full dark:text-gray-100 outline-none px-4 py-2 focus:ring-1 dark:focus:ring-slate-700 focus:ring-gray-500"
      />
    </p>
  );
}
