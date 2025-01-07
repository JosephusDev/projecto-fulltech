import Header from '@/components/MyHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toast } from '@/hooks/use-toast'
import { CheckCircle, Circle, MoreHorizontal, Trash, XCircle } from 'lucide-react'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProjects, createProject, updateProject, deleteProject } from '@/data/projetos'
import LayoutBase from '@/components/LayoutBase'
import MyPagination from '@/components/MyPagination'

export default function Projetos() {
	const queryClient = useQueryClient()

	const [nome, setNome] = useState('')
	const [descricao, setDescricao] = useState('')
	const [valor, setValor] = useState(0)
	const [tecnologias, setTecnologias] = useState('')
	const [status, setStatus] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(5)

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

	const { data, isLoading } = useQuery({
		queryKey: ['projetos', currentPage, itemsPerPage],
		queryFn: () => getProjects(currentPage, itemsPerPage),
		staleTime: 1000 * 60, // 1 minuto até atualizar os dados
	})

	const projetos = data?.projetos
	const totalItems = data?.total || 0
	const totalPages = Math.ceil(totalItems / itemsPerPage)

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	const { mutateAsync: createProjectFn, isPending: isCreating } = useMutation({
		mutationFn: createProject,
	})

	const { mutateAsync: updateProjectFn, isPending: isUpdating } = useMutation({
		mutationFn: updateProject,
	})

	const { mutateAsync: deleteProjectFn, isPending: isDeleting } = useMutation({
		mutationFn: deleteProject,
	})

	const cadastrar = async () => {
		if (nome.trim() && descricao.trim() && tecnologias.trim()) {
			await createProjectFn({
				nome,
				descricao,
				valor,
				tecnologias,
				status,
			})
				.then(() => {
					queryClient.invalidateQueries({ queryKey: ['projetos'] })
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

	const editarStatus = async (id: string, status: boolean) => {
		await updateProjectFn({ id, status })
			.then(() => {
				queryClient.invalidateQueries({ queryKey: ['projetos'] })
				alerta('Status alterado com sucesso!', 'sucesso')
			})
			.catch(error => console.error(error))
			.finally(() => limparCampos())
	}

	const eliminar = async (id: string) => {
		deleteProjectFn(id)
			.then(() => {
				queryClient.invalidateQueries({ queryKey: ['projetos'] })
				alerta('Eliminado com sucesso!', 'sucesso')
			})
			.catch(error => console.error(error))
			.finally(() => limparCampos())
	}

	const limparCampos = () => {
		setNome('')
		setDescricao('')
		setValor(0)
		setTecnologias('')
		setStatus(true)
	}

	return (
		<>
			<Header />
			<div className='h-screen flex w-full'>
				<Card className='w-full h-full pt-16 border-0'>
					<LayoutBase
						title='Projetos'
						description='Gerenciamento dos projectos da FullTech.'
						isLoading={isCreating}
						onConfirm={cadastrar}
						visibleModal={true}
					>
						<div className='grid gap-4 py-4'>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor='nome' className='text-right'>
									Nome
								</Label>
								<Input value={nome} onChange={text => setNome(text.target.value)} id='nome' className='col-span-3' />
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor='descricao' className='text-right'>
									Descrição
								</Label>
								<Input
									value={descricao}
									onChange={text => setDescricao(text.target.value)}
									id='descricao'
									className='col-span-3'
								/>
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor='preco' className='text-right'>
									Preço
								</Label>
								<Input
									value={valor}
									onChange={text => setValor(Number(text.target.value))}
									type='number'
									id='preco'
									className='col-span-3'
								/>
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor='tecnologias' className='text-right'>
									Tecnologias
								</Label>
								<Input
									value={tecnologias}
									onChange={text => setTecnologias(text.target.value)}
									id='tecnologias'
									className='col-span-3'
								/>
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor='status' className='text-right'>
									Estado
								</Label>
								<Select
									value={status ? 'true' : 'false'}
									onValueChange={value => {
										if (value === 'true') {
											setStatus(true)
										} else {
											setStatus(false)
										}
									}}
								>
									<SelectTrigger id='status' className='col-span-3'>
										<SelectValue placeholder='Selecione o estado' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value='true'>Concluido</SelectItem>
											<SelectItem value='false'>Em andamento</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
						</div>
					</LayoutBase>
					<CardContent className='border rounded-lg p-1 mx-5 overflow-y-auto max-h-[365px]'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className='font-bold text-center'>Nº</TableHead>
									<TableHead className='font-bold text-center'>Projeto</TableHead>
									<TableHead className='hidden sm:flex font-bold items-center justify-center'>Descrição</TableHead>
									<TableHead className='font-bold text-center'>Preço</TableHead>
									<TableHead className='font-bold text-center'>Tecnologias</TableHead>
									<TableHead className='font-bold text-center'>Status</TableHead>
									<TableHead className='font-bold text-center'>
										<span className='sr-only'>Ações</span>
									</TableHead>
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
											<TableCell className='hidden sm:flex items-center justify-center'>
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
									projetos?.map((projeto, index) => {
										return (
											<TableRow key={projeto.nome}>
												<TableCell className='whitespace-nowrap text-center'>{index + 1}</TableCell>
												<TableCell className='whitespace-nowrap text-center'>{projeto.nome}</TableCell>
												<TableCell className='whitespace-nowrap text-center hidden sm:flex items-center justify-center'>
													{projeto.descricao}
												</TableCell>
												<TableCell className='whitespace-nowrap text-center'>
													{projeto.valor.toLocaleString()} Kz
												</TableCell>
												<TableCell className='whitespace-nowrap text-center'>{projeto.tecnologias}</TableCell>
												<TableCell className='flex mt-3 flex-row justify-center'>
													<Circle
														size={14}
														stroke={projeto.status ? '#00FF00' : '#FF0000'}
														fill={projeto.status ? '#00FF00' : '#FF0000'}
													/>
												</TableCell>
												<TableCell>
													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button id={`moreButton${index}`} aria-haspopup='true' size='icon' variant='ghost'>
																<MoreHorizontal className='h-4 w-4' />
																<span className='sr-only'>Toggle menu</span>
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent align='end'>
															<DropdownMenuLabel>Ações</DropdownMenuLabel>
															<DropdownMenuItem
																onClick={() => editarStatus(projeto.id, !projeto.status)}
																className='gap-2'
															>
																{projeto.status ? (
																	<>
																		<XCircle color='#FF0000' size={15} /> Desativar
																	</>
																) : (
																	<>
																		<CheckCircle color='#00FF00' size={15} /> Ativar
																	</>
																)}
															</DropdownMenuItem>
															<DropdownMenuItem
																id={`trashButton${index}`}
																onClick={() => eliminar(projeto.id)}
																className='gap-2'
															>
																<Trash size={15} /> Eliminar
															</DropdownMenuItem>
														</DropdownMenuContent>
													</DropdownMenu>
												</TableCell>
											</TableRow>
										)
									})
								)}
							</TableBody>
						</Table>
					</CardContent>
					{!isLoading && projetos && projetos?.length > 0 && (
						<MyPagination
							currentPage={currentPage}
							totalPages={totalPages}
							itemsPerPage={itemsPerPage}
							setItemsPerPage={setItemsPerPage}
							handlePageChange={handlePageChange}
						/>
					)}
				</Card>
			</div>
		</>
	)
}
