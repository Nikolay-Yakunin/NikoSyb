import { getPosts, type PostsResponse } from "@/entities/Post";
import { markdownToHtml } from "@/shared/lib";

type PostWithHtml = Awaited<ReturnType<typeof getPosts>>["posts"][number] & {
  html: string;
};

export type PostsWithHtml = Omit<PostsResponse, "posts"> & {
  posts: PostWithHtml[];
};

export async function getPostsWithHtml(
  page: number,
  limit: number,
): Promise<PostsWithHtml | null> {
  try {
    const posts = await getPosts(page, limit);
    if (!posts) return null;

    const postsWithHtml = await Promise.all(
      posts.posts.map(async (post) => {
        const html = await markdownToHtml(post.body);
        return { ...post, html };
      }),
    );

    return {
      ...posts,
      posts: postsWithHtml,
    };
  } catch (error) {
    console.error("Failed to fetch posts with HTML:", error);
    return null;
  }
}
