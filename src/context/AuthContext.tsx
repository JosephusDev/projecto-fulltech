import { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

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

// Provedor do contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

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
        console.log('Informações do usuário:', userInfo.data);
        // Extrair dados do usuário
        const { given_name, family_name, email, picture } = userInfo.data;
        setUser({
          firstName: given_name,
          lastName: family_name,
          email: email,
          picture: picture,
        });
        navigate('/projetos')
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
    navigate('/')
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};