import { MainNav } from '@/components/MainNav'
import { RightNav } from '@/components/RightNav'
import { MainNavMobile } from '@/components/MainNavMobile'

export default function Header() {
	return (
		<header className='fixed top-0 left-0 z-50 w-full border-b bg-background'>
			<div className='flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0'>
				<div className='hidden md:flex w-full'>
					<MainNav />
				</div>
				<div className='flex md:hidden w-full'>
					<MainNavMobile />
				</div>
				<RightNav />
			</div>
		</header>
	)
}
