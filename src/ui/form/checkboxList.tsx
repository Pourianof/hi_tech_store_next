import { NoContextDefinedError } from "@/ui/errors/NoContextDefinedError";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { createContext, ReactNode, useContext } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ICheckboxContext {
  handleCheck: (name: string) => void;
  values: string[];
}

const CheckboxContext = createContext<ICheckboxContext>(
  {} as unknown as ICheckboxContext,
);

function CheckboxContextProvider({
  children,
  context,
}: {
  children: React.ReactElement;
  context: ICheckboxContext;
}) {
  return (
    <CheckboxContext.Provider value={context}>
      {children}
    </CheckboxContext.Provider>
  );
}

function useCheckboxContext() {
  const context = useContext(CheckboxContext);

  if (!context) {
    throw new NoContextDefinedError("CheckboxContext");
  }

  return context;
}

export function CheckboxList({
  fieldName,
  children,
  initialSelectedItems,
  valueControl,
}: {
  fieldName?: string;
  children: React.ReactNode;
  initialSelectedItems?: string[];
  valueControl?: {
    value: string[];
    onChange(items: string[]): void;
  };
}) {
  const { control } = useFormContext();

  if (valueControl) {
    return <CheckboxListRaw {...valueControl}>{children}</CheckboxListRaw>;
  }

  if (!fieldName) {
    throw new Error(
      "If no valueControl prop specified so it considered as react-hook-form control so you must specify fieldname prop",
    );
  }

  return (
    <Controller
      name={fieldName}
      control={control}
      defaultValue={initialSelectedItems}
      render={({ field }) => {
        const { value, onChange } = field;
        return (
          <CheckboxListRaw onChange={onChange} value={value}>
            {children}
          </CheckboxListRaw>
        );
      }}
    />
  );
}

function CheckboxListRaw({
  value,
  onChange,
  children,
}: {
  value: string[];
  onChange(items: string[]): void;
  children: ReactNode;
}) {
  const handleCheck = (item: string) => {
    if (!value) {
      onChange([item]);
      return;
    }
    if (value.includes(item)) {
      // delete if already exists
      onChange(value.filter((i: string) => i !== item));
    } else {
      // add it
      onChange([...value, item]);
    }
  };
  return (
    <CheckboxContextProvider context={{ handleCheck, values: value ?? [] }}>
      <FormGroup>{children}</FormGroup>
    </CheckboxContextProvider>
  );
}

export function CheckboxItem({
  label,
  checkedValue,
}: {
  label: React.ReactElement;
  checkedValue: string;
}) {
  const checkboxContext = useCheckboxContext();

  return (
    <FormControlLabel
      control={
        <Checkbox
          sx={{
            backgroundColor: "#f5f8fa",
          }}
          checked={checkboxContext.values.includes(checkedValue)}
          onChange={() => checkboxContext.handleCheck(checkedValue)}
        />
      }
      label={label}
    />
  );
}
