"use client";
import { FillerBox } from "@/ui/fillerBox";
import { OutlinedButton } from "@/ui/form/AppButtons";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Slider, SliderContainer, SliderItem } from "@/ui/slider";
import { useIsDesktopScreen } from "@/ui/theme/helpers/isDesktopMode";
import { H4 } from "@/ui/theme/text/headers";
import { useProduct } from "../../_contexts/productContext";
import { useComments } from "../../_hooks/useComments";
import { CommentItem } from "./commentItem";
import { LoadingCommentPlaceholder } from "./loadingCommentPlaceholder";

export function ProductCommentList() {
  const product = useProduct();
  const isDesktop = useIsDesktopScreen();

  const { data, error, isLoading, refetch } = useComments({
    productId: product.productId,
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

  const comments = data?.pages.flatMap((p) => p.items);

  if (isLoading) {
    return (
      <Row className="desktop:flex-col gap-2">
        {Array.from({ length: 3 }, (_, i) => (
          <LoadingCommentPlaceholder key={i} />
        ))}
      </Row>
    );
  }

  if (!comments?.length) {
    return (
      <Column center className="grow">
        No one commented for this product
      </Column>
    );
  }

  if (isDesktop) {
    return (
      <Column className="gap-2 text-sm grow">
        {comments.map((comment) => (
          <CommentItem key={comment.commentId} comment={comment} />
        ))}
      </Column>
    );
  }

  return (
    <FillerBox>
      <Slider>
        <SliderContainer className="gap-4">
          {comments.map((comment) => (
            <SliderItem key={comment.commentId} className="shrink-0 w-3/4">
              <CommentItem comment={comment} />
            </SliderItem>
          ))}
        </SliderContainer>
      </Slider>
    </FillerBox>
  );
}
