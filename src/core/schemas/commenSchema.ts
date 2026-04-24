import z from "zod";

export const commentForProductSchema = z.object({
  text: z.string().trim().min(1, { error: "Comment message could not empty" }),
  rate: z
    .int()
    .min(1, { error: "a rate with minimum 1 must specify" })
    .max(5, { error: "a rate with maximum 5 must specify" }),
});
