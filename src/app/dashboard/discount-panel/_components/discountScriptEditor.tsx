"use client";

import { ProductItem } from "@/app/_components/productItem";
import { ProductModel } from "@/core/models/productModel";
import { FilledButton } from "@/ui/form/AppButtons";
import Icon from "@/ui/icons/icon";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Modal } from "@/ui/modal/modal";
import { discountActions } from "@/ui/server_actions_wrapper/discountActions";
import { CircularProgress, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";

export function DiscountScriptEditor({
  readOnly,
  fieldname,
  script,
  noPreview,
}: {
  readOnly?: boolean;
  fieldname?: string;
  script?: string;
  noPreview?: boolean;
}) {
  const [displayPreviewModal, setDisplayPreviewModal] = useState(false);

  const inputClassname = [
    "p-4 outline-0 border border-gray-400",
    noPreview ? "w-full" : "w-3/4",
  ].join(" ");

  if (!fieldname) {
    return (
      <Row>
        <input className={inputClassname} value={script} readOnly={true} />
        {!noPreview && (
          <>
            <FilledButton
              noFullWidth
              className="w-1/4"
              onClick={async () => {
                if (!script?.trim()) {
                  toast.error("Script is empty");
                  return;
                }
                setDisplayPreviewModal(true);
              }}
            >
              Preview script result
            </FilledButton>
            {displayPreviewModal && (
              <DiscountScriptResultPreview
                script={script!}
                onClose={() => setDisplayPreviewModal(false)}
              />
            )}
          </>
        )}
      </Row>
    );
  }

  return (
    <Controller
      name={fieldname}
      defaultValue={script}
      render={({ field: { value: script, onChange } }) => (
        <Column className="gap-2">
          <Row>
            <input
              className={inputClassname}
              value={script}
              readOnly={readOnly}
              onChange={(e) => {
                onChange((e.target as HTMLInputElement).value);
              }}
            />
            {!noPreview && (
              <FilledButton
                noFullWidth
                className="w-1/4"
                onClick={async () => {
                  if (!script.trim()) {
                    toast.error("Script is empty");
                    return;
                  }
                  setDisplayPreviewModal(true);
                }}
              >
                Preview script result
              </FilledButton>
            )}
          </Row>
          {displayPreviewModal && (
            <DiscountScriptResultPreview
              script={script}
              onClose={() => setDisplayPreviewModal(false)}
            />
          )}
        </Column>
      )}
    />
  );
}

function DiscountScriptResultPreview({
  script,
  onClose,
}: {
  script: string;
  onClose: VoidFunction;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [scriptResult, setScriptResult] = useState<ProductModel[]>();

  useEffect(() => {
    setIsLoading(true);

    discountActions
      .checkDiscountScript({
        script,
      })
      .then((result) => {
        if (result.status == "failed") {
          toast.error(result.data.title);
          return;
        }

        setScriptResult(result.data);
      })
      .finally(() => setIsLoading(false));
  }, [script]);
  return (
    <Modal containerClassName="w-1/2">
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
  );
}
