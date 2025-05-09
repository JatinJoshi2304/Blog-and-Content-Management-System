export interface IComment {
  content: string;
  parentId?: string | null;
  superParentId?: string | null;
}

export interface ICommentRequest {
  user: {
    id: string;
  };
  body: {
    content: string;
    parentId?: string | null;
    superParentId?: string | null;
  };
  params: {
    id: string;
  };
}
