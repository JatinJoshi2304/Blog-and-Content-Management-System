import { PrismaClient, Post } from "@prisma/client";
import { IPost } from "../Interfaces/post.interface";

const prisma = new PrismaClient();

export const createPost = async (id: string, data: IPost) => {
  const existing = await prisma.post.findUnique({
    where: { title: data.title },
  });

  if (existing) {
    throw new Error("Title already exists");
  }

  const post = await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      authorId: id,
      published: data.published ?? false,
      publishedAt: data.published ? new Date() : null,
      categories: data.categories?.length
        ? {
            connect: data.categories.map((cat) => ({ id: cat.id })),
          }
        : undefined,
      tags: data.tags?.length
        ? {
            connect: data.tags.map((tagId) => ({ id: tagId.id })),
          }
        : undefined,
    },
  });

  return { post };
};

export const getAllPosts = async (id: string) => {
  const posts = await prisma.post.findMany({
    where: { authorId: id },
    include: {
      author: true,
      categories: true,
      tags: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return { posts };
};

export const getPostById = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
      categories: true,
      tags: true,
      comments: true,
    },
  });

  if (!post) throw new Error("Post not found");

  return { post };
};

export const getPostsByTagAndCategory = async (
  tagId: string,
  categoryId: string
) => {
  const posts = await prisma.post.findMany({
    where: {
      tags: {
        some: { id: tagId },
      },
      categories: {
        some: { id: categoryId },
      },
    },
    include: {
      author: true,
      categories: true,
      tags: true,
      comments: true,
    },
  });

  return { posts };
};

export const updatePost = async (id: string, data: Partial<IPost>) => {
  const updatedPost = await prisma.post.update({
    where: { id },
    data: {
      title: data.title,
      content: data.content,
      published: data.published,
      thumbnail: data.thumbnail,
      publishedAt: data.published ? new Date() : null,
      categories: data.categories?.length
        ? {
            set: [],
            connect: data.categories.map((cat) => ({ id: cat.id })),
          }
        : undefined,
      tags: data.tags?.length
        ? {
            set: [],
            connect: data.tags.map((tag) => ({ id: tag.id })),
          }
        : undefined,
    },
  });

  return { post: updatedPost };
};

export const deletePost = async (id: string) => {
  await prisma.post.delete({
    where: { id },
  });

  return { message: "Post deleted successfully" };
};
