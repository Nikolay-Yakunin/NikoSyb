import { Post } from "../../../types";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import { notFound } from "next/navigation";
import Link from "next/link";

const markdownProcessor = remark().use(gfm).use(html);

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/posts/${id}`);
  if (!res.ok) {
    if (!res.ok) {
      notFound();
    }
  }
  const data: Post = await res.json();

  const processed = await markdownProcessor.process(data.body);
  
  const post = {
    ...data,
    html: String(processed.value),
  };

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
          <h1 className="text-3xl mb-8">
            <Link href={"/blog"}>Blog</Link>
          </h1>
          {!post ? (
            <p className="text-gray-400">No posts yet.</p>
          ) : (
            <div className="space-y-12">
              <div key={post.ID}>
                <h1 className="text-4xl">{data.title}</h1>
                <article
                  className="prose prose-invert prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
              </div>
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
