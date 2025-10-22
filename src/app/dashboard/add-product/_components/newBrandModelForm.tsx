import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { StatefulForm } from "@/ui/form/statefulForm";
import { Button } from "@mui/material";
import { NewBrandForm } from "./newBrandForm";
import { useBrands } from "./brandsReducer";
import { convertFieldValuesToFormData } from "@/lib/helpers/convertFieldValuesToFormData";
import { BrandModel } from "@/core/models/brand";

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
        onSubmit={
          // StatefulForm.SuccessSubmit
          async (data) => {
            return actions.add(convertFieldValuesToFormData(data));
          }
        }
        onSubmitionSuccessful={(data) => {
          onNewBrandSubmitted({ ...data, modelId: 8 } as unknown as BrandModel);
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
        render={(submitter) => (
          <Button variant="contained" onClick={submitter}>
            Resgister and contiue
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
