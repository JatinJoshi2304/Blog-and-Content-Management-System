import { IUser } from "./user.interface";
import { IComment } from "./comment.interface";
import { Tag } from "./tag.interface";
import { Category } from "./category.interface";

export interface IPost {
  id: string;
  title: string;
  content: string;
  published: boolean;
  publishedAt?: Date | null;
  authorId: string;
  comments?: IComment[];
  tags?: Tag[];
  categories?: Category[];
  createdAt: Date;
  updatedAt: Date;
}
