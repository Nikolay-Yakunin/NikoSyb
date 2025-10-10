import { Header, Footer } from "@/shared/ui";
import { PostItem, getPost } from "@/entities/Post";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import { notFound } from "next/navigation";
import Link from "next/link";
export const dynamic = "force-dynamic";

const markdownProcessor = remark().use(gfm).use(html);

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const idNum = Number(id);
  if (isNaN(idNum) || !Number.isInteger(idNum) || idNum <= 0) {
    notFound();
  }

  let post;
  try {
    post = await getPost(idNum);
  } catch (error) {
    notFound();
  }

  const processed = await markdownProcessor.process(post.body);
  const postWithHtml = {
    ...post,
    html: String(processed.value),
  };

  return (
    <div className="flex flex-col min-h-screen p-0 m-0 font-mono bg-black text-white">
      <Header />

      <main className="flex-grow px-4 py-12">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-3xl mb-8">
            <Link href="/blog">Blog</Link>
          </h1>

          <PostItem post={postWithHtml} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
