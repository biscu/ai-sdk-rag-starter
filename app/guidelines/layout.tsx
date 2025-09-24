import Sidebar from '@/app/components/Sidebar';

export default function GuidelinesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
