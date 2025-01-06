import { Routes, Route, Navigate } from 'react-router-dom'
import Projetos from '@/pages/Projetos'
import Clientes from '@/pages/Clientes'
import Dashboard from '@/pages/Dashboard'
import Login from '@/pages/Login'
import { useAuth } from '@/context/AuthContext'

export default function RoutesComponent() {
	const { user } = useAuth()
	return (
		<Routes>
			{/* Rotas privadas */}
			<Route path='/projetos' element={user ? <Projetos /> : <Navigate to='/' />} />
			<Route path='/clientes' element={user ? <Clientes /> : <Navigate to='/' />} />
			<Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to='/' />} />

			{/* Rotas públicas */}
			<Route path='/' element={<Login />} />

			{/* Rota para lidar com páginas não encontradas */}
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	)
}
