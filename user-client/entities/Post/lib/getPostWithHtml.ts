import { markdownToHtml } from "@/shared/lib";
import { getPost } from "../api";

type PostWithHtml = Awaited<ReturnType<typeof getPost>> & {
  html: string;
};

export async function getPostWithHtml(
  id: number,
): Promise<PostWithHtml | null> {
  try {
    const post = await getPost(id);
    if (!post) return null;
    const html = await markdownToHtml(post.body);
    return { ...post, html };
  } catch {
    return null;
  }
}
