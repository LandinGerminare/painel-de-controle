import { Dispatch, SetStateAction, useRef, useState } from "react";

interface ICodeInput {
  code: string[];
  setCode: Dispatch<SetStateAction<string[]>>;
  length: number;
}

export default function CodeInput({ code, setCode, length }: ICodeInput) {


  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  function focusInput(index: number) {
    inputsRef.current[index]?.focus();
  }

  function handleChange(value: string, index: number) {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < length - 1) {
      focusInput(index + 1);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        focusInput(index - 1);
      }
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);

    if (!pasted) return;

    const newCode = Array(length).fill("");
    pasted.split("").forEach((char, i) => {
      newCode[i] = char;
    });

    setCode(newCode);
    focusInput(Math.min(pasted.length, length - 1));
  }

  return (
    <div className="flex gap-3 w-full justify-center">
      {code.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="
            w-14 h-14 text-black
            text-center text-xl font-semibold
            border border-gray-400 rounded-xl
            focus:outline-none focus:border-primary-500
          "
        />
      ))}
    </div>
  );
}
