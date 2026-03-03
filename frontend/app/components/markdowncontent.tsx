import ReactMarkdown from "react-markdown";

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none

    prose-headings:tracking-tight

    /* Mobile (default) */
    prose-h1:text-2xl prose-h1:font-black
    prose-h2:text-2xl prose-h2:font-black
    prose-h3:text-xl prose-h3:font-bold
    prose-p:text-base

    /* Tablet */
    sm:prose-h1:text-3xl
    sm:prose-h2:text-3xl
    sm:prose-h3:text-2xl

    /* Desktop */
    lg:prose-h1:text-4xl
    lg:prose-h2:text-4xl
    lg:prose-h3:text-2xl">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}