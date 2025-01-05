import '@/index.css'
import RoutesComponent from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';

function App() {

  const CLIENTE_ID = import.meta.env.VITE_CLIENTE_ID

  const queryCliente = new QueryClient()
  
  return (
      <GoogleOAuthProvider clientId={CLIENTE_ID}>
        <AuthProvider>
          <QueryClientProvider client={queryCliente}>
            <RoutesComponent/>
          </QueryClientProvider>
        </AuthProvider>
      </GoogleOAuthProvider>


  )
}

export default App
