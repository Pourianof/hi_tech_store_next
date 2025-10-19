import { ReactNode } from "react";

export function RadioButton({
  label,
  name,
  onSelect,
  value,
}: {
  label: string | ReactNode;
  name: string;
  value?: unknown;
  onSelect?: (options: { name: string; value: unknown }) => void;
}) {
  return (
    <label className="text-gray-neutral-44">
      <table>
        <tbody>
          <tr>
            <td className="align-baseline">
              <input
                hidden
                className="
                [&:checked+span]:border-primary-blue-400 [&:checked+span]:before:block 
               [&:checked+span]:after:block"
                type="radio"
                name={name}
                onChange={() => {
                  onSelect?.({ name, value });
                }}
              />
              <span
                className="
                align-middle me-1 inline-block relative items-center border-[2px] w-[16px] 
                aspect-square rounded-full border-gray-neutral-44  
               
                before:hidden
                before:w-[8px] before:aspect-square before:absolute
                before:top-1/2 before:left-1/2  before:-translate-1/2
                before:bg-primary-blue-400 before:rounded-full
                
                after:hidden
                after:w-[16px] after:aspect-square after:absolute
                after:top-1/2 after:left-1/2  after:-translate-1/2
                after:rounded-full
                after:bg-sky-400
                after:opacity-75
                after:animate-ping
                after:[animation-iteration-count:1]
                after:[animation-fill-mode:forwards]
                "
              ></span>
            </td>
            <td>
              <span>{label}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </label>
  );
}
