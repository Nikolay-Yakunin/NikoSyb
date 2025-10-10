import { Header, Footer } from "@/shared/ui";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-0 m-0 font-mono bg-black text-white">
      <Header />

      <main className="flex-grow flex items-center px-4 pb-12">
        <div className="container mx-auto max-w-2xl w-full flex flex-col gap-8">
          {/* JSON block */}
          <div className="overflow-x-auto rounded-lg bg-gray-900 p-4">
            <pre className="text-base sm:text-lg whitespace-pre-wrap break-words">
              {`{
  "title": "Nice to meet you!",
  "description": "This is my site-blog",
  "body": "# Here you can see my life, ..."
}`}
            </pre>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[530px]">
            <Link
              href="/blog"
              className="flex items-center justify-center h-12 w-full sm:w-[250px] bg-white text-black font-medium rounded-md shadow hover:bg-gray-200 transition"
            >
              See my posts!
            </Link>
            <Link
              href="https://github.com/Nikolay-Yakunin/NikoSyb"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-12 w-full sm:w-[250px] bg-[#1E1E1E] text-white font-medium rounded-md shadow hover:bg-[#333] transition"
            >
              See this source!
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
