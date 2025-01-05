import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Projetos from '@/pages/Projetos'
import Clientes from '@/pages/Clientes'
import Dashboard from '@/pages/Dashboard'
import Login from '@/pages/Login'

export default function RoutesComponent() {
  const token = localStorage.getItem('token')
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path='/' element={<Login />} />
      {/* Rotas privadas */}
      <Route path='/projetos' element={token ? <Projetos /> : <Navigate to='/' />} />
      <Route path='/clientes' element={token ? <Clientes /> : <Navigate to='/' />} />
      <Route path='/dashboard' element={token ? <Dashboard /> : <Navigate to='/' />} />

      {/* Rota para lidar com páginas não encontradas */}
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}