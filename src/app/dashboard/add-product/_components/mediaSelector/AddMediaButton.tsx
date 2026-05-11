import React, { ChangeEvent, useRef } from "react";

interface AddMediaButtonProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export function AddMediaButton({
  onFileSelect,
  disabled,
}: AddMediaButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={disabled}
        className="group relative w-28 h-28 flex flex-col items-center justify-center gap-2 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="w-10 h-10 rounded-full bg-gray-200 group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-200 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>

        {/* متن */}
        <div className="text-center">
          <span className="text-xs font-medium text-gray-600 group-hover:text-blue-600 transition-colors duration-200">
            Add Media
          </span>
          <span className="text-[10px] text-gray-400 block mt-0.5 group-hover:text-blue-400">
            Image or Video
          </span>
        </div>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleChange}
        className="hidden"
      />
    </>
  );
}
