import { useId } from "react";
import { twMerge } from "tailwind-merge";

interface Segment {
    label: string;
    value: string | number;
}

interface SegmentedControlProps {
    className?: string;
    segments: Segment[];
    value: string | number;
    onValueChange: (value: string | number) => void;
    disabled?: boolean;
}

export default function SegmentedControl({
    className,
    segments,
    value,
    onValueChange,
    disabled
}: SegmentedControlProps) {
    const controlId = useId();

    return (
        <div className={twMerge("flex flex-wrap", className)}>
            {segments.map((segment, index) => (
                <label key={index}>
                    <input
                        type="radio"
                        name={controlId}
                        value={segment.value}
                        onChange={(e) => onValueChange(e.target.value)}
                        checked={value === segment.value}
                        className="hidden peer"
                        disabled={disabled}
                    />
                    <span
                        className={twMerge(
                            "block cursor-pointer bg-neutral px-4 py-1 relative text-center tracking-wide peer-checked:bg-primary peer-checked:text-black",
                            index === 0 ? "rounded-l-md" : "",
                            index === segments.length - 1 ? "rounded-r-md" : "",
                            disabled ? "cursor-not-allowed" : ""
                        )}
                    >
                        {segment.label}
                    </span>
                </label>
            ))}
        </div>
    );
}
