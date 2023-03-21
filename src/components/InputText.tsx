import React, { useState, useRef } from "react";

interface InputProps {
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validationPattern?: string;
}

export default function InputText({
  value,
  onChange,
  placeholder,
  validationPattern,
}: InputProps) {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<string[] | null>(
    null
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    if (!validationPattern) {
      return;
    }

    event.preventDefault();

    const inputValue = event.target.value;

    try {
      setIsValidating(true);
      const response = await fetch("/api/validate-input-with-regex", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pattern: validationPattern, input: inputValue }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      const result = JSON.parse(data.result);

      if (result === "input_valid") {
        setValidationResult(null);
      } else {
        setValidationResult(result);
      }
    } catch (error: any) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`px-3 py-2 border rounded  mb-2 w-full transition-all ${
          isValidating
            ? "bg-gray-200 border-gray-300 outline-gray-300 cursor-wait"
            : ""
        } ${
          validationResult
            ? "border-red-500 outline-red-500"
            : "border-gray-400 outline-gray-400"
        }`}
        disabled={isValidating}
      />
      {validationResult && (
        <div className="w-full text-red-500 mb-2">{validationResult}</div>
      )}
    </>
  );
}
