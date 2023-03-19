import React, { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-3 py-2 text-white bg-teal-600 rounded text-center cursor-pointer"
    >
      {children}
    </button>
  );
}
