import { PostList, PostToHtml, getPosts } from "@/entities/Post";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PostsWidget({ page = 1, limit = 10 }) {
  const res = await getPosts(page, limit);
  if (!res) {
    notFound();
  }

  const postsWithHtml = await Promise.all(
    res.data.map(async (post) => await PostToHtml(post)),
  );
  const validPosts = postsWithHtml.filter((post): post is NonNullable<typeof post> => post !== null);

  const prevPage = res?.links.prev;
  const nextPage = res?.links.next;

  return (
    <section className="container mx-auto max-w-2xl">
      <h1 className="text-3xl mb-8">Blog</h1>

      <PostList posts={validPosts} prefix="blog/" />

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

        <span className="self-center text-gray-400">Page {page}</span>

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
    </section>
  );
}
