import React, { useRef } from "react";

interface InputProps {
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export default function InputText({
  value,
  onChange,
  onBlur,
  placeholder,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event.key);
    if (event.key === "Enter" && inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      className="px-3 py-2 border border-teal-600 rounded outline-teal-600 mb-2 max-w-[20rem] w-full"
    />
  );
}
