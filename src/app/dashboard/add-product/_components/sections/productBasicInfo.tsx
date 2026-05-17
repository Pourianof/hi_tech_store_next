import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { LabeldInput } from "@/ui/form/inputs";
import { BrandSelectorInput } from "../brandSelectorInput";

export function ProductBasicInfo() {
  return (
    <>
      <LabeldInput label="Title">
        <ErrorLabeledInput
          filedName="title"
          placeholder="Product title"
          type="text"
        />
      </LabeldInput>

      <label>Description</label>
      <ErrorLabeledInput
        filedName="description"
        placeholder="Product description"
        type="text"
      />
      <BrandSelectorInput fieldname="brandId" setIdAsValue />
    </>
  );
}
