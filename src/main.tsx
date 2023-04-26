import ReactDOM from 'react-dom/client';
import './index.scss';
import { createBrowserRouter, RouterProvider, createHashRouter } from 'react-router-dom';

//------------------------------------- Routes -------------------------------------
import App from './App';
import Home from './routes/Home';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Error404 from './routes/Error404';
import Quiz from './routes/Quiz';
import PrivateRoutes from './routes/PrivateRoutes';
import PageBuilding from './routes/PageBuilding';

//------------------------------------- Utils -------------------------------------
import { logout } from './utils/requests';

//------------------------------------- Config -------------------------------------

const router = createHashRouter([
    {
        // path: '/insidethebox',
        element: <App />,
        children: [
            {
                element: <PrivateRoutes />,
                children: [
                    {
                        path: 'quiz/:category',
                        element: <Quiz />,
                    },
                    {
                        path: '/profile',
                        element: <PageBuilding />,
                    },
                ],
            },
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <Signup />,
            },
            {
                path: '/logout',
                loader: async () => {
                    const response = await logout()
                    if (!response) return false;
                    localStorage.removeItem('@Auth:user');
                    localStorage.removeItem('@Auth:token');
                    localStorage.removeItem('@Auth:refresh_token');
                    location.replace('/');

                    return null;
                },
            },
            {
                path: '*',
                element: <Error404 />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={router} />
);
