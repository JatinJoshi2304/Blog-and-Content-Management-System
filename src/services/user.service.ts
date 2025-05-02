import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const getUserByUsername = async (
  username: string
): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

export const getUserById = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const getAllUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};

export const updateUser = async (
  id: string,
  data: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>
): Promise<User> => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (username: string): Promise<User> => {
  return await prisma.user.delete({
    where: { username },
  });
};
