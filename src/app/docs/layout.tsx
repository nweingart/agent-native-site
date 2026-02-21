import { Sidebar } from "@/components/docs/Sidebar";
import { SearchDialog } from "@/components/SearchDialog";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 min-w-0 px-6 py-12 lg:px-12">
        <div className="prose max-w-3xl mx-auto">{children}</div>
      </main>
      <SearchDialog />
    </div>
  );
}
