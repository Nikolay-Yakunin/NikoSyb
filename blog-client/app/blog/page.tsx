import { PostsResponse, Post } from "../../types";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import Link from "next/link";
export const dynamic = "force-dynamic";

const markdownProcessor = remark().use(gfm).use(html);

export default async function Blog() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/posts`);
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data: PostsResponse = await res.json();
  const posts = data.posts;

  const postsWithHtml = await Promise.all(
    posts.map(async (post) => {
      const processed = await markdownProcessor.process(post.body);
      return {
        ...post,
        html: String(processed.value),
      };
    }),
  );

  return (
    <div className="flex flex-col min-h-screen p-0 m-0 font-mono bg-black text-white">
      <header className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <a href="/" className="text-2xl sm:text-[28.5px] font-bold">
            NikolayYakunin.
          </a>
        </div>
      </header>

      <main className="flex-grow px-4 py-12">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-3xl mb-8">Blog</h1>
          {posts.length === 0 ? (
            <p className="text-gray-400">No posts yet.</p>
          ) : (
            <div className="space-y-12">
              {postsWithHtml.map((post) => (
                <div key={post.ID} className="space-y-4">
                  <h1 className="text-4xl">
                    <Link href={`/blog/${post.ID}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h1>
                  <article
                    className="prose prose-invert prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.html }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="py-8 sm:py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <ul className="flex flex-col gap-4 text-base sm:text-lg">
            <li>
              <a href="/" className="text-xl sm:text-[28.5px] font-bold">
                NikolayYakunin.
              </a>
            </li>
            <li>
              <a
                href="https://t.me/Nicolay_Yakunin"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Telegram
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Nikolay-Yakunin"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                GitHub
              </a>
            </li>
            <li>
              <a href="mailto:akuninn52@gmail.com" className="hover:underline">
                Email
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
