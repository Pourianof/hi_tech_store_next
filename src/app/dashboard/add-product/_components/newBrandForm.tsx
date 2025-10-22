import { Brand } from "@/core/models/brand";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import Fuse from "fuse.js";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import { PreviewFile } from "../../../../ui/form/previewFile";
import { ErrorMessageLabel } from "@/ui/form/errorMessageLabel";

export function NewBrandForm({ brands }: { brands?: Brand[] }) {
  const [isSelectMode, setIsSelectMode] = useState(true);
  const [similarBrandNames, setSimilarBrandNames] = useState<Brand[]>();
  const { setValue, control } = useFormContext();

  return (
    <div className="border p-2">
      <div className="flex gap-4 justify-center mb-2">
        <button
          className={
            "cursor-pointer py-1 px-4 border-b-2  translate-y-[1.5px] " +
            (isSelectMode
              ? "border-b-blue-500"
              : " hover:bg-gray-200 hover:text-gray-600 rounded-t ")
          }
          onClick={(e) => {
            e.preventDefault();
            setIsSelectMode(true);
          }}
        >
          Select
        </button>
        <button
          className={
            "cursor-pointer py-1 px-4 border-b-2  translate-y-[1.5px] " +
            (!isSelectMode
              ? "border-b-blue-500"
              : " hover:bg-gray-200 hover:text-gray-600 rounded-t ")
          }
          onClick={(e) => {
            e.preventDefault();
            setIsSelectMode(false);
            setSimilarBrandNames(undefined);
          }}
        >
          New Brand
        </button>
      </div>
      {isSelectMode ? (
        <span>
          <span className="text-sm text-slate-700">
            Select from existing brands:
          </span>
          <Controller
            shouldUnregister={false}
            control={control}
            name="brandId"
            rules={{
              validate: {
                required: (value) =>
                  !!value || "Must select a brand for brand model",
              },
            }}
            render={({ field: { onChange, value } }) => {
              const activeBrand = value
                ? brands?.find((b) => b.brandId == value)
                : null;
              return (
                <>
                  <Select
                    isClearable
                    options={brands?.map((b) => ({ label: b.name, value: b }))}
                    onChange={(newVal) => {
                      onChange(newVal?.value.brandId);
                    }}
                    value={
                      activeBrand
                        ? { label: activeBrand?.name, value: activeBrand }
                        : null
                    }
                  />
                  <ErrorMessageLabel fieldName="brandId" />
                </>
              );
            }}
          />
        </span>
      ) : (
        <>
          <span className="text-sm text-slate-700">Brand name:</span>
          <ErrorLabeledInput
            onChange={(newVal) => {
              if (!brands?.length || newVal.length < 2 || !newVal.trim()) {
                setSimilarBrandNames(undefined);
                return;
              }

              const fuse = new Fuse(brands, {
                keys: ["name"],
              });
              setSimilarBrandNames(
                fuse.search(newVal, { limit: 4 }).map((r) => r.item)
              );
            }}
            filedName="brand.name"
            placeholder="Brand name"
            type="text"
          />
          {!!similarBrandNames?.length && (
            <div className="my-2">
              <span className="inline-block mb-1 bg-slate-200 p-1 px-3 rounded text-slate-800">
                Do you mean:
              </span>
              <div className="flex flex-wrap gap-1">
                {similarBrandNames.map((b) => (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      setIsSelectMode(true);
                      setValue("brandId", b.brandId);
                    }}
                    key={b.brandId}
                    className="cursor-pointer text-sm bg-slate-300 w-fit py-0.5 px-1.5 rounded text-slate-700 font-semibold"
                  >
                    {b.name}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 my-1">
            <span className="text-sm text-slate-700">
              Choose brand logo image:
              <br />
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="text-blue-400 text-xs cursor-pointer hover:text-blue-500"
              >
                remove image
              </button>
            </span>
            <PreviewFile className="w-10" fieldname="brand.image" />
          </div>
        </>
      )}
    </div>
  );
}
