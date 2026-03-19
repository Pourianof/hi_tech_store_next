import Icon from "@/ui/icons/icon";
import { CircularProgress } from "@mui/material";
import { Controller } from "react-hook-form";
import { useBrands } from "./brandsReducer";
import Select from "react-select";
import { BrandModel } from "@/core/models/brand";
import { Modal } from "@/ui/modal/modal";
import { NewBrandModelForm } from "./newBrandModelForm";
import { useState } from "react";

function generateFullBrandModelName(brandModel: BrandModel) {
  return `${brandModel.brandName} - ${brandModel.modelName}`;
}

export function BrandSelectorInput({
  fieldname,
  setIdAsValue,
}: {
  fieldname: string;
  setIdAsValue?: boolean;
}) {
  const { data: brands, isLoading, error, isFetching } = useBrands();
  const [newBrandModelMode, setNewBrandModelMode] = useState(false);
  const [selectedBrandModel, setSelectedBrandModel] = useState<BrandModel>();

  function handleNewBrandFormCancel() {
    setNewBrandModelMode(false);
  }

  if (error) {
    return <div>There is some problem on fetching brand models data</div>;
  }

  if (!brands) {
    if (isLoading) {
      return <div>Loding...</div>;
    }

    return <div>Something went wrong in loading brands</div>;
  }

  return (
    <div>
      {newBrandModelMode && (
        <Modal>
          <Controller
            name={fieldname}
            render={({ field: { onChange } }) => (
              <NewBrandModelForm
                onCancel={handleNewBrandFormCancel}
                onNewBrandSubmitted={(brandModel) => {
                  onChange(brandModel);
                  handleNewBrandFormCancel();
                }}
              />
            )}
          />
        </Modal>
      )}
      <label>
        <span>Brand model</span>
        <div className="flex gap-1">
          {isFetching ? (
            <CircularProgress size={40} />
          ) : (
            <Controller
              name="brandModel"
              render={({ field: { value, onChange } }) => (
                <Select
                  className="flex-5/6"
                  isClearable
                  components={{
                    SingleValue: (props) => (
                      <span
                        {...props.innerProps}
                        style={
                          props.getStyles(
                            "singleValue",
                            props,
                          ) as unknown as React.CSSProperties
                        }
                      >
                        {props.data.label}
                      </span>
                    ),
                  }}
                  options={brands
                    ?.filter((brand) => !!brand.brandModels?.length)
                    .map((b) => ({
                      label: b.name,
                      options: b.brandModels.map((bm) => ({
                        label: bm.modelName,
                        value: { ...bm, brandId: b.brandId },
                      })),
                    }))}
                  onChange={(opt) => {
                    const brandModel = (
                      opt as { value: BrandModel } | undefined
                    )?.value;
                    onChange(setIdAsValue ? brandModel?.modelId : brandModel);
                    setSelectedBrandModel(brandModel);
                  }}
                  value={
                    value
                      ? {
                          label: selectedBrandModel
                            ? generateFullBrandModelName(selectedBrandModel)
                            : "",
                          value: value,
                        }
                      : undefined
                  }
                />
              )}
            />
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              setNewBrandModelMode(true);
            }}
            className="cursor-pointer hover:transition-colors hover:duration-300 hover:bg-blue-600 text-white text-2xl flex-1/6 bg-blue-500 rounded"
          >
            +
          </button>
        </div>
        <span className="text-sm p-1 rounded inline-block bg-slate-200 mt-2 text-slate-600">
          <Icon name="guarantee" className="me-1 align-middle" />
          Brand model is optional but it recommended to specify what brand is
          this component
        </span>
      </label>
    </div>
  );
}
