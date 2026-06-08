import Icon from "@/ui/icons/icon";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";

export function LoadingCommentPlaceholder() {
  return (
    <Column className="border border-gray-neutral-ed bg-gray-neutral-f9 p-3 rounded-lg space-y-2 w-full gap-4">
      <Row centerV className="justify-between">
        <Row>
          <div className="rounded-full w-10 h-10 bg-gray-400"></div>
          <Column className="gap-2">
            <div className="rounded w-20 h-4 bg-gray-200"></div>
            <div className="rounded w-30 h-4 bg-gray-200"></div>
          </Column>
        </Row>
        <div className="bg-gray-200 h-fit py-1 px-2 rounded">
          <Icon name="filled_star" className="fill-gray-400" />
        </div>
      </Row>
      <Column className="gap-2">
        <div className="rounded w-1/4 h-4 bg-gray-200"></div>
        <div className="rounded w-1/2 h-4 bg-gray-200"></div>
        <div className="rounded w-1/3 h-4 bg-gray-200"></div>
      </Column>
    </Column>
  );
}
