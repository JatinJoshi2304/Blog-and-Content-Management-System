import { LikeType, PrismaClient } from "@prisma/client";
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

export const likeOrDislikeComment = async (
  userId: string,
  id: string,
  type: LikeType
) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id },
    });
    if (!comment) {
      throw {
        message: "Comment not found",
        status: 404,
      };
    }

    const existing = await prisma.commentLike.findUnique({
      where: { id, userId: userId },
    });

    if (existing) {
      if (existing.type === type) {
        await prisma.commentLike.delete({
          where: { id, userId: userId },
        });
        return { message: "Like/dislike removed" };
      }

      await prisma.commentLike.update({
        where: { userId, id },
        data: {
          type,
        },
      });

      return { message: `Comment ${type.toLowerCase()}d` };
    }
    const commentId = comment.id;
    await prisma.commentLike.create({
      data: {
        userId,
        commentId,
        type,
      },
    });

    return { message: `Comment ${type.toLowerCase()}d` };
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async (commentId: string, userId: string) => {
  await prisma.comment.delete({
    where: { id: commentId, userId: userId },
  });

  return { message: "Comment deleted successfully" };
};
