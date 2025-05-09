export interface ICategory {
  id: string;
  name: string;
  userId: string;
}

export interface ICategoryRequest {
  user: {
    id: string;
  };
  body: {
    id: string;
    name: string;
    userId: string;
  };
  params: {
    id: string;
  };
}
