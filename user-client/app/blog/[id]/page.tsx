import { Header, Footer } from "@/shared/ui";
import { PostItem, getPostV1 } from "@/entities/Post";
import { notFound } from "next/navigation";
import Link from "next/link";

type PostParams = {
  id: number
}

export default async function BlogPostPage({
  params,
}: {
  params: PostParams
}) {
  const { id } = params;

  // data
  const postWithHtml = await getPostV1(id);
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
