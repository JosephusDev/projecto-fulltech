import '@/index.css'
import RoutesComponent from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {

  const queryCliente = new QueryClient()
  
  return (
    <QueryClientProvider client={queryCliente}>
      <RoutesComponent/>
    </QueryClientProvider>
  )
}

export default App
