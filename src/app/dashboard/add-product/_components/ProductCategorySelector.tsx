import { Category } from "@/core/models/category";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { ApiImage } from "@/ui/image/ApiImage";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import Select from "react-select";

export function ProductCategorySelector({
  categories,
}: {
  categories: Category[];
}) {
  const form = useFormContext();
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const propertiesValuesFieldName = "propertiesValues";
  function handleSelectionChange(val: unknown) {
    const { value: selectedCategory } = val as {
      label: string;
      value: Category;
    };

    form.setValue(
      `${propertiesValuesFieldName}.categoryId`,
      selectedCategory.categoryId
    );
    setSelectedCategory(selectedCategory);
  }

  return (
    <div>
      <label>Select category:</label>
      <Select
        onChange={handleSelectionChange}
        options={categories.map((c) => ({
          value: c,
          label: <CategoryOption category={c} />,
        }))}
      />
      {!!selectedCategory && (
        <div className="border p-2 my-2">
          <h5 className="font-semibold">Product properties:</h5>
          {selectedCategory.properties.map((prop, index) => {
            return (
              <div key={prop.propertyId}>
                <label>{prop.name}</label>
                <ErrorLabeledInput
                  type="text"
                  filedName={`${propertiesValuesFieldName}.properties.${index}.propertyId`}
                  placeholder={`Value for ${prop.name} property`}
                  initValue={prop.propertyId}
                  hidden
                />
                <ErrorLabeledInput
                  name={prop.name}
                  type="text"
                  filedName={`${propertiesValuesFieldName}.properties.${index}.propertyValue`}
                  placeholder={`Value for ${prop.name} property`}
                />
              </div>
            );
          })}
        </div>
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
