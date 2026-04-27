"use client";
import { ProductScore } from "@/app/_components/productScore";
import { Comment } from "@/core/models/comment";
import { formatDate } from "@/lib/helpers/formatDate";
import { getCommentsOfProductAction } from "@/lib/server_actions/productActions";
import { OutlinedButton } from "@/ui/form/AppButtons";
import Icon from "@/ui/icons/icon";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Body } from "@/ui/theme/text/body";
import { Caption } from "@/ui/theme/text/caption";
import { H4, H6 } from "@/ui/theme/text/headers";
import { useQuery } from "@tanstack/react-query";
import { useProduct } from "../_contexts/productContext";

export function ProductCommentList() {
  const product = useProduct();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["product-comment", product.productId],
    async queryFn() {
      const result = await getCommentsOfProductAction(product.productId);
      if (result.status == "failed") {
        throw result.data;
      }

      return result.data;
    },
    refetchOnMount: true,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  if (error) {
    return (
      <Column center className="grow">
        <Column className="p-4 border-gray-neutral-ed bg-gray-neutral-f9">
          <H4>Problem to loading</H4>
          <OutlinedButton onClick={refetch}>Try again</OutlinedButton>
        </Column>
      </Column>
    );
  }

  const comments = data?.items;

  return (
    <Column className="gap-2 text-sm grow">
      {isLoading ? (
        Array.from({ length: 3 }, (_, i) => (
          <LoadingCommentPlaceholder key={i} />
        ))
      ) : !comments?.length ? (
        <Column center className="grow">
          No one commented for this product
        </Column>
      ) : (
        comments.map((comment) => (
          <CommentItem key={comment.commentId} comment={comment} />
        ))
      )}
    </Column>
  );
}

function LoadingCommentPlaceholder() {
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

function CommentItem({ comment }: { comment: Comment }) {
  const formattedDate = formatDate(comment.createdAt);
  return (
    <div
      key={comment.rate}
      className="border border-gray-neutral-ed bg-gray-neutral-f9 p-3 rounded-lg space-y-2"
    >
      <Row className="gap-4px" centerV>
        <div className="rounded-full w-40px h-40px bg-gray-700"></div>
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
