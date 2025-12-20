export type Post = {
  ID: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

type PostFilters = {
  id?: number;
  title?: string;
}

export type PostsQueries = {
  range?: number[];
  filter?: PostFilters;
  sort?: string[];
}
