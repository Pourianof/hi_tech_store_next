"use client";
import DatePicker, { CalendarProps, DateObject } from "react-multi-date-picker";
import { Column } from "../layouts/column";
import { ErrorMessageLabel } from "./errorMessageLabel";
import { AppController, AppControllerProps } from "./appController";

type Props = {
  dateModifier?: (date: DateObject) => DateObject;
} & Pick<CalendarProps, "minDate" | "maxDate"> &
  Omit<AppControllerProps, "render">;

const DATE_PICKER_CLASS = "p-1 px-1.5 border border-stone-600 rounded w-40";
export function AppDatePicker({
  fieldname,
  dateModifier,
  conrollerProps,
  defaultValue,
  required,
  ...props
}: Props) {
  return (
    <Column>
      <AppController
        fieldname={fieldname}
        required={required}
        defaultValue={defaultValue}
        conrollerProps={conrollerProps}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            value={value}
            onChange={(date) =>
              date
                ? onChange((dateModifier?.(date) ?? date)?.toUnix() * 1000)
                : undefined
            }
            inputClass={DATE_PICKER_CLASS}
            {...props}
          />
        )}
      />
      <ErrorMessageLabel fieldName={fieldname} />
    </Column>
  );
}

export function AppRangeDatePicker() {
  return <DatePicker inputClass={DATE_PICKER_CLASS} range />;
}
