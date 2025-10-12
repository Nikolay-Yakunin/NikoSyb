import { remark } from 'remark';
import html from "remark-html";
import gfm from "remark-gfm";

// processor
const markdownProcessor = remark().use(gfm).use(html);

// markdownToHtml - Processing md string to html
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await markdownProcessor.process(markdown);
  return String(result.value);
}