import React, { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  color: string;
}

const buttonStyles: Record<ButtonProps["color"], string> = {
  primary: "bg-teal-600 text-white",
  secondary: "border border-teal-600 text-teal-600",
  warning: "bg-red-500 text-white",
  disabled: "bg-gray-300 text-gray-400 pointer-events-none",
};

export default function Button({
  children,
  onClick,
  disabled = false,
  color = "primary",
}: ButtonProps) {
  const styles = buttonStyles[disabled ? "disabled" : color];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-2 cursor-pointer ${styles} rounded text-center min-w-[8rem]`}
    >
      {children}
    </button>
  );
}
