import { Category, CategoryProperty } from "@/core/models/category";
import { ResultModel } from "@/core/models/resultModel";
import { convertFieldValuesToFormData } from "@/lib/helpers/convertFieldValuesToFormData";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { StatefulForm } from "@/ui/form/statefulForm";
import Icon from "@/ui/icons/icon";
import { ApiImage } from "@/ui/image/ApiImage";
import { useEffect, useState } from "react";
import {
  FieldValues,
  useFieldArray,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";

export function NewCategoryForm({
  handleSubmitSuccussfully,
  submit,
  oncancel,
  editingCategory,
}: {
  submit: (
    categoryFormData: FormData,
    baseCategory?: Category
  ) => Promise<ResultModel>;
  handleSubmitSuccussfully: (category: Category) => void;
  oncancel: VoidFunction;
  editingCategory?: Category;
}) {
  async function handleForSubmission(
    data: FieldValues,
    { setError }: UseFormReturn
  ) {
    const isEditModeAndKeepOldImage = !data.image && !!editingCategory?.image;
    if (
      !isEditModeAndKeepOldImage &&
      (!data.image || !(data.image as File)?.type.startsWith("image"))
    ) {
      setError("image", { message: "Some cover image must set for category" });
      return;
    }

    const formData = convertFieldValuesToFormData(data);
    return submit(formData, editingCategory);
  }

  return (
    <StatefulForm
      onSubmitionSuccessful={(category) => {
        handleSubmitSuccussfully(category as unknown as Category);
      }}
      onSubmit={handleForSubmission}
    >
      <center>
        <PreviewFile image={editingCategory?.image} />
      </center>
      <ErrorLabeledInput
        initValue={editingCategory?.name}
        filedName="name"
        type="text"
        placeholder="Name"
      />
      <ErrorLabeledInput
        initValue={editingCategory?.description}
        filedName="description"
        type="text"
        placeholder="Description"
      />
      <CategoryProperties defaultProperties={editingCategory?.properties} />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-700 rounded-md px-2 py-1 text-white"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            oncancel();
          }}
        >
          Cancel
        </button>
      </div>
    </StatefulForm>
  );
}

function PreviewFile({ image }: { image?: string }) {
  const [file, setFile] = useState<File>();
  const {
    setValue,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  useEffect(() => {
    setValue("image", file);
  }, [file, setValue]);

  const errorMessage = errors.image?.message as string;
  return (
    <div>
      <label className="aspect-square w-20 bg-gray-200 rounded-2xl flex items-center justify-center">
        {file ? (
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          <img
            className="w-full h-full object-cover"
            src={URL.createObjectURL(file)}
          />
        ) : image ? (
          <ApiImage alt="category image" src={image} />
        ) : (
          <Icon className="text-gray-500 text-4xl" name="image" />
        )}
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => {
            clearErrors("image");
            const target = e.target as HTMLInputElement;
            const files = target.files;
            if (!files?.length) {
              return;
            }

            const selectedFile = files.item(0);
            setFile(selectedFile!);
          }}
          className="hidden"
        />
      </label>
      {!!errorMessage && (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      )}
    </div>
  );
}

function CategoryProperties({
  defaultProperties,
}: {
  defaultProperties?: CategoryProperty[];
}) {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "properties",
  });
  const filedName = "properties";

  useEffect(() => {
    if (defaultProperties) {
      defaultProperties.forEach(({ name, description }) =>
        append({ name, description })
      );
    } else {
      append({ name: "", description: "" });
    }
    return () => remove();
  }, [append, remove, defaultProperties]);

  const errorMesage = errors.properties?.message as string;

  return (
    <div className="border my-2 p-2 flex flex-col gap-2">
      <h4 className="font-semibold border-b py-2">Category features</h4>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="flex gap-2 items-center">
            <span>{index + 1}</span>
            <ErrorLabeledInput
              filedName={`${filedName}.${index}.name`}
              placeholder="Property Name"
              type="text"
            />
            <ErrorLabeledInput
              filedName={`${filedName}.${index}.description`}
              placeholder="Property Descriptions"
              type="text"
            />
            <button
              className=""
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (fields.length == 1) {
                  return;
                }
                remove(index);
              }}
            >
              ×
            </button>
          </div>
        );
      })}
      <button
        onClick={(e) => {
          e.preventDefault();
          append({ name: "", description: "" });
        }}
        type="button"
        className="block border"
      >
        Add new property
      </button>
      {!!errorMesage && (
        <span className="text-sm text-red-500">{errorMesage}</span>
      )}
    </div>
  );
}
