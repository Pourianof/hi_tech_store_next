export interface UserNotification {
  id: string;
  type: string;
  title: string;
  body: string;
  ownerId: string;
  createdAt: string;
  readAt: string | null;
}
