"use client";

import { productUpdateSchema } from "@/core/schemas/productUpdateSchema";
import { useChangeConsumer } from "@/ui/changeNotifiers/consumer";
import { ProductChangeNotifier } from "@/ui/changeNotifiers/productChangeNotifier";
import { FilledButton } from "@/ui/form/AppButtons";
import { zodToRhsError } from "@/ui/form/rhf/zodToRhsError";
import { StatefulForm } from "@/ui/form/statefulForm";
import { Row } from "@/ui/layouts/row";
import { CircularProgress } from "@mui/material";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { FormBox } from "./formBox";

type Props = { children: ReactNode };
export function ProductBasicInfoUpdateForm({ children }: Props) {
  const productCN = useChangeConsumer(ProductChangeNotifier);
  const product = productCN.product;

  const defaultValues = {
    title: product.title,
    description: product.description,
    brandModelId: product.brandModel.modelId,
  };

  return (
    <FormBox>
      <StatefulForm
        onValidation={(data) => {
          const result = productUpdateSchema.safeParse(data);
          if (!result.success) {
            return { errors: zodToRhsError(result.error) };
          }

          return { validData: result.data };
        }}
        onSubmit={(data) => {
          return productCN.updateBasicInfos(data);
        }}
        onSubmitionSuccessful={() =>
          toast.success("Product updated succussfully")
        }
        formName="product-basic-info"
        defaultValues={defaultValues}
      >
        {children}
        <ProductBasicInfoFormButtons />
      </StatefulForm>
    </FormBox>
  );
}

function ProductBasicInfoFormButtons() {
  const productState = useChangeConsumer(ProductChangeNotifier);
  const product = productState.product;
  const formValues = useFormContext().watch();

  const hasChanged =
    formValues.title != product.title ||
    formValues.description != product.description ||
    formValues.brandModelId != product.brandModel.modelId;

  return (
    <Row>
      <StatefulForm.Submitter
        render={(submitter) => (
          <FilledButton
            disabled={!hasChanged || productState.isProductUpdating}
            onClick={submitter}
          >
            {productState.isProductUpdating ? (
              <CircularProgress size={14} />
            ) : hasChanged ? (
              "Save updates"
            ) : (
              "No changes"
            )}
          </FilledButton>
        )}
      />
    </Row>
  );
}
