import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface RadioToggleProps
    extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string;
    checked?: boolean;
    onChange?: () => void;
    containerStyle?: string;
}

export default function Checked({ label, checked, onChange, containerStyle, ...props }: RadioToggleProps) {
    return (
        <label className={`flex items-center cursor-pointer gap-2 ${containerStyle}`}>
            <input type="radio" className="sr-only" checked={checked} onChange={onChange} {...props} />
            <div
                className={`w-8 h-8 rounded-full border-2 border-neutral-300 flex items-center justify-center transition-all ${checked ? "bg-primary-600 border-primary-600 shadow-md shadow-primary-600/50" : "bg-transparent"
                    }`}
            />
            {label && <span className="text-white text-xl">{label}</span>}
        </label>
    );
}