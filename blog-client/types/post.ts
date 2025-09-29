export type Post = {
  id: number;
  title: string;
  body: string;
  images: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type PostsResponse = {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  posts: Post[];
};