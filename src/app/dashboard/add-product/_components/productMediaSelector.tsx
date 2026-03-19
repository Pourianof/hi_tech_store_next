import { ErrorMessageLabel } from "@/ui/form/errorMessageLabel";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export interface FormProductMedia {
  file: File;
  url: string;
  type: string;
}

export function FilePreviewList({ fieldname }: { fieldname: string }) {
  const formContext = useFormContext();
  const [files, setFiles] = useState<FormProductMedia[]>([]);

  const handleAddFiles = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (!files) {
      return;
    }
    const selectedFiles = Array.from(files);
    const mapped = selectedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image") ? "image" : "video",
    }));
    setFiles((prev) => [...prev, ...mapped]);
    target.value = ""; // reset input
    formContext.clearErrors(fieldname);
  };

  const handleRemove = (index: number) => {
    const newFiles = [...files];
    URL.revokeObjectURL(newFiles[index].url);
    newFiles.splice(index, 1);
    setFiles(newFiles);
    formContext.clearErrors(fieldname);
  };

  useEffect(() => {
    formContext.setValue(fieldname, files);
  }, [fieldname, files, formContext]);

  return (
    <Controller
      rules={{
        required: "At least one cover image must set for product",
        validate: (value) => {
          if (
            !value?.length ||
            !value.find((m: FormProductMedia) => m.type == "image")
          ) {
            return "At least one cover image must set for product";
          }
          return true;
        },
      }}
      name={fieldname}
      render={() => (
        <div className="flex items-center gap-3 overflow-x-auto p-2 flex-wrap">
          <ErrorMessageLabel fieldName={fieldname} />
          {files.map((item, index) => (
            <div key={index} className="relative group">
              {item.type === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.url}
                  alt="preview"
                  className="w-28 h-28 object-cover rounded-2xl shadow-md"
                />
              ) : (
                <video
                  src={item.url}
                  className="w-28 h-28 object-cover rounded-2xl shadow-md"
                  muted
                  loop
                  autoPlay
                />
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleRemove(index);
                }}
                className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>
            </div>
          ))}

          <label className="w-28 h-28 flex items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer hover:bg-gray-100">
            +
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleAddFiles}
              className="hidden"
            />
          </label>
        </div>
      )}
    />
  );
}
