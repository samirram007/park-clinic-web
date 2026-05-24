import { Link, useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/features/auth/contexts/auth-context'
import { Button } from '@/components/ui/button'

export default function ProtectedHeader() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate({ to: '/login' })
  }

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <Link to="/admin" className="text-xl font-bold">
        Admin Dashboard
      </Link>
      <nav className="flex items-center gap-4">
        <Link to="/admin" className="text-sm hover:text-blue-600">Messages</Link>
      </nav>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">{user?.name}</span>
        <Button onClick={handleLogout} variant="outline" size="sm">
          Logout
        </Button>
      </div>
    </header>
  )
}