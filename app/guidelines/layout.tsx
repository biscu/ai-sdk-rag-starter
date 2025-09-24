import Sidebar from '@/app/components/Sidebar';

export default function GuidelinesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 pl-64">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
