import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { StatefulForm } from "@/ui/form/statefulForm";
import { Button, CircularProgress } from "@mui/material";
import { NewBrandForm } from "./newBrandForm";
import { useBrands } from "./brandsReducer";
import { convertFieldValuesToFormData } from "@/lib/helpers/convertFieldValuesToFormData";
import { BrandModel } from "@/core/models/brand";
import { brandModelCreationSchema } from "@/core/schemas/brandModelCreationSchema";
import { zodToRhsError } from "@/ui/form/rhf/zodToRhsError";
import { Row } from "@/ui/layouts/row";
import { Body } from "@/ui/theme/text/body";

export function NewBrandModelForm({
  onCancel,
  onNewBrandSubmitted,
}: {
  onCancel: VoidFunction;
  onNewBrandSubmitted: (brandModel: BrandModel) => void;
}) {
  const { actions, data: brands } = useBrands();

  return (
    <div>
      <StatefulForm
        onValidation={(data) => {
          const result = brandModelCreationSchema.safeParse(data);

          if (result.success) {
            return { validData: result.data };
          }

          return { errors: zodToRhsError(result.error) };
        }}
        onSubmit={
          // StatefulForm.SuccessSubmit
          async (data) => {
            return actions.add(convertFieldValuesToFormData(data));
          }
        }
        onSubmitionSuccessful={(data) => {
          onNewBrandSubmitted({ ...data } as unknown as BrandModel);
        }}
      >
        <h2 className="font-semibold text-stone-800 pb-2">
          Register new brand model
        </h2>
        <NewBrandForm brands={brands} />

        <div>
          <label className="text-sm text-slate-700">
            <span>Brand model name: </span>
            <ErrorLabeledInput
              filedName="name"
              placeholder="Brand model name"
              type="text"
            />
          </label>
        </div>
        <Buttons onCancel={onCancel} />
      </StatefulForm>
    </div>
  );
}

function Buttons({ onCancel }: { onCancel: VoidFunction }) {
  return (
    <div className="flex gap-2 pt-2">
      <StatefulForm.Submitter
        render={(submitter, isSubmitting) => (
          <Button
            disabled={isSubmitting}
            variant="contained"
            onClick={submitter}
          >
            <Row center>
              {isSubmitting && <CircularProgress size={12} />}
              <Body size="md">Resgister and contiue</Body>
            </Row>
          </Button>
        )}
      />

      <Button
        sx={{
          color: "slategrey",
          ":hover": { color: "black" },
        }}
        onClick={(e) => {
          e.preventDefault();
          onCancel();
        }}
      >
        Cancel
      </Button>
    </div>
  );
}
