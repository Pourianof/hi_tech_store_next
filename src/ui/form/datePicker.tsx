"use client";
import DatePicker from "react-multi-date-picker";

const DATE_PICKER_CLASS = "p-1 px-1.5 border border-stone-600 rounded w-40";
export function AppDatePicker() {
  return <DatePicker inputClass={DATE_PICKER_CLASS} />;
}

export function AppRangeDatePicker() {
  return <DatePicker inputClass={DATE_PICKER_CLASS} range />;
}
