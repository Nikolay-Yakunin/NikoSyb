import { Header, Footer } from "@/shared/ui";
import { getPost, PostItem, PostToHtml } from "@/entities/Post";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

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

  // data
  const postWithHtml = await PostToHtml(await getPost(idNum));
  if (!postWithHtml) {
    notFound();
  }

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
