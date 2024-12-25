import ThemeToggle from '@/components/theme-toggle'

export function LeftNav() {
  return (
    <div className='flex flex-1 items-center justify-end space-x-4 px-5'>
      <nav className='flex items-center space-x-1'>
        <ThemeToggle />
      </nav>
    </div>
  )
}
