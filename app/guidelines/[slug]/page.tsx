import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import matter from 'gray-matter';

interface PageProps {
  params: {
    slug: string;
  };
}

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
      <article className="prose prose-lg max-w-none">
        {data.title && <h1 className="text-3xl font-bold mb-8">{data.title}</h1>}
        <ReactMarkdown>{content}</ReactMarkdown>
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
