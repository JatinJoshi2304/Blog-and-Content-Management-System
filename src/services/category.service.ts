import { PrismaClient, Post } from "@prisma/client";
import { ICategory } from "../Interfaces/category.interface";
import { categoryErrorCode } from "../constants/errorCode";

const prisma = new PrismaClient();

export const createCategory = async (userId: string, data: ICategory) => {
  const existing = await prisma.category.findUnique({
    where: { name: data.name },
  });

  if (existing) {
    throw new Error(categoryErrorCode.CATEGORY_ERR_CODE_003);
  }

  const category = await prisma.category.create({
    data: {
      name: data.name,
      userId: userId,
    },
  });

  return { category };
};

export const getAllCategories = async (userId: string) => {
  const categories = await prisma.category.findMany({
    where: { userId: userId },
  });

  return { categories };
};

export const updateCategory = async (categoryId: string, updateData: any) => {
  const id = categoryId;
  const category = await prisma.category.update({
    where: { id },
    data: {
      name: updateData.name,
    },
  });

  if (!category) throw new Error("Category not found or update failed");

  return { category };
};

export const getCategoryByName = async (categoryName: string) => {
  const category = await prisma.category.findUnique({
    where: { name: categoryName },
  });
  if (!category) throw new Error("Category not found");
  return { category };
};

export const deleteCategory = async (categoryId: string) => {
  const id = categoryId;
  const deleted = await prisma.category.delete({
    where: { id },
  });

  if (!deleted) throw new Error("Category not found or already deleted");
  return { deleted };
};
