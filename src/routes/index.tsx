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
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path='/' element={<Login />} />
      <Route path='/projetos' element={<Projetos />} />
      <Route path='/clientes' element={<Clientes />} />
      <Route path='/dashboard' element={<Dashboard />} />

      {/* Rota para lidar com páginas não encontradas */}
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}