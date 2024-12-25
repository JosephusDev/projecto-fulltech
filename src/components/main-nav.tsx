import { ChartBar } from 'lucide-react'
import { MenuItems } from '@/components/menu-items'

export function MainNav() {
  return (
    <div className='flex px-5 gap-6 md:gap-10'>
      <a href='/' className='flex items-center space-x-1'>
        <ChartBar className='h-6 w-6 text-primary' />
        <span className='inline-block font-bold text-lg text-primary'>FullTech</span>
      </a>
      <nav className='flex gap-6'>
        <MenuItems />
      </nav>
    </div>
  )
}
