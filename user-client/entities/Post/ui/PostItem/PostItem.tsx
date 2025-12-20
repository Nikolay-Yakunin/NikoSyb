import { Post } from "@/entities/Post";
import { markdownToHtml } from "@/shared/lib";
import Link from "next/link";

interface PostItemProps {
  post: Post;
  href?: string;
}

export async function PostItem({post, href}: PostItemProps) {

  let html = await markdownToHtml(post.body);

  return (
    <div className="space-y-4">
      <h1 className="text-4xl">
      {href ? (
        <Link href={href} className="hover:underline">
          {post.title}
        </Link>
      ) : (
        post.title
      )}
    </h1>
      <article
        className="prose prose-invert prose-lg max-w-none text-wrap"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

