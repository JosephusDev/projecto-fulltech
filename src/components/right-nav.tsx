import ThemeToggle from '@/components/theme-toggle'
import MyAvatar from './my-avatar'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export function RightNav() {
  const { logout } = useAuth()

  return (
    <div className='flex flex-1 items-center justify-end space-x-4 px-5'>
      <nav className='flex items-center space-x-3'>
        <MyAvatar />
        <ThemeToggle />
        <Button onClick={() => logout()} variant={'ghost'} size={'icon'}>
          <LogOut size={20} />
        </Button>
      </nav>
    </div>
  )
}
