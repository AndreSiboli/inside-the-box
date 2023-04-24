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

    async function signIn() {
        const data = await fetch('https://insidethebox-server.onrender.com/login/auth', {
            method: 'GET',
            credentials: 'include',
        })
            .then((res) => res.json())
            .then(({ response }: UserTypes) => {
                console.log(response)
                if (!response) return false;
                const resString = JSON.stringify(response)
                localStorage.setItem('@Auth:user', resString);
                
                const resJson = JSON.parse(resString)
                setUser(resJson);
                return true;
            })
            .catch((err) => {
                return false;
            });

        return data;
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
