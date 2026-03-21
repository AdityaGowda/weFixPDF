import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

// Body content sits below structural h2 sections (How It Works, Features, FAQ).
// Shift markdown headings down one level so they don't compete with page h2s.
const components: Components = {
  h1: ({ children }) => (
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">{children}</h2>
  ),
  h2: ({ children }) => (
    <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{children}</h3>
  ),
  h3: ({ children }) => (
    <h4 className="text-lg sm:text-xl font-bold tracking-tight">{children}</h4>
  ),
};

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:tracking-tight prose-p:text-base">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}