export interface IComment {
  id: string;
  content: string;
  postId: string;
  userId: string;
  parentId?: string;
  createdAt: Date;
}
