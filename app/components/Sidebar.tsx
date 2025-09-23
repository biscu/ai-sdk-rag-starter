import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto">
      <h1 className="text-xl font-bold mb-6">Carro GPT</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-gray-800 mb-2">About This Project</h2>
          <p className="text-sm text-gray-600 mb-4">
            This AI assistant helps with UX copywriting by providing style-consistent suggestions and answers based on the provided knowledge base written by Caroline. 
          </p>
        </div>

        <div>
          <h3 className="font-medium text-gray-700 mb-2">Knowledge Base</h3>
         <p>The model has the context of the UX guidelines of PostNord and you can check them here</p>
        </div>

        <div className="pt-4 border-t border-gray-100 text-xs text-gray-500">
          <p>Built with Next.js and AI SDK</p>
          <p className="mt-1">© {new Date().getFullYear()} UX Copy Assistant</p>
        </div>
      </div>
    </div>
  );
}
