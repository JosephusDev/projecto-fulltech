import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import axios from 'axios'
import { useGoogleLogin, googleLogout } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { XCircle } from 'lucide-react'
import Loading from '@/components/MyLoading'

// Tipos TypeScript
type User = {
	firstName: string
	lastName: string
	email: string
	picture: string
}

type AuthContextType = {
	user: User | null
	login: () => void
	loginWithEmail: (email: string) => void
	logout: () => void
}

// Criar o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook personalizado para usar o contexto
export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth deve ser usado dentro de um AuthProvider')
	}
	return context
}

const emails = ['condepinto2@gmail.com', 'filomenoolivetree@gmail.com', 'bencaotoko2021@gmail.com']

// Provedor do contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [user, setUser] = useState<User | null>(null)
	const { toast } = useToast()

	const navigate = useNavigate()

	useEffect(() => {
		// Verificar o token no localStorage ao inicializar
		const token = localStorage.getItem('token')
		if (token) {
			axios
				.get('https://www.googleapis.com/oauth2/v3/userinfo', {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then(({ data }) => {
					const { given_name, family_name, email, picture } = data
					if (emails.some(e => e === email)) {
						setUser({
							firstName: given_name,
							lastName: family_name,
							email,
							picture,
						})
					} else {
						localStorage.removeItem('token') // Limpar token inválido
						navigate('/')
					}
				})
				.catch(() => {
					localStorage.removeItem('token') // Limpar token inválido
					navigate('/')
					toast({
						description: (
							<div className='flex motion-preset-pop'>
								<XCircle size='20' />
								<div className='ml-2 font-bold'>Sessão expirada. Faça Login</div>
							</div>
						),
						variant: 'destructive',
					})
				})
				.finally(() => setIsLoading(false))
		} else {
			setIsLoading(false)
		}
	}, [navigate])

	const loginWithEmail = (email: string) => {
		if (emails.includes(email)) {
			setUser({
				firstName: 'José',
				lastName: 'Pinto',
				email,
				picture: '',
			})
			navigate('/projetos')
		} else {
			toast({
				description: (
					<div className='flex motion-preset-pop'>
						<XCircle size='20' />
						<div className='ml-2 font-bold'>Email não autorizado.</div>
					</div>
				),
				variant: 'destructive',
			})
		}
	}

	const login = useGoogleLogin({
		onSuccess: async tokenResponse => {
			// Obter informações do perfil do usuário
			await axios
				.get('https://www.googleapis.com/oauth2/v3/userinfo', {
					headers: {
						Authorization: `Bearer ${tokenResponse.access_token}`,
					},
				})
				.then(userInfo => {
					// Extrair dados do usuário
					const { given_name, family_name, email, picture } = userInfo.data
					if (emails.some(e => e === email)) {
						localStorage.setItem('token', tokenResponse.access_token)
						setUser({
							firstName: given_name,
							lastName: family_name,
							email: email,
							picture: picture,
						})
						navigate('/projetos')
					} else {
						toast({
							description: (
								<div className='flex motion-preset-pop'>
									<XCircle size='20' />
									<div className='ml-2 font-bold'>Email não autorizado.</div>
								</div>
							),
							variant: 'destructive',
						})
						navigate('/')
					}
				})
				.catch(error => console.error('Erro ao obter informações do usuário:', error))
				.finally(() => setIsLoading(false))
		},
		onError: erro => {
			setIsLoading(false)
			console.error(erro)
		},
	})

	const logout = () => {
		setUser(null)
		googleLogout()
		localStorage.removeItem('token')
		navigate('/')
	}

	if (isLoading) return <Loading />

	return <AuthContext.Provider value={{ user, login, logout, loginWithEmail }}>{children}</AuthContext.Provider>
}
