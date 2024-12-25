import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import {
  Archive,
  ChartBar,
  Menu,
  Users
} from 'lucide-react'

export function MainNavMobile() {
  return (
    <div className='flex flex-col'>
      <header className='sticky top-0 z-30 flex h-14 items-center px-2 bg-background gap-4'>
        <Sheet>
          <SheetTrigger>
            <Button size={'icon'} variant={'outline'}>
              <Menu className='w-5 h-5 text-primary' />
            </Button>
          </SheetTrigger>
          <SheetContent side={'left'}>
            <nav className='grid gap-6 text-lg font-medium'>
              <a
                href='/'
                className='flex h-10 w-10 bg-primary 
                                rounded-full text-lg items-center justify-center text-primary-foreground md:text-base gap-2'
              >
                <ChartBar className='h-5 w-5 transition-all' />
              </a>
              <a
                href='/projetos'
                className='flex items-center gap-4 px-2.5 text-foreground
                                hover:text-muted-foreground'
              >
                <Archive className='h-5 w-5 transition-all' />
                <h6 className='text-base sm:text-xl'>Projetos</h6>
              </a>
              <a
                href='/clientes'
                className='flex items-center gap-4 px-2.5 text-foreground
                                hover:text-muted-foreground'
              >
                <Users className='h-5 w-5 transition-all' />
                <h6 className='text-base sm:text-xl'>Clientes</h6>
              </a>
              <a
                href='/dashboard'
                className='flex items-center gap-4 px-2.5 text-foreground
                                hover:text-muted-foreground'
              >
                <ChartBar className='h-5 w-5 transition-all' />
                <h6 className='text-base sm:text-xl'>Dashboard</h6>
              </a>
            </nav>
          </SheetContent>
        </Sheet>
        <h2>Menu</h2>
      </header>
    </div>
  )
}
