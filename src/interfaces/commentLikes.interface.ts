export interface ICommentLike {
  id: string;
  userId: string;
  commentId: string;
  type: "LIKE" | "DISLIKE";
}
