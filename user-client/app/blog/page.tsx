import { Header, Footer } from "@/shared/ui";
import { notFound } from "next/navigation";
import PostsWidget from "@/entities/Post/widget/PostsWidget/PostsWidget";

export const dynamic = "force-dynamic";

const POSTS_PER_PAGE = 10;

export default async function Blog({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const pageParam = searchParams?.page;
  const currentPage =
    typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;

  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }


  return (
    <div className="flex flex-col min-h-screen p-0 m-0 font-mono bg-black text-white">
      <Header />

      <main className="flex-grow px-4 py-12">
        <PostsWidget page={currentPage} limit={POSTS_PER_PAGE} />
      </main>

      <Footer />
    </div>
  );
}
