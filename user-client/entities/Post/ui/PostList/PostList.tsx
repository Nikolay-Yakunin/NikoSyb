import { Post, PostItem } from "@/entities/Post";

interface PostListProps {
  posts: Post[];
  prefix:  string;
}

export function PostList({posts, prefix}: PostListProps) {
  
  return (
    <>
      {posts.length === 0 ? (
        <p className="text-gray-400">No posts yet.</p>
      ) : (
        <div className="space-y-12">
          {posts.map((post) => (
            <PostItem
              key={post.ID}
              post={post}
              href={`${prefix}/${post.ID}`}
            />
          ))}
        </div>
      )}
    </>
  );
}
