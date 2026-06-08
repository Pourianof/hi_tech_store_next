import Icon from "@/ui/icons/icon";
import { Row } from "@/ui/layouts/row";
import { ButtonLabel } from "@/ui/theme/text/buttonLabel";
import { H3 } from "@/ui/theme/text/headers";
import Link from "next/link";
import { CommentFormClient } from "./commentForm.client";
import { ProductCommentList } from "./productCommentList";

export async function ProductComments({ productId }: { productId: number }) {
  return (
    <div id="comments">
      <Row centerV className="justify-between">
        <H3 className="desktop:text-h5">Comments</H3>
        <Link
          href={{ pathname: `/products/${productId}/comments` }}
          className="text-primary-blue-0c hover:text-primary-blue-06 desktop:hidden pb-24px"
        >
          <Row centerV>
            <ButtonLabel size="sm">View all</ButtonLabel>
            <Icon name="arrow" className="rotate-180" />
          </Row>
        </Link>
      </Row>
      <Row className="gap-16px">
        <CommentFormClient productId={productId} />

        <ProductCommentList />
      </Row>
    </div>
  );
}
