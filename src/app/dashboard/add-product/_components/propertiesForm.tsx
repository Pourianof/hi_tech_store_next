import { CategoryProperty, PropertyType } from "@/core/models/category";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { ErrorMessageLabel } from "@/ui/form/errorMessageLabel";
import {
  ControlledRadioButton,
  ControlledRadioButtonGroup,
} from "@/ui/form/radioButton";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";

export function CategoryPropertiesForm({
  properties,
  baseFieldName,
}: {
  baseFieldName?: string;
  properties: CategoryProperty[];
}) {
  if (!properties.length) {
    return (
      <div className="text-center bg-gradient-end-blue rounded font-semibold p-1">
        No property item
      </div>
    );
  }

  const fieldNamePrefix = baseFieldName ? `${baseFieldName}.` : "";
  return properties.map((prop, index) => {
    return (
      <div
        key={prop.propertyId}
        className="not-[div:last-child]:border-b not-[div:last-child]:border-b-slate-500 pb-2"
      >
        <label>
          <span className="inline-block w-full text-center bg-red-300 p-1 py-0.5 mt-2 rounded font-semibold">
            {prop.name}
          </span>
          <p className="text-sm my-1 bg-slate-500 rounded py-0.5 px-1 text-slate-300">
            {prop.description}
          </p>
        </label>
        <ErrorLabeledInput
          type="text"
          filedName={`${fieldNamePrefix}properties.${index}.propertyId`}
          placeholder={`Value for ${prop.name} property`}
          initValue={prop.propertyId}
          hidden
        />
        <div className="bg-slate-300 p-2 rounded">
          {prop.propertyType == PropertyType.Boolean ? (
            <Column>
              <ControlledRadioButtonGroup
                fieldName={`${fieldNamePrefix}properties.${index}.propertyValue`}
              >
                <Row className="gap-4">
                  <ControlledRadioButton value={true} label={"Yes"} />
                  <ControlledRadioButton value={false} label={"No"} />
                </Row>
              </ControlledRadioButtonGroup>

              <ErrorMessageLabel
                fieldName={`${fieldNamePrefix}properties.${index}.propertyValue`}
              />
            </Column>
          ) : (
            <ErrorLabeledInput
              name={prop.name}
              className="border border-black/40"
              type={
                prop.propertyType == PropertyType.Number ? "number" : "text"
              }
              filedName={`${fieldNamePrefix}properties.${index}.propertyValue`}
              placeholder={`Value for ${prop.name} property`}
            />
          )}
        </div>
      </div>
    );
  });
}
