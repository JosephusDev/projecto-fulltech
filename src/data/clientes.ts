import { Api } from '@/services/api'

interface IProjeto {
	nome: string
	valor: number
	status: boolean
}

interface ICliente {
	id: string
	nome: string
	telefone: string
	projetoId?: string | null
	projeto?: IProjeto
}

export const getClients = async () => {
	const response = await Api.get<ICliente[]>(`/clientes`)
	return response.data
}

export const createClient = async (data: Omit<ICliente, 'id'>) => {
	await Api.post<ICliente>('/clientes', data)
		.then(response => {
			return response.data
		})
		.catch(errors => {
			throw errors
		})
}

export const updateClient = async ({ id, data }: { id: string; data: Omit<ICliente, 'id'> }) => {
	await Api.put(`/clientes?id=${id}`, data)
}

export const deleteClient = async (id: string) => {
	await Api.delete(`/clientes?id=${id}`)
}
