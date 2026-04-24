"use client";
import { PagedResults } from "@/core/Dtos/pagedResult";
import { Comment } from "@/core/models/comment";
import { commentForProductSchema } from "@/core/schemas/commenSchema";
import { commentForProductAction } from "@/lib/server_actions/productActions";
import { zodToRhsError } from "@/ui/form/rhf/zodToRhsError";
import { StatefulForm } from "@/ui/form/statefulForm";
import { useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import { useProduct } from "../_contexts/productContext";

export function ProductCommentForm({ children }: { children: ReactNode }) {
  const product = useProduct();
  const client = useQueryClient();

  async function handleSubmission(
    data: FieldValues,
    { setError }: UseFormReturn,
  ) {
    const result = commentForProductSchema.safeParse(data);
    if (result.success) {
      const response = await commentForProductAction(
        product.productId,
        result.data,
      );
      return response;
    } else {
      zodToRhsError(result.error).forEach((err) =>
        setError(err.path, { message: err.message }),
      );
    }
  }

  return (
    <StatefulForm
      onSubmit={handleSubmission}
      onSubmitionSuccessful={(comment) => {
        toast.success("Your comment submitted successfully...");
        const key = ["product-comment", product.productId];
        const data = client.getQueryData(key) as PagedResults<Comment>;

        if (data) {
          const newCommentData = { ...data };
          newCommentData.items = [comment as unknown as Comment, ...data.items];
          client.setQueryData(key, { ...newCommentData });
        }
      }}
    >
      {children}
    </StatefulForm>
  );
}
