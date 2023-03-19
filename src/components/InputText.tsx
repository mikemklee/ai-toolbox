import React from "react";

interface InputProps {
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputText({
  value,
  onChange,
  placeholder,
}: InputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
