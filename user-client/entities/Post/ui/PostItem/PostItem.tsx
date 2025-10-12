import { Post } from "@/entities/Post";
import Link from "next/link";

export type PostItemProps = {
  post: Post & { html: string };
  showTitleLink?: boolean;
  href?: string;
};

export function PostItem({ post, showTitleLink = false, href }: PostItemProps) {
  const TitleElement = () => (
    <h1 className="text-4xl">
      {showTitleLink && href ? (
        <Link href={href} className="hover:underline">
          {post.title}
        </Link>
      ) : (
        post.title
      )}
    </h1>
  );

  return (
    <div className="space-y-4">
      <TitleElement />
      <article
        className="prose prose-invert prose-lg max-w-none text-wrap"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </div>
  );
}
