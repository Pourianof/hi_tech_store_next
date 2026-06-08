"use client";

import { useIsDesktopScreen } from "@/ui/theme/helpers/isDesktopMode";
import { CommentForm } from "./commentForm";
import { Product } from "@/core/models/product";

export function CommentFormClient({
  productId,
}: {
  productId: Product["productId"];
}) {
  const isDesktop = useIsDesktopScreen();

  if (!isDesktop) {
    return;
  }

  return <CommentForm productId={productId} />;
}
