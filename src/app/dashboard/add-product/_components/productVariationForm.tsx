import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { FilePreviewList } from "./productMediaSelector";
import { useColors } from "./_hooks/useColors";
import { ColorInput } from "@/ui/form/colorInput";
import { Controller } from "react-hook-form";
import { IconButton } from "@mui/material";
import Icon from "@/ui/icons/icon";
import { Row } from "@/ui/layouts/row";
import { Column } from "@/ui/layouts/column";
import { LabeldInput } from "@/ui/form/inputs";
import { useFieldPath } from "@/ui/form/contexts/FieldnamePathContext";

export function ProductVariationForm({
  index,
  remove,
}: {
  index: number;
  remove(): void;
}) {
  const priceFN = useFieldPath(index, "price");
  const inventoryFN = useFieldPath(index, "inventory");
  const colorFN = useFieldPath(index, "color");
  const mediaFN = useFieldPath(index, "media");

  const colors = useColors();

  return (
    <Column className="p-4 rounded bg-[#c6d2de] gap-2">
      <Row className="justify-between">
        <span className="font-semibold inline-block p-2 rounded bg-white aspect-square">
          #{index + 1}
        </span>
        <IconButton
          onClick={() => {
            remove();
          }}
        >
          <Icon name="trash" className="text-red-500" />
        </IconButton>
      </Row>
      <Row className="gap-4">
        <LabeldInput label="Price">
          <ErrorLabeledInput
            filedName={priceFN}
            placeholder="Product Price"
            type="number"
          />
        </LabeldInput>
        <LabeldInput label="Inventory">
          <ErrorLabeledInput
            filedName={inventoryFN}
            placeholder="Product inventory"
            type="number"
          />
        </LabeldInput>
      </Row>
      <div className=" bg-white/20 p-4 rounded">
        <h4 className="font-semibold text-lg mb-2">Product variation color:</h4>
        <div className="flex rounded gap-2 flex-wrap">
          <Controller
            name={colorFN}
            render={({ field: { onChange, value } }) => (
              <>
                {colors.map((c) => (
                  <ColorInput
                    key={c.colorId}
                    color={c}
                    hasSelected={value == c.colorId}
                    onSelect={() => {
                      onChange(c.colorId);
                    }}
                  />
                ))}
              </>
            )}
          />
        </div>
      </div>
      <label className="text-xl font-semibold">Product media:</label>
      <FilePreviewList fieldname={mediaFN} />
    </Column>
  );
}
