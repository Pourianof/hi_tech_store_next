"use client";
import { ProductItem } from "@/app/_components/productItem";
import { ProductModel } from "@/core/models/productModel";
import { FilledButton } from "@/ui/form/AppButtons";
import Icon from "@/ui/icons/icon";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Modal } from "@/ui/modal/modal";
import { discountActions } from "@/ui/server_actions_wrapper/discountActions";
import { IconButton, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useWatch } from "react-hook-form";
import toast from "react-hot-toast";

export function ScriptResultPreviewButton({ script }: { script?: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [scriptResult, setScriptResult] = useState<ProductModel[]>();
  const [displayPreviewModal, setDisplayPreviewModal] = useState(false);

  async function loadPreview(s: string) {
    setIsLoading(true);
    try {
      const result = await discountActions.checkDiscountScript({ script: s });

      if (result.status === "failed") {
        toast.error(result.data.title);
        setScriptResult([]);
        return;
      }

      setScriptResult(result.data);
    } catch {
      toast.error("Preview failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ width: "25%", paddingLeft: 8 }}>
      {displayPreviewModal && (
        <Modal containerClassName="w-1/2">
          <Row>
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                setDisplayPreviewModal(false);
              }}
            >
              <Icon name="close" />
            </IconButton>
          </Row>
          {isLoading ? (
            <Column>
              <CircularProgress />
              <span>Result is loading...</span>
            </Column>
          ) : !!scriptResult?.length ? (
            <Row className="flex-wrap">
              {scriptResult.map((product) => (
                <div key={product.productId} className="w-1/4 p-2">
                  <ProductItem product={product} />
                </div>
              ))}
            </Row>
          ) : (
            <span>⭕Result is empty⭕</span>
          )}
        </Modal>
      )}
      <FilledButton
        noFullWidth
        onClick={async () => {
          const s = script ?? "";
          if (!s.trim()) {
            toast.error("Script is empty");
            return;
          }
          setDisplayPreviewModal(true);
          await loadPreview(s);
        }}
      >
        Preview script result
      </FilledButton>
    </div>
  );
}

export function FormInputBasedScriptResultPreviewButton({
  fieldName,
}: {
  fieldName: string;
}) {
  const script = useWatch({ name: fieldName });
  return <ScriptResultPreviewButton script={script} />;
}
