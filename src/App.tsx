import { AuthProvider } from './context/Auth';
import { Outlet, useNavigate } from 'react-router-dom';

import './App.scss';
import { useEffect } from 'react';
import { interceptor, verifyToken } from './utils/requests';

//------------------------------------- Components -------------------------------------

function App() {
    const Navigator = useNavigate();

    useEffect(() => {
        async function firstLoad() {
            const ret = await verifyToken();
            console.log(ret);
            if (!ret) Navigator('/logout');
        }

        interceptor();
        firstLoad();
    }, []);

    return (
        <AuthProvider>
            <div className="App">
                <Outlet />
            </div>
        </AuthProvider>
    );
}

export default App;
