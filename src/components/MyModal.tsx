import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface MyModalProps {
	titulo_modal: string
	children?: React.ReactNode
	triggers?: React.ReactNode
	icone?: React.ReactNode
	disabled?: boolean
	onClick?: () => void
}

export default function MyModal({ disabled = false, children, titulo_modal, icone, triggers, onClick }: MyModalProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>{triggers}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{titulo_modal}</DialogTitle>
				</DialogHeader>
				<div className='space-y-4'>{children && children}</div>
				<DialogFooter className='gap-2'>
					<DialogClose asChild>
						<Button className='border-primary' variant={'secondary'} id='cancelButton'>
							Cancelar
						</Button>
					</DialogClose>
					<Button disabled={disabled} onClick={onClick} id='confirmButton'>
						{icone ? icone : 'Confirmar'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
