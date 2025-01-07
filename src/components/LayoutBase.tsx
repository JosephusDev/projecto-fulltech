import { Loader2, PlusCircle } from 'lucide-react'
import MyModal from './MyModal'
import { CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

interface LayoutBaseProps {
	title: string
	description?: string
	children?: React.ReactNode
	isLoading?: boolean
	buttonTitle?: string
	modalTitle?: string
	visibleModal?: boolean
	onConfirm?: () => void
}

export default function LayoutBase({
	title,
	description,
	isLoading = false,
	buttonTitle = 'Adicionar',
	modalTitle = 'Adicionar',
	visibleModal = false,
	onConfirm,
	children,
}: LayoutBaseProps) {
	return (
		<CardHeader className='flex flex-row justify-between items-center'>
			<div>
				<CardTitle className='flex sm:gap-2'>
					<span className='font-bold text-2xl'>{title}</span>
				</CardTitle>
				<CardDescription className='hidden sm:flex'>{description}</CardDescription>
			</div>
			{visibleModal && (
				<MyModal
					titulo_modal={modalTitle}
					onClick={onConfirm}
					disabled={isLoading}
					icone={isLoading && <Loader2 className='h-4 w-4 animate-spin' />}
					triggers={
						<Button id='openModal' className='gap-1'>
							<PlusCircle size={15} /> {buttonTitle}
						</Button>
					}
				>
					{children}
				</MyModal>
			)}
		</CardHeader>
	)
}
