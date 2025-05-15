export interface IUser {
  id: string;
  username: string;
  name?: string;
  email: string;
  password: string;
  role?: "ADMIN" | "EDITOR" | "AUTHOR" | "READER";
  bio?: string | null;
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
