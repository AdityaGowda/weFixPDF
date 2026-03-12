import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div
      className="prose prose-slate dark:prose-invert max-w-none
      prose-headings:tracking-tight

      prose-h1:text-2xl prose-h1:font-black
      prose-h2:text-2xl prose-h2:font-black
      prose-h3:text-xl prose-h3:font-bold
      prose-p:text-base

      sm:prose-h1:text-3xl
      sm:prose-h2:text-3xl
      sm:prose-h3:text-2xl

      lg:prose-h1:text-4xl
      lg:prose-h2:text-4xl
      lg:prose-h3:text-2xl"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}