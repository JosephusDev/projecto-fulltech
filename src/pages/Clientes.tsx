import Header from '@/components/MyHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toast } from '@/hooks/use-toast'
import { CheckCircle, Circle, Edit, Search, Trash, XCircle } from 'lucide-react'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getClients, createClient, updateClient, deleteClient } from '@/data/clientes'
import { getProjects } from '@/data/projetos'
import LayoutBase from '@/components/LayoutBase'
import { ComboBox } from '@/components/ComboBox'
import MyModal from '@/components/MyModal'
import InputIcon from '@/components/InputIcon'

export default function Clientes() {
	const queryClient = useQueryClient()

	const [nome, setNome] = useState('')
	const [telefone, setTelefone] = useState('')
	const [valorPago, setValorPago] = useState(0)
	const [projeto, setProjeto] = useState('')
	const [search, setSearch] = useState('')

	const alerta = (text: string, type: 'sucesso' | 'erro', variant: 'default' | 'destructive' = 'destructive') => {
		let Icone
		if (type === 'sucesso') {
			Icone = CheckCircle
		} else {
			Icone = XCircle
		}
		toast({
			description: (
				<div className='flex motion-preset-pop'>
					<Icone size='20' />
					<div className='ml-2 font-bold'>{text}</div>
				</div>
			),
			variant: variant,
		})
	}

	const { data: clientes, isLoading } = useQuery({
		queryKey: ['clientes'],
		queryFn: () => getClients(),
		staleTime: 1000 * 60,
	})

	const { data: projetos } = useQuery({
		queryKey: ['projetos'],
		queryFn: () => getProjects(1, 1000),
	})

	const { mutateAsync: createClientFn, isPending: isCreating } = useMutation({
		mutationFn: createClient,
	})

	const { mutateAsync: updateClientFn, isPending: isUpdating } = useMutation({
		mutationFn: updateClient,
	})

	const { mutateAsync: deleteClientFn, isPending: isDeleting } = useMutation({
		mutationFn: deleteClient,
	})

	const cadastrar = async () => {
		if (nome.trim() && telefone.trim()) {
			const projetoId = projetos?.projetos.find(p => p.nome === projeto)?.id || null
			await createClientFn({
				nome,
				telefone,
				valor_pago: valorPago,
				projetoId,
			})
				.then(() => {
					queryClient.invalidateQueries({ queryKey: ['clientes'] })
					alerta('Cadastrado com sucesso!', 'sucesso')
					limparCampos()
				})
				.catch(error => {
					if (error?.response?.status === 400) {
						alerta(error?.response?.data?.errors?.[0].message, 'erro', 'destructive')
					}
				})
		} else {
			alerta('Preencha todos os campos!', 'erro')
			return
		}
	}

	const editar = async (id: string) => {
		const projetoId = projetos?.projetos.find(p => p.nome === projeto)?.id
		const data = {
			nome,
			telefone,
			valor_pago: valorPago,
			projetoId,
		}
		await updateClientFn({ id, data })
			.then(() => {
				queryClient.invalidateQueries({ queryKey: ['clientes'] })
				alerta('Cliente alterado com sucesso!', 'sucesso')
			})
			.catch(error => console.error(error))
			.finally(() => limparCampos())
	}

	const eliminar = async (id: string) => {
		deleteClientFn(id)
			.then(() => {
				queryClient.invalidateQueries({ queryKey: ['clientes'] })
				alerta('Eliminado com sucesso!', 'sucesso')
			})
			.catch(error => console.error(error))
			.finally(() => limparCampos())
	}

	const limparCampos = () => {
		setNome('')
		setTelefone('')
		setValorPago(0)
		setProjeto('')
	}

	const clientsFiltered = clientes?.filter(
		c =>
			c.nome.toLowerCase().includes(search.toLowerCase()) ||
			c.projeto?.nome.toLowerCase().includes(search.toLowerCase()),
	)

	return (
		<>
			<Header />
			<div className='h-screen flex w-full'>
				<Card className='w-full h-full pt-16 border-0'>
					<LayoutBase
						title='Clientes'
						description='Gerenciamento dos clientes da FullTech.'
						isLoading={isCreating}
						onConfirm={cadastrar}
						visibleModal={true}
					>
						<div className='flex flex-col gap-4'>
							<div className='flex gap-2'>
								<div className='flex flex-col items-center gap-x-2'>
									<Label htmlFor='nome' className='w-full m-2'>
										Nome
									</Label>
									<Input onChange={text => setNome(text.target.value)} id='nome' className='col-span-3' />
								</div>
								<div className='flex flex-col items-center gap-x-7'>
									<Label htmlFor='telefone' className='w-full m-2'>
										Telefone
									</Label>
									<Input
										onChange={text => setTelefone(text.target.value)}
										type='tel'
										id='telefone'
										className='col-span-3'
									/>
								</div>
								<div className='flex flex-col items-center gap-x-7'>
									<Label htmlFor='valor_pago' className='w-full m-2'>
										Valor pago
									</Label>
									<Input
										onChange={e => setValorPago(Number(e.target.value))}
										type='number'
										id='valor_pago'
										className='col-span-3'
									/>
								</div>
							</div>
							<ComboBox
								title='Procure um projeto'
								data={
									projetos?.projetos.map(proj => ({
										value: proj.nome,
										label: proj.nome,
									})) || []
								}
								value={projeto}
								setValue={value => {
									setProjeto(value)
								}}
							/>
						</div>
					</LayoutBase>
					<div className='sm:w-2/5 md:w-1/6 lg:w-1/5 mx-5 my-5'>
						<InputIcon
							icon={<Search size={15} />}
							onChange={e => setSearch(e.target.value)}
							placeholder='Pesquise...'
							className='rounded-lg'
						/>
					</div>
					<CardContent className='border rounded-lg p-1 mx-5 overflow-y-auto max-h-[365px]'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className='font-bold text-center'>Nº</TableHead>
									<TableHead className='font-bold text-center'>Cliente</TableHead>
									<TableHead className='font-bold text-center'>Telefone</TableHead>
									<TableHead className='font-bold text-center'>Projeto</TableHead>
									<TableHead className='font-bold text-center'>Total a pagar</TableHead>
									<TableHead className='font-bold text-center'>Total pago</TableHead>
									<TableHead className='font-bold text-center'>Status</TableHead>
									<TableHead className='font-bold text-center'>Editar</TableHead>
									<TableHead className='font-bold text-center'>Eliminar</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{isLoading || isCreating || isUpdating || isDeleting ? (
									<>
										<TableRow>
											<TableCell>
												<Skeleton className='h-4 w-full' />
											</TableCell>
											<TableCell>
												<Skeleton className='h-4 w-full' />
											</TableCell>
											<TableCell>
												<Skeleton className='h-4 w-full' />
											</TableCell>
											<TableCell>
												<Skeleton className='h-4 w-full' />
											</TableCell>
											<TableCell>
												<Skeleton className='h-4 w-full' />
											</TableCell>
											<TableCell>
												<Skeleton className='h-4 w-full' />
											</TableCell>
											<TableCell>
												<Skeleton className='h-4 w-full' />
											</TableCell>
											<TableCell>
												<Skeleton className='h-4 w-full' />
											</TableCell>
											<TableCell>
												<Skeleton className='h-4 w-full' />
											</TableCell>
										</TableRow>
									</>
								) : (
									clientsFiltered?.map((cliente, index) => {
										return (
											<TableRow key={cliente.nome}>
												<TableCell className='whitespace-nowrap text-center'>{index + 1}</TableCell>
												<TableCell className='whitespace-nowrap text-center'>{cliente.nome}</TableCell>
												<TableCell className='whitespace-nowrap text-center'>{cliente.telefone}</TableCell>
												<TableCell className='whitespace-nowrap text-center'>
													{cliente.projeto?.nome || 'Nenhum'}
												</TableCell>
												<TableCell className='whitespace-nowrap text-center'>
													{cliente.projeto?.valor.toLocaleString() || 0} Kz
												</TableCell>
												<TableCell className='whitespace-nowrap text-center'>
													{cliente.valor_pago?.toLocaleString() || 0} Kz
												</TableCell>
												<TableCell className='flex items-center justify-center mt-3'>
													<Circle
														size={14}
														stroke={cliente.projeto?.status ? '#00FF00' : '#FF0000'}
														fill={cliente.projeto?.status ? '#00FF00' : '#FF0000'}
													/>
												</TableCell>
												<TableCell className='text-center w-[8%]'>
													<MyModal
														titulo_modal='Editar'
														onClick={() => editar(cliente.id)}
														triggers={
															<Button
																variant={'ghost'}
																size={'icon'}
																onClick={() => {
																	setProjeto(cliente.projeto?.nome || '')
																	setNome(cliente.nome)
																	setTelefone(cliente.telefone)
																	setValorPago(cliente.valor_pago)
																}}
															>
																<Edit size={18} />
															</Button>
														}
													>
														<div className='flex flex-col gap-4'>
															<div className='flex gap-2'>
																<div className='flex flex-col items-center gap-x-2'>
																	<Label htmlFor='nome' className='w-full m-2'>
																		Nome
																	</Label>
																	<Input
																		value={nome}
																		onChange={text => setNome(text.target.value)}
																		id='nome'
																		className='col-span-3'
																	/>
																</div>
																<div className='flex flex-col items-center gap-x-7'>
																	<Label htmlFor='telefone' className='w-full m-2'>
																		Telefone
																	</Label>
																	<Input
																		value={telefone}
																		onChange={text => setTelefone(text.target.value)}
																		type='tel'
																		id='telefone'
																		className='col-span-3'
																	/>
																</div>
																<div className='flex flex-col items-center gap-x-7'>
																	<Label htmlFor='valor_pago' className='w-full m-2'>
																		Valor pago
																	</Label>
																	<Input
																		onChange={e => setValorPago(Number(e.target.value))}
																		type='number'
																		id='valor_pago'
																		className='col-span-3'
																	/>
																</div>
															</div>
															<ComboBox
																title='Procure um projeto'
																data={
																	projetos?.projetos.map(proj => ({
																		value: proj.nome,
																		label: proj.nome,
																	})) || []
																}
																value={projeto}
																setValue={value => setProjeto(value)}
															/>
														</div>
													</MyModal>
												</TableCell>
												<TableCell className='text-center w-[8%]'>
													<Button onClick={() => eliminar(cliente.id)} variant={'ghost'} size={'icon'}>
														<Trash size={18} />
													</Button>
												</TableCell>
											</TableRow>
										)
									})
								)}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</>
	)
}
