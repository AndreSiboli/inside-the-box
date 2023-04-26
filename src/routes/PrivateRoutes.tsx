import { useContext } from 'react';
import { AuthContext } from '../context/Auth';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoutes() {
    const { user }: any = useContext(AuthContext);

    return user ? <Outlet /> : <Navigate to="/login" />;
}
