"use client";

import * as RadiwSlider from "@radix-ui/react-slider";

interface SLiderProps {
    value?:number;
    onChange?: (value: number) => void;
}; 

const Slider: React.FC<SLiderProps> = ({
    value = 1,
    onChange
}) => {
    const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0]);
    }


    return ( 
    <RadiwSlider.Root
    className="
    relative
    flex
    items-center
    select-none
    touch-none
    w-full
    h-10
    "
    defaultValue={[1]}
    value={[value]}
    onValueChange={handleChange}
    max={1}
    step={0.1}
    aria-label="Volume"
    >
        <RadiwSlider.Track
        className="
        bg-neutral-600
        relative
        grow
        rounded-full
        h-[3px]
        "
        >
            <RadiwSlider.Range
            className="
            absolute
            bg-white
            rounded-full
            h-full
            "
            />
        </RadiwSlider.Track>
    </RadiwSlider.Root>
    );
}
 
export default Slider;