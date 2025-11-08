import { Post } from "../../model";
import { PostItem } from "../PostItem";

export type PostListProps = {
  posts: (Post & { html: string })[];
  prefix: string;
};

export function PostList({ posts, prefix }: PostListProps) {
  return (
    <>
      {posts?.length === 0 || !posts ? (
        <p className="text-gray-400">No posts yet.</p>
      ) : (
        <div className="space-y-12">
          {posts.map((post) => (
            <PostItem
              key={post.ID}
              post={post}
              showTitleLink
              href={prefix + String(post.ID)}
            />
          ))}
        </div>
      )}
    </>
  );
}
