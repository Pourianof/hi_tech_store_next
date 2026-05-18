import { useColors } from "@/app/dashboard/add-product/_components/_hooks/useColors";
import { productVariationDetailsUpdateSchema } from "@/core/schemas/productVariationDetailsUpdateSchema";
import { useChangeConsumer } from "@/ui/changeNotifiers/consumer";
import { ProductVariationChangeNotifier } from "@/ui/changeNotifiers/productVariationChangeNotifier";
import { OutlinedButton } from "@/ui/form/AppButtons";
import { ColorInput } from "@/ui/form/colorInput";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { FormConsumer } from "@/ui/form/formConsumer";
import { LabeldInput } from "@/ui/form/inputs";
import { zodToRhsError } from "@/ui/form/rhf/zodToRhsError";
import { StatefulForm } from "@/ui/form/statefulForm";
import Icon from "@/ui/icons/icon";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Modal } from "@/ui/modal/modal";
import { Caption } from "@/ui/theme/text/caption";
import { H4 } from "@/ui/theme/text/headers";
import { IconButton } from "@mui/material";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";

export function VariationDetailsEditingForm({ onClose }: { onClose(): void }) {
  const productVariation = useChangeConsumer(ProductVariationChangeNotifier);
  const variation = productVariation.productVariation;

  return (
    <Modal containerClassName="w-1/2">
      <StatefulForm
        onSubmit={async (data, { setError }) => {
          const parsedData =
            productVariationDetailsUpdateSchema.safeParse(data);

          if (!parsedData.success) {
            zodToRhsError(parsedData.error).forEach((err) =>
              setError(err.path, { message: err.message }),
            );
            return;
          }

          const result = await productVariation.updateDetails(data);

          return result;
        }}
        onSubmitionSuccessful={() => {
          toast.success("Variation updated succussfully");
          onClose();
        }}
        formName={`variation-edit-#${variation.productVariationId}`}
        defaultValues={{
          price: variation.price,
          inventory: variation.inventory,
          colorId: variation.color.colorId,
        }}
      >
        <Column>
          <Row
            centerV
            className="justify-between border-b border-b-gray-300 p-2"
          >
            <Column className="gap-2">
              <H4>Editing Variation #{variation.productVariationId}</H4>
              <Row className="gap-12px" centerV>
                <Row className="gap-4px" centerV>
                  <span
                    className="w-16px h-16px rounded"
                    style={{ backgroundColor: `#${variation.color.code}` }}
                  ></span>
                  <Caption size="md">{variation.color.name}</Caption>
                </Row>
                <Caption size="md">${variation.price}</Caption>
              </Row>
            </Column>

            <Row>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
              >
                <Icon name="close" />
              </IconButton>
            </Row>
          </Row>
          <Column className="py-8px gap-y-12px">
            <div className="grid grid-cols-2 w-full gap-16px">
              <LabeldInput label="Price">
                <ErrorLabeledInput
                  filedName="price"
                  type="number"
                  placeholder="Variation Price"
                />
              </LabeldInput>
              <LabeldInput label="Inventory">
                <ErrorLabeledInput
                  filedName="inventory"
                  type="number"
                  placeholder="Variation available inventory units"
                />
              </LabeldInput>
            </div>
            <VariationColorInput />
          </Column>
          <Row className="gap-16px">
            <button
              className="hover:cursor-pointer px-4 py-2 hover:bg-gray-200 rounded transition duration-200"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            >
              Cancel
            </button>
            <StatefulForm.Submitter
              render={(submitter) => (
                <FormConsumer
                  builder={(ctx) => {
                    const values = ctx.watch();
                    const hasChanged =
                      values.price != variation.price ||
                      values.inventory != variation.inventory ||
                      values.color != variation.color.colorId;
                    return (
                      <OutlinedButton
                        disabled={!hasChanged}
                        onClick={() => submitter()}
                      >
                        Update
                        {!hasChanged && <span>(No changes)</span>}
                      </OutlinedButton>
                    );
                  }}
                />
              )}
            />
          </Row>
        </Column>
      </StatefulForm>
    </Modal>
  );
}

function VariationColorInput() {
  const colors = useColors();

  return (
    <Row className="flex-wrap gap-2">
      <Controller
        name="colorId"
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
    </Row>
  );
}
