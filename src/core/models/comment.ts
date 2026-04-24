export type Comment = {
  commentId: number;
  text: string;
  rate?: number;
  userId: number;
  productId?: number;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    profileAvatar: string;
  };
};
