import Icon from "@/ui/icons/icon";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { IconButton } from "@mui/material";
import { ConditionInterpreter } from "./conditionInterpreter";
import { EntitSelection } from "./entitySelection";

export function ConditionItem({
  conditionIndex,
  onConditionRemove,
}: {
  conditionIndex: number;
  onConditionRemove(index: number): void;
}) {
  return (
    <Column>
      <Row>
        <Column center>
          <div className="bg-discount-condition-blue w-8 rounded-xl aspect-square flex justify-center items-center font-semibold">
            #{conditionIndex + 1}
          </div>
          <IconButton onClick={() => onConditionRemove(conditionIndex)}>
            <Icon name="trash" className="text-lg text-red-500" />
          </IconButton>
        </Column>
        <div className="bg-discount-condition-blue p-2 rounded grow">
          <EntitSelection />
        </div>
      </Row>
      <ConditionInterpreter />
    </Column>
  );
}
