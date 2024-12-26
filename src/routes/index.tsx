import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Projetos from '@/pages/Projetos'
import Clientes from '@/pages/Clientes'

export default function RoutesComponent() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path='/' element={<Projetos />} />
      <Route path='/projetos' element={<Projetos />} />
      <Route path='/clientes' element={<Clientes />} />

      {/* Rota para lidar com páginas não encontradas */}
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}