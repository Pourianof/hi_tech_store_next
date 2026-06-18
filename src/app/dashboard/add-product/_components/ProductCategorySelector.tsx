import { ExpandableBox } from "@/app/products/_components/expandableBox";
import { Category } from "@/core/models/category";
import Icon from "@/ui/icons/icon";
import { CustomImage } from "@/ui/image/CustomImage";
import { Fragment } from "react";
import { Controller, useWatch } from "react-hook-form";
import Select from "react-select";
import { ProductComponentsFormSection } from "./productComponentModelSettingForm";
import { CategoryPropertiesForm } from "./propertiesForm";

export const CATEGORY_VALUES_FIELD_NAME = "categoryValues";

export function ProductCategorySelector({
  categories,
}: {
  categories: Category[];
}) {
  const selectedCategoryId = useWatch({ name: CATEGORY_ID_FIELD_NAME });

  const selectedCategory = categories.find(
    (c) => c.categoryId == selectedCategoryId,
  );

  return (
    <div className="flex flex-col gap-2">
      <label>Select category:</label>
      <CategorySelect categories={categories} />
      {!!selectedCategory && (
        <Fragment key={selectedCategoryId}>
          <ExpandableBox
            className="border p-3"
            titleClassName="font-semibold border-b pb-2 mb-2"
            title={
              <h5>
                <Icon name="checklist" className="me-2 text-xl" />
                Product properties:
              </h5>
            }
          >
            <CategoryPropertiesForm
              baseFieldName={CATEGORY_VALUES_FIELD_NAME}
              properties={selectedCategory.properties}
            />
          </ExpandableBox>
          <ExpandableBox
            className="border p-3"
            titleClassName="font-semibold border-b pb-2 mb-2"
            title={
              <h5>
                <Icon name="component" className="me-2 text-xl" />
                Product components:
              </h5>
            }
          >
            <ProductComponentsFormSection
              components={selectedCategory.components}
            />
          </ExpandableBox>
        </Fragment>
      )}
    </div>
  );
}

function CategoryOption({ category }: { category: Category }) {
  return (
    <div className="flex items-center">
      <div className="size-20">
        <CustomImage alt={category.description} src={category.image} />
      </div>
      <span className="font-semibold">{category.name}</span>
    </div>
  );
}

const CATEGORY_ID_FIELD_NAME = `${CATEGORY_VALUES_FIELD_NAME}.categoryId`;
function CategorySelect({ categories }: { categories: Category[] }) {
  return (
    <Controller
      name={CATEGORY_ID_FIELD_NAME}
      render={({ field: { onChange, value } }) => {
        const selectedCategory = categories.find((c) => c.categoryId == value);
        return (
          <Select
            value={
              selectedCategory
                ? {
                    value,
                    label: <CategoryOption category={selectedCategory} />,
                  }
                : undefined
            }
            onChange={(val: unknown) => {
              const { value: selectedCategory } = val as {
                label: string;
                value: Category;
              };

              onChange(selectedCategory.categoryId);
            }}
            options={categories.map((c) => ({
              value: c,
              label: <CategoryOption category={c} />,
            }))}
          />
        );
      }}
    />
  );
}
