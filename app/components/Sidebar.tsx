import Link from 'next/link';
import { FileText } from 'lucide-react';

const GUIDELINES = [
  { name: 'Basics', path: '/guidelines/basics' },
  { name: 'Date & Time', path: '/guidelines/date-time' },
  { name: 'Tone of Voice', path: '/guidelines/tone-of-voice-principles' },
];

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto">
      <Link href="/" className="block">
        <h1 className="text-xl font-bold mb-6 hover:text-blue-600 transition-colors">Carro GPT</h1>
      </Link>
      
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-gray-800 mb-2">About This Project</h2>
          <p className="text-sm text-gray-600 mb-4">
            This AI assistant helps with UX copywriting by providing style-consistent suggestions and answers based on the provided knowledge base.
          </p>
        </div>

        <div>
          <h3 className="font-medium text-gray-700 mb-3">Style Guidelines</h3>
          <nav className="space-y-2">
            {GUIDELINES.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 p-2 rounded-md transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-gray-100 text-xs text-gray-500">
          <p>Built with Next.js and AI SDK</p>
          <p className="mt-1"> {new Date().getFullYear()} UX Copy Assistant</p>
        </div>
      </div>
    </div>
  );
}
