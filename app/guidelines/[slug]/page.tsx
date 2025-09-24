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
      className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider bg-gray-50 border-b border-gray-200"
      {...props}
    />
  ),
  td: ({ node, ...props }: { node: any }) => (
    <td 
      className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200"
      {...props}
    />
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
      <article className="prose prose-gray max-w-none 
        prose-headings:font-semibold 
        prose-h1:text-3xl prose-h1:mb-6
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:my-4 prose-p:leading-relaxed
        prose-ul:my-4 prose-ul:pl-6
        prose-ol:my-4 prose-ol:pl-6
        prose-li:my-1
        prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-a:no-underline hover:prose-a:underline
        prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:my-6
        prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
        prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
        
        /* Table styles */
        prose-table:my-8
        prose-table:w-full
        prose-th:px-4 prose-th:py-3 prose-th:bg-gray-50 prose-th:border-b prose-th:border-gray-200
        prose-td:px-4 prose-td:py-3 prose-td:border-b prose-td:border-gray-200
      ">
        {data.title && <h1>{data.title}</h1>}
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
