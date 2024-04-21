import { useId } from "react";
import { twJoin } from "tailwind-merge";

interface Segment {
    label: string;
    value: string | number;
}

interface SegmentedControlProps {
    segments: Segment[];
    value: string | number;
    onValueChange: (value: string | number) => void;
}

export default function SegmentedControl({ segments, value, onValueChange }: SegmentedControlProps) {
    const controlId = useId();

    return (
        <div className="flex flex-wrap mt-2 justify-center">
            {segments.map((segment, index) => (
                <label key={index}>
                    <input
                        type="radio"
                        name={controlId}
                        value={segment.value}
                        onChange={(e) => onValueChange(e.target.value)}
                        checked={value === segment.value}
                        className="hidden peer"
                    />
                    <span
                        className={twJoin(
                            "block cursor-pointer bg-neutral px-4 py-1 relative text-center tracking-wide peer-checked:bg-primary",
                            index === 0 ? "rounded-l-md" : "",
                            index === segments.length - 1 ? "rounded-r-md" : ""
                        )}
                    >
                        {segment.label}
                    </span>
                </label>
            ))}
        </div>
    );
}
