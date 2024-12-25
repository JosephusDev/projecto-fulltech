import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Projetos from '@/pages/Projetos'

export default function RoutesComponent() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path='/projetos' element={<Projetos />} />
      <Route path='/' element={<Projetos />} />

      {/* Rota para lidar com páginas não encontradas */}
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}