"use client";
import { AppDatePicker } from "@/ui/form/datePicker";
import { LabeldInput } from "@/ui/form/inputs";

import { useWatch } from "react-hook-form";
import { DISCOUNT_END_DATE, DISCOUNT_START_DATE } from "./ruleForm/fieldNames";

export function DiscountDateIntervalInput() {
  const [startDate, endDate] = useWatch({
    name: [DISCOUNT_START_DATE, DISCOUNT_END_DATE],
  });
  return (
    <div className="flex gap-4">
      <LabeldInput label="Start date">
        <AppDatePicker
          fieldname={DISCOUNT_START_DATE}
          maxDate={endDate}
          required
        />
      </LabeldInput>
      <LabeldInput label="End date">
        <AppDatePicker
          fieldname={DISCOUNT_END_DATE}
          minDate={startDate}
          required
        />
      </LabeldInput>
    </div>
  );
}
