import { Header, Footer } from "@/shared/ui";
import { getPosts, PostList, PostsResponse } from "@/entities/Post";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const markdownProcessor = remark().use(gfm).use(html);
const POSTS_PER_PAGE = 10;

export default async function Blog({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const pageParam = searchParams?.page;
  const currentPage =
    typeof pageParam === "string" ? parseInt(pageParam, 10) : 0;

  if (isNaN(currentPage) || currentPage < 0) {
    notFound();
  }

  let data: PostsResponse;
  try {
    data = await getPosts(currentPage, POSTS_PER_PAGE);
  } catch (error) {
    notFound();
  }

  const posts = data.posts;
  const hasMore = posts.length === POSTS_PER_PAGE;

  const postsWithHtml = await Promise.all(
    posts.map(async (post) => {
      const processed = await markdownProcessor.process(post.body);
      return {
        ...post,
        html: String(processed.value),
      };
    }),
  );

  const prevPage = currentPage > 0 ? currentPage - 1 : null;
  const nextPage = hasMore ? currentPage + 1 : null;

  return (
    <div className="flex flex-col min-h-screen p-0 m-0 font-mono bg-black text-white">
      <Header />

      <main className="flex-grow px-4 py-12">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-3xl mb-8">Blog</h1>

          <PostList posts={postsWithHtml} prefix="blog/" />

          {/* Пагинация */}
          <div className="flex justify-between mt-12 pt-8 border-t border-gray-800">
            {prevPage !== null ? (
              <Link
                href={{ pathname: "/blog", query: { page: prevPage } }}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded"
              >
                ← Previous
              </Link>
            ) : (
              <span />
            )}

            <span className="self-center text-gray-400">
              Page {currentPage + 1}
            </span>

            {nextPage !== null ? (
              <Link
                href={{ pathname: "/blog", query: { page: nextPage } }}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded"
              >
                Next →
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
