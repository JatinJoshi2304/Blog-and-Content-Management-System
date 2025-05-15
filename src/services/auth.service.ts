import { PrismaClient, Role } from "@prisma/client";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { LoginInput, SignupInput } from "../interfaces/auth.interface";

const prisma = new PrismaClient();

export const signupUser = async (data: SignupInput) => {
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existing) throw new Error("User already exists");
  const userRole = data.role.toUpperCase();
  const hashedPassword = await hashPassword(data.password);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      username: data.username,
      role: userRole as Role,
    },
  });

  const token = generateToken(user.id);
  return { user, token };
};

export const loginUser = async (data: LoginInput) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await comparePassword(data.password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(user.id);
  return { user, token };
};
