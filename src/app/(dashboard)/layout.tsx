import Link from 'next/link'
import { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm hidden md:block">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-primary">CleanConnect</h2>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          <Link
            href="/dashboard"
            className="hover:bg-primary-light text-primary font-medium px-4 py-2 rounded transition"
          >
            🏠 Início
          </Link>
          <Link
            href="/dashboard/clients"
            className="hover:bg-primary-light text-primary font-medium px-4 py-2 rounded transition"
          >
            👥 Clientes
          </Link>
          <Link
            href="/dashboard/agenda"
            className="hover:bg-primary-light text-primary font-medium px-4 py-2 rounded transition"
          >
            📅 Agenda
          </Link>
          <Link
            href="/dashboard/profile"
            className="hover:bg-primary-light text-primary font-medium px-4 py-2 rounded transition"
          >
            🙋‍♀️ Meu Perfil
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  )
}

