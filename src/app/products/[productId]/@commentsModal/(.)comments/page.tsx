"use client";
import Icon from "@/ui/icons/icon";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { Modal, ModalCloser } from "@/ui/modal/modal";
import { Caption } from "@/ui/theme/text/caption";
import { H3, H4 } from "@/ui/theme/text/headers";
import { IconButton } from "@mui/material";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { CommentItem } from "../../_components/comment/commentItem";
import { LoadingCommentPlaceholder } from "../../_components/comment/loadingCommentPlaceholder";
import { useComments } from "../../_hooks/useComments";
import { OutlinedButton } from "@/ui/form/AppButtons";
import { CommentForm } from "../../_components/comment/commentForm";

export default function Page() {
  const pathname = usePathname();

  const productId = +pathname.match(/products\/(\d+)/)![1];
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useComments({
    productId: productId,
  });

  let body: ReactNode;

  if (isLoading) {
    body = (
      <Column center className="grow">
        {Array.from({ length: 3 }, (_, i) => (
          <LoadingCommentPlaceholder key={i} />
        ))}
      </Column>
    );
  } else if (error) {
    body = (
      <Column center className="grow">
        <H4 className="text-error mb-2">There is some problem</H4>
        <Caption size="md">{error.title}</Caption>
        <Caption size="sm">{error.detail}</Caption>
      </Column>
    );
  } else {
    const comments = data?.pages.flatMap((p) => p.items);

    if (!comments?.length) {
      body = (
        <Column className="grow">
          <H4 className="mb-2">No comment registered for this product</H4>
        </Column>
      );
    } else {
      body = (
        <Column className="gap-2 text-sm grow">
          {comments.map((comment) => (
            <CommentItem key={comment.commentId} comment={comment} />
          ))}
          {hasNextPage && (
            <OutlinedButton onClick={fetchNextPage}>Load more</OutlinedButton>
          )}
        </Column>
      );
    }
  }

  return (
    <Modal
      backBtnHandling={true}
      diableScroll
      variants="full-page"
      onClose={() => {}}
    >
      <Column className="gap-24px h-full">
        <Row className="justify-between" centerV>
          <H3>Comments</H3>
          <ModalCloser
            builder={(close) => (
              <IconButton onClick={close}>
                <Icon name="close" className="text-lg" />
              </IconButton>
            )}
          />
        </Row>
        <div className="shrink overflow-auto grow">{body}</div>
        <CommentForm productId={productId} />
      </Column>
    </Modal>
  );
}
