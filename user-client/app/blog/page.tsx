import { getPostsV1, PostList } from "@/entities/Post";
import { Header, Footer } from "@/shared/ui";
import { NEXT_PUBLIC_SITE_URL} from "@/shared/model"

interface ParsedParams {
  range: [number, number];
  filter: Record<string, any>;
  sort: [string, "ASC" | "DESC"];
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function BlogPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  // parse
  // TODO: Improve this
  const parse = <T,>(param: any, fallback: T): T => {
    if (typeof param !== "string") return fallback;
    try {
      return JSON.parse(param);
    } catch {
      return fallback;
    }
  };

  const params: ParsedParams = {
    range: parse(searchParams.range, [0, 9]),
    filter: parse(searchParams.filter, {}),
    sort: parse(searchParams.sort, ["id", "DESC"]),
  };

  const posts = await getPostsV1(params);
  const prefix = NEXT_PUBLIC_SITE_URL;

  return (
    <div className="flex flex-col min-h-screen font-mono bg-black text-white">
      <Header />
      <main className="flex-grow px-4 py-12">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-3xl mb-8">Blog</h1>
          
          {posts ? (
            <PostList posts={posts} prefix={`${prefix}/blog`} />
          ) : (
            <p className="text-gray-500">Error loading posts.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}