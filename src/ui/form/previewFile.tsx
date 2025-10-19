import { ErrorMessageLabel } from "@/ui/form/errorMessageLabel";
import Icon from "@/ui/icons/icon";
import { ApiImage } from "@/ui/image/ApiImage";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export function PreviewFile({
  image,
  fieldname,
  className,
  isRequired = true,
}: {
  image?: string;
  fieldname: string;
  className?: string;
  isRequired?: boolean;
}) {
  const [file, setFile] = useState<File>();
  const { setValue, clearErrors, register } = useFormContext();

  useEffect(() => {
    setValue(fieldname, file);
    clearErrors(fieldname);
  }, [file, setValue, fieldname, clearErrors]);

  return (
    <div className={className}>
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
          {...register(fieldname, {
            validate: {
              required: () =>
                !isRequired || !!file || "Select a file is required",
            },
            onChange: (e) => {
              const target = e.target as HTMLInputElement;
              const files = target.files;
              if (!files?.length) {
                return;
              }

              const selectedFile = files.item(0);
              setFile(selectedFile!);
            },
          })}
          className="hidden"
        />
      </label>
      <ErrorMessageLabel fieldName={fieldname} />
    </div>
  );
}
