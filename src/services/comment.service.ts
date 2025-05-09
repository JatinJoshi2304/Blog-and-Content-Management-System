import { PrismaClient } from "@prisma/client";
import { IComment } from "../interfaces/comment.interface";

const prisma = new PrismaClient();

export const createComment = async (
  userId: string,
  postId: string,
  superParentId: string | null,
  data: IComment
) => {
  const { content } = data;

  const comment = await prisma.comment.create({
    data: {
      content,
      postId,
      userId,
      superParentId,
    },
  });

  return { comment };
};

export const getAllComments = async (postId: string) => {
  const comments = await prisma.comment.findMany({
    where: { postId: postId },
  });

  return { comments };
};

export const getComment = async (id: string) => {
  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  return { comment };
};

export const updateComment = async (
  id: string,
  userId: string,
  data: IComment
) => {
  const comment = await prisma.comment.update({
    where: { id, userId: userId },
    data,
  });

  return { comment };
};

export const deleteComment = async (commentId: string, userId: string) => {
  await prisma.comment.delete({
    where: { id: commentId, userId: userId },
  });

  return { message: "Comment deleted successfully" };
};
