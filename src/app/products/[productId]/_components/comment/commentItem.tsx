import { ProductScore } from "@/app/_components/productScore";
import { Comment } from "@/core/models/comment";
import { formatDate } from "@/lib/helpers/formatDate";
import { CustomImage } from "@/ui/image/customImage";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Body } from "@/ui/theme/text/body";
import { Caption } from "@/ui/theme/text/caption";
import { H6 } from "@/ui/theme/text/headers";

export function CommentItem({ comment }: { comment: Comment }) {
  const formattedDate = formatDate(comment.createdAt);
  return (
    <div
      key={comment.rate}
      className="border border-gray-neutral-ed bg-gray-neutral-f9 p-3 rounded-lg space-y-2"
    >
      <Row className="gap-4px" centerV>
        <div className="rounded-full w-40px h-40px overflow-clip bg-gray-700">
          <CustomImage
            alt={comment.user.firstName}
            src={comment.user.profileAvatar ?? "/images/user.jpg"}
            className="w-full h-full object-cover"
          />
        </div>
        <Column>
          <H6>
            {comment.user.firstName} {comment.user.lastName}
          </H6>
          <Caption size="md" className="text-gray-neutral-9e">
            {formattedDate}
          </Caption>
        </Column>
        <div className="text-white ms-auto bg-blue-900 rounded-lg py-1 px-1">
          {!!comment.rate && (
            <ProductScore score={comment.rate} className="fill-white" />
          )}
        </div>
      </Row>
      <Body as="p" size="md">
        {comment.text}
      </Body>
    </div>
  );
}
