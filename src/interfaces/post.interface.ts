import { IComment } from "./comment.interface";
import { ITag } from "./tag.interface";
import { ICategory } from "./category.interface";

export interface IPost {
  id: string;
  title: string;
  content: string;
  published: boolean;
  publishedAt?: Date | null;
  authorId: string;
  comments?: IComment[];
  tags?: ITag[];
  categories?: ICategory[];
  createdAt: Date;
  updatedAt: Date;
}
