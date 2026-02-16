"use client";
import { Controller } from "react-hook-form";
import DatePicker from "react-multi-date-picker";

type Props = {
  fieldname: string;
};

const DATE_PICKER_CLASS = "p-1 px-1.5 border border-stone-600 rounded w-40";
export function AppDatePicker(props: Props) {
  return (
    <Controller
      name={props.fieldname}
      render={({ field: { onChange, value } }) => (
        <DatePicker
          value={value}
          onChange={(date) =>
            date ? onChange(date?.toUnix() * 1000) : undefined
          }
          inputClass={DATE_PICKER_CLASS}
        />
      )}
    />
  );
}

export function AppRangeDatePicker() {
  return <DatePicker inputClass={DATE_PICKER_CLASS} range />;
}
