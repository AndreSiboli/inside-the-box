import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface ContextTypes {
    user: {
        id: string;
        name: string;
        email: string;
    };
    signIn: Function;
    setUser: Function;
}

interface UserTypes {
    response: {
        id: string;
        name: string;
        email: string;
    };
}
interface UserType {
    id: string;
    name: string;
    email: string;
    date: Date;
}
export const AuthContext = createContext<ContextTypes | {}>({});

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<UserType | null | {}>({});

    useEffect(() => {
        const localUser: string | null = localStorage.getItem('@Auth:user');
        if (!localUser) return setUser(null);
        const json = JSON.parse(localUser);
        setUser(json);
    }, []);
   
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
