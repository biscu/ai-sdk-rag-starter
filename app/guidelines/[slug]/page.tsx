import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';

interface PageProps {
  params: {
    slug: string;
  };
}

// Custom components for markdown elements
const components = {
  table: ({ node, ...props }: { node: any }) => (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  th: ({ node, ...props }: { node: any }) => (
    <th 
      className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider bg-gray-50 dark:bg-neutral-800 border-b border-gray-200 dark:border-neutral-600"
      {...props}
    />
  ),
  td: ({ node, ...props }: { node: any }) => (
    <td 
      className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700"
      {...props}
    />
  ),
  code: ({ node, inline, className, children, ...props }: any) => {
    if (inline) {
      return (
        <code className="bg-gray-100 dark:bg-neutral-900 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
          {children}
        </code>
      );
    }
    return (
      <pre className="bg-gray-900 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto my-4 border border-gray-800 dark:border-neutral-600">
        <code className="text-gray-100 text-sm" {...props}>
          {children}
        </code>
      </pre>
    );
  },
  a: ({ node, ...props }: { node: any }) => (
    <a 
      className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-300" 
      target="_blank" 
      rel="noopener noreferrer"
      {...props} 
    />
  ),
  blockquote: ({ node, ...props }: { node: any }) => (
    <blockquote 
      className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-6 text-gray-600 dark:text-gray-300 italic" 
      {...props} 
    />
  ),
  h1: ({ node, ...props }: { node: any }) => (
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6" {...props} />
  ),
  h2: ({ node, ...props }: { node: any }) => (
    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-10 mb-4" {...props} />
  ),
  h3: ({ node, ...props }: { node: any }) => (
    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mt-8 mb-3" {...props} />
  ),
  p: ({ node, ...props }: { node: any }) => (
    <p className="my-4 text-gray-700 dark:text-gray-300 leading-relaxed" {...props} />
  ),
  ul: ({ node, ...props }: { node: any }) => (
    <ul className="list-disc pl-6 my-4 text-gray-700 dark:text-gray-300 space-y-1" {...props} />
  ),
  ol: ({ node, ...props }: { node: any }) => (
    <ol className="list-decimal pl-6 my-4 text-gray-700 dark:text-gray-300 space-y-1" {...props} />
  ),
  li: ({ node, ...props }: { node: any }) => (
    <li className="my-1" {...props} />
  ),
  hr: ({ node, ...props }: { node: any }) => (
    <hr className="my-8 border-gray-200 dark:border-gray-700" {...props} />
  ),
};

export default function GuidelinePage({ params }: PageProps) {
  // Read the markdown file
  const filePath = path.join(process.cwd(), 'data', `${params.slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContent);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <article className="prose prose-gray dark:prose-invert max-w-none 
        prose-headings:font-semibold 
        prose-h1:text-3xl prose-h1:mb-6
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:my-4 prose-p:leading-relaxed
        prose-ul:my-4 prose-ul:pl-6
        prose-ol:my-4 prose-ol:pl-6
        prose-li:my-1
        prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-800 dark:hover:prose-a:text-blue-300 prose-a:no-underline hover:prose-a:underline
        prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600 prose-blockquote:pl-4 prose-blockquote:my-6
        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
        prose-pre:bg-gray-900 dark:prose-pre:bg-neutral-800 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:border prose-pre:border-gray-800 dark:prose-pre:border-neutral-600
        prose-th:px-4 prose-th:py-3 prose-th:bg-gray-50 dark:prose-th:bg-neutral-800 prose-th:border-b prose-th:border-gray-200 dark:prose-th:border-neutral-600
        prose-td:px-4 prose-td:py-3 prose-td:border-b prose-td:border-gray-200 dark:prose-td:border-gray-700
      ">
        {data.title && <h1 className="dark:text-white">{data.title}</h1>}
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}

// Generate static paths at build time
export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'data'));
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => ({
      slug: file.replace(/\.md$/, ''),
    }));
}
