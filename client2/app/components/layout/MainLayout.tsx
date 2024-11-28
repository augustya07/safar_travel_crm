import Sidebar from '../sidebar/Sidebar'
import Header from '../header/Header'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="pt-16 md:ml-64 p-4">
          {children}
        </main>
      </div>
    </div>
  )
}