import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/Auth';
import { Navigate, Outlet } from 'react-router-dom';

// interface ContextTypes {
//     user: {
//         id: string;
//         name: string;
//         email: string;
//     } ;
// }

export default function PrivateRoutes() {
    const { user }: any = useContext(AuthContext);

    // useEffect(() => {
    //     const clear = setInterval(() => {
    //         fetch('https://insidethebox-server.onrender.com/login/auth', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             credentials: 'include',
    //         })
    //             .then((res) => res.json())
    //             .then(({ response }) => {
    //                 if (!response) location.replace('/logout');
    //             })
    //             .catch((err) => {
    //                 location.replace('/logout');
    //             });
    //     }, 15000);

    //     return () => clearInterval(clear);
    // }, []);

    return user ? <Outlet /> : <Navigate to="/login" />;
}
