import '@/index.css'
import RoutesComponent from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext'

function App() {
	const CLIENTE_ID = '793580490004-f54n8d3bpio1q8tu29pps5h5p7t98qks.apps.googleusercontent.com'

	const queryCliente = new QueryClient()

	return (
		<GoogleOAuthProvider clientId={CLIENTE_ID}>
			<AuthProvider>
				<QueryClientProvider client={queryCliente}>
					<RoutesComponent />
				</QueryClientProvider>
			</AuthProvider>
		</GoogleOAuthProvider>
	)
}

export default App
