import Link from 'next/link';
import { FileText } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

const GUIDELINES = [
  { name: 'Writing Principles', path: '/guidelines/writing-principles' },
  { name: 'Basics', path: '/guidelines/basics' },
  { name: 'Date & Time', path: '/guidelines/date-time' },
  { name: 'Tone of Voice', path: '/guidelines/tone-of-voice-principles' },
  { name: 'Inclusive Language', path: '/guidelines/inclusive-language' },
  { name: 'Numbers and Currencies', path: '/guidelines/numbers-currencies' },
];

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="block">
          <h1 className="text-xl font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Carro GPT
          </h1>
        </Link>
        <ThemeToggle />
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">About This Project</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            This AI assistant helps with UX copywriting by providing style-consistent suggestions and answers based on the provided knowledge base.
          </p>
        </div>

        <div>
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Style Guidelines</h3>
          <nav className="space-y-2">
            {GUIDELINES.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
