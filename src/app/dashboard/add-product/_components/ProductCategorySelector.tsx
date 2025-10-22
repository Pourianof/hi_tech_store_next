import { ExpandableBox } from "@/app/products/_components/expandableBox";
import { Category } from "@/core/models/category";
import Icon from "@/ui/icons/icon";
import { ApiImage } from "@/ui/image/ApiImage";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import Select from "react-select";
import { ProductComponentsFormSection } from "./productComponentModelSettingForm";
import { CategoryPropertiesForm } from "./propertiesForm";

export function ProductCategorySelector({
  categories,
}: {
  categories: Category[];
}) {
  const form = useFormContext();
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const categoryValuesFieldName = "categoryValues";
  function handleSelectionChange(val: unknown) {
    const { value: selectedCategory } = val as {
      label: string;
      value: Category;
    };

    form.setValue(
      `${categoryValuesFieldName}.categoryId`,
      selectedCategory.categoryId
    );
    setSelectedCategory(selectedCategory);
  }

  return (
    <div className="flex flex-col gap-2">
      <label>Select category:</label>
      <Select
        onChange={handleSelectionChange}
        options={categories.map((c) => ({
          value: c,
          label: <CategoryOption category={c} />,
        }))}
      />
      {!!selectedCategory && (
        <>
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
              baseFieldName={categoryValuesFieldName}
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
        </>
      )}
    </div>
  );
}

function CategoryOption({ category }: { category: Category }) {
  return (
    <div className="flex items-center">
      <div className="size-20">
        <ApiImage alt={category.description} src={category.image} />
      </div>
      <span className="font-semibold">{category.name}</span>
    </div>
  );
}
