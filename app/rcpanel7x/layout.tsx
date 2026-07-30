import AdminHeader from './AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-parchment-100 flex flex-col -mt-[var(--navbar-height)]">
      <AdminHeader />

      <div className="flex-1 w-full">
        {children}
      </div>
    </div>
  );
}
