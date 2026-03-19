import { useFormContext } from "react-hook-form";

export function FormHelper() {
  const { clearErrors, trigger } = useFormContext();

  return (
    <div
      className="
      fixed 
      z-10
      text-xs 
      right-4 
      bottom-4 
      bg-green-600 
      px-4 py-2 
      rounded 
      hover:rounded-t-none 
      hover:rounded-b 
      w-30 
      text-center
      cursor-default
      border
      border-[#8f8f8f]
      hover:[&>ul]:opacity-100
      hover:[&>ul]:h-[42px]
      hover:[&>ul]:translate-y-[1px]
      "
    >
      <span>Form helper</span>
      <ul
        className="
        absolute 
        bottom-full 
        py-2 
        bg-[#6bbc75] 
        w-full 
        left-[-1px]
        border
        border-[#8f8f8f]
        rounded-t
        box-content
        opacity-0
        h-0
        overflow-hidden
        transition
        translate-y-full
        "
      >
        <div className=" flex flex-col gap-2 h-full overflow-hidden">
          <li className="grow">
            <button
              onClick={(e) => {
                e.preventDefault();
                clearErrors();
              }}
              className="cursor-pointer w-full h-full hover:bg-[#5ea867]"
            >
              Clean errors
            </button>
          </li>
          <li className="grow">
            <button
              onClick={(e) => {
                e.preventDefault();
                trigger();
              }}
              className="cursor-pointer w-full h-full hover:bg-[#5ea867]"
            >
              Trigger validation
            </button>
          </li>
        </div>
      </ul>
    </div>
  );
}
