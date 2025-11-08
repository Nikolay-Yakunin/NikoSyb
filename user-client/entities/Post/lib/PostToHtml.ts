import { markdownToHtml } from "@/shared/lib";
import { Post } from "../model";

type PostWithHtml = Post & {
  html: string;
};

export async function PostToHtml(post: Post): Promise<PostWithHtml | null> {
  try {
    const html = await markdownToHtml(post.body);
    return { ...post, html };
  } catch {
    return null;
  }
}
