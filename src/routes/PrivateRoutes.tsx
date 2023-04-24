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

    return user ? <Outlet /> : <Navigate to="/login" />;
}
