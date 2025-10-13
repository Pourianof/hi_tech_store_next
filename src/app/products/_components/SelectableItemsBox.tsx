import { CheckboxItem, CheckboxList } from "@/ui/form/checkboxList";
import { ExpandableBox } from "./expandableBox";

export function SelectableItemsBox({
  title,
  items,
  valueLabel,
  initialSelectedItems,
}: {
  title: string;
  valueLabel: string;
  initialSelectedItems?: (number | string)[];
  items: {
    name: string;
    frequency?: number;
    value: string | number;
  }[];
}) {
  return (
    <ExpandableBox
      title={title}
      className="border-b border-b-gray-neutral-b4"
      titleClassName="p-2"
    >
      <ul className="px-2 pb-2">
        <CheckboxList
          fieldName={valueLabel}
          initialSelectedItems={initialSelectedItems?.map((v) => `${v}`)}
        >
          {items.map((item) => (
            <li key={item.name}>
              <CheckboxItem
                label={
                  <>
                    <span>{item.name}</span>
                    {typeof item.frequency == "number" && (
                      <span className="text-xs text-gray-neutral-b4">
                        ({item.frequency})
                      </span>
                    )}
                  </>
                }
                checkedValue={`${item.value}`}
              />
            </li>
          ))}
        </CheckboxList>
      </ul>
    </ExpandableBox>
  );
}
