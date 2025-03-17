import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/AuthContext'
import Lottie from 'lottie-react'
import image from '@/assets/img/project.json'
import { useState } from 'react'
import { Lock } from 'lucide-react'

export default function Login() {
	const { login, loginWithEmail } = useAuth()
	const [email, setEmail] = useState('')
	return (
		<div className='grid min-h-screen lg:grid-cols-2'>
			{/* Coluna do Formulário */}
			<div className='flex items-center justify-center p-6 md:p-10'>
				<div className='w-full max-w-sm'>
					<Card className='animate-fade-in'>
						<CardHeader>
							<CardTitle className='text-2xl flex flex-col items-center gap-2'>
								<div className='bg-primary p-2 rounded-full mb-2'>
									<Lock color='#FFFFFF' />
								</div>
								Startup FullTech
							</CardTitle>
							<CardDescription className='text-center'>Faça Login para continuar</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='flex flex-col gap-6'>
								<div className='grid gap-2'>
									<Label htmlFor='email'>Email</Label>
									<Input
										onChange={e => setEmail(e.target.value)}
										id='email'
										type='email'
										placeholder='email@exemplo.com'
									/>
								</div>
								<Button onClick={() => loginWithEmail(email)} id='loginButton' className='w-full motion-preset-expand'>
									Login
								</Button>
								<Button onClick={login} variant='outline' className='w-full'>
									Login com Google
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Coluna da Animação Lottie */}
			<div className='hidden bg-muted lg:flex items-center justify-center'>
				<Lottie animationData={image} className='w-2/3 animate-fade-in' />
			</div>
		</div>
	)
}
