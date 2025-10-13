"use client";
import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export function RangeSlider({
  min,
  max,
  minDistance,
  fieldName,
  initialRange,
}: {
  initialRange?: [number, number];
  min: number;
  max: number;
  fieldName: string;
  minDistance?: number;
}) {
  const { setValue, clearErrors } = useFormContext();
  const [range, setRange] = useState<number[]>(
    initialRange
      ? [
          Math.max(initialRange.at(0) ?? min) >= max
            ? min
            : Math.max(initialRange.at(0) ?? min),
          Math.min(initialRange.at(1) ?? max) <= min
            ? max
            : Math.min(initialRange.at(1) ?? max),
        ]
      : [min, max]
  );
  const minimuDistance = minDistance ?? 0;
  const handleChange1 = (
    event: Event,
    newValue: number[],
    activeThumb: number
  ) => {
    if (activeThumb === 0) {
      setRange([Math.min(newValue[0], range[1] - minimuDistance), range[1]]);
    } else {
      setRange([range[0], Math.max(newValue[1], range[0] + minimuDistance)]);
    }
  };

  useEffect(() => {
    setValue(fieldName, { lower: range[0], upper: range[1] });
    clearErrors(fieldName);
  }, [fieldName, range, setValue, clearErrors]);

  return (
    <Slider
      sx={{
        color: "var(--color-primary-blue-0c)",
        "& .MuiSlider-thumb": {
          borderRadius: "50%",
          width: "10px",
          height: "10px",
        },
      }}
      min={min}
      max={max}
      getAriaLabel={() => "Minimum distance"}
      value={range}
      onChange={handleChange1}
      valueLabelDisplay="auto"
      disableSwap
    />
  );
}
