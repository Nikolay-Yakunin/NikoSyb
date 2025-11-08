export type Post = {
  ID: number;
  title: string;
  body: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type PostsResponse = {
  meta: {
    page: number;
    limit: number;
    total_pages: number;
    total: number;
  };
  links: {
    self: string;
    next: string;
    prev: string;
    first: string;
    last: string;
  };
  data: Post[];
};
