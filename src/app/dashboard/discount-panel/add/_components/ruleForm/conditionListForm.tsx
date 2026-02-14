import { DiscountEntity } from "@/core/models/discount";
import { useStaticData } from "@/ui/contexts/StaticDataInjector";
import { OutlinedButton } from "@/ui/form/AppButtons";
import {
  useFieldPath,
  FieldnamePathProvider,
} from "@/ui/form/contexts/FieldnamePathContext";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { LabeldInput } from "@/ui/form/inputs";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import {
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useFieldArray, Controller } from "react-hook-form";
import { EntityPropertyOperationSelection } from "./conditionOperatorSelection";
import { EntityPropertySelection } from "./entityPropertySelection";
import { DISCOUNT_Entities_KEY } from "./ruleForm";
import Icon from "@/ui/icons/icon";
import toast from "react-hot-toast";

export function ConditionForm() {
  const conditionsPath = useFieldPath("conditions");
  const { fields, append, remove } = useFieldArray({
    name: conditionsPath,
  });

  const [activeConditionIndex, setActiveConditionIndex] = useState<number>(0);

  useEffect(() => {
    if (fields.length <= activeConditionIndex) {
      setActiveConditionIndex(fields.length - 1);
    }
  }, [activeConditionIndex, fields.length]);

  function removeCondition(index: number) {
    if (fields.length <= 1) {
      toast.error("At least one condition must defined in a rule");
      return;
    }

    remove(index);
  }

  return (
    <div>
      <h4 className="font-semibold text-xl">Conditions: </h4>

      <Column className="gap-2 p-4 bg-slate-200 ">
        {fields.map((cond, index) => (
          <FieldnamePathProvider name={["conditions", index]} key={cond.id}>
            <ConditionItem
              conditionIndex={index}
              onConditionRemove={removeCondition}
            />
          </FieldnamePathProvider>
        ))}
        <OutlinedButton onClick={() => append({})}>
          Add new condition
        </OutlinedButton>
      </Column>
    </div>
  );
}

function ConditionItem({
  conditionIndex,
  onConditionRemove,
}: {
  conditionIndex: number;
  onConditionRemove(index: number): void;
}) {
  const entityFieldname = useFieldPath("discountEntity");
  const valueFieldname = useFieldPath("value");

  const discountEntities = useStaticData(
    DISCOUNT_Entities_KEY,
  ) as DiscountEntity[];

  return (
    <Row>
      <Column center>
        <div className="bg-discount-condition-blue w-8 rounded-xl aspect-square flex justify-center items-center font-semibold">
          #{conditionIndex + 1}
        </div>
        <IconButton onClick={() => onConditionRemove(conditionIndex)}>
          <Icon name="trash" className="text-lg text-red-500" />
        </IconButton>
      </Column>
      <div className="bg-discount-condition-blue p-2 rounded grow">
        <Row>
          <LabeldInput label="Choose the criteria you want to target">
            <Controller
              key={conditionIndex}
              name={entityFieldname}
              render={({ field: { value, onChange } }) => (
                <FormControl fullWidth>
                  <InputLabel id="entity">Entity</InputLabel>
                  <Select
                    size="small"
                    label="Entity"
                    labelId="demo-simple-select-label"
                    value={value}
                    onChange={({ target: { value } }) => onChange(value)}
                  >
                    {discountEntities.map((entity) => (
                      <MenuItem key={entity.id} value={entity.id}>
                        {entity.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </LabeldInput>
          <EntityPropertySelection />
          <EntityPropertyOperationSelection />
          <LabeldInput label="Value">
            <ErrorLabeledInput
              filedName={valueFieldname}
              type="text"
              placeholder="Condition value"
            />
          </LabeldInput>
        </Row>
      </div>
    </Row>
  );
}
