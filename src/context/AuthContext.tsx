import { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { XCircle } from 'lucide-react';

// Tipos TypeScript
type User = {
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
};

type AuthContextType = {
  user: User | null;
  login: () => void;
  logout: () => void;
};

// Criar o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

const emails = [
  "condepinto2@gmail.com",
  "filomenoolivetree@gmail.com",
]

// Provedor do contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const {toast} = useToast()

  const navigate = useNavigate()

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Obter informações do perfil do usuário
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        // Extrair dados do usuário
        const { given_name, family_name, email, picture } = userInfo.data;
        if(emails.some(e => e === email)){
          localStorage.setItem('token', tokenResponse.access_token)
          setUser({
            firstName: given_name,
            lastName: family_name,
            email: email,
            picture: picture,
          });
          navigate('/projetos')
        }
        else{
          toast({
            description: (
              <div className='flex motion-preset-pop'>
                <XCircle size='20' />
                <div className='ml-2 font-bold'>Email não autorizado.</div>
              </div>
            ),
            variant: 'destructive'
          })
          navigate('/')
        }
      } catch (error) {
        console.error('Erro ao obter informações do usuário:', error);
      }
    },
    onError: () => {
      console.log('Erro no login');
    },
  });

  const logout = () => {
    setUser(null);
    googleLogout();
    localStorage.removeItem('token')
    navigate('/')
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};