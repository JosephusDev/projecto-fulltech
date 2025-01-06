import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'

interface IData {
	value: string
	label: string
}

interface ComboBoxProps {
	data: IData[]
	value: string
	title: string
	setValue: (value: string) => void
}

export function ComboBox({ data, value, setValue, title }: ComboBoxProps) {
	return (
		<Command className='col-span-3'>
			<CommandInput placeholder={title} className='h-9' />
			<CommandList>
				<CommandEmpty>Não encontrado.</CommandEmpty>
				<CommandGroup>
					{data.map(d => (
						<CommandItem
							key={d.value}
							value={d.value}
							onSelect={() => setValue(d.value)}
						>
							{d.label}
							<Check
								className={cn(
									'ml-auto',
									value === d.value ? 'opacity-100' : 'opacity-0',
								)}
							/>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	)
}
