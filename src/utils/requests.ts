import axios from 'axios';

interface LoginTypes {
    email: string;
    password: string;
}
interface SignupTypes {
    name: string;
    email: string;
    password: string;
}
interface CheckQuestTypes {
    id: string;
    category: string | undefined;
}
interface VerifyQuestTypes {
    idQuestion: string;
    userResponse: string;
    category: string | undefined;
}

const url = 'http://localhost:7568';
//https://insidethebox-server.onrender.com

export const interceptor = () => {
    axios.interceptors.response.use(
        (res) => {
            return res;
        },
        (err) => {
            return new Promise(async (res, rej) => {
                const originalReq = err.config;
                if (err.response.status === 401 && err.config && !err.retry) {
                    originalReq.retry = true;
                    const token = localStorage.getItem('@Auth:refresh_token');
                    const response = await axios
                        .post(`${url}/login/token`, { token })
                        .then((res) => {
                            localStorage.setItem('@Auth:token', res.data.token);
                            localStorage.setItem('@Auth:refresh_token', res.data.refreshToken);
                            originalReq.headers['Authorization'] = `Bearer ${res.data.token}`;
                            return axios(originalReq);
                        });
                    res(response);
                } else {
                    rej(err);
                }
            });
        }
    );
};

export async function sendLogin(user: LoginTypes) {
    const config = {
        headers: { Authorization: localStorage.getItem('@Auth:token') },
    };

    const data = await axios
        .post(`${url}/login/login`, user, config)
        .then((ret) => {
            return ret;
        })
        .catch((err) => {
            return false
        });

    return data;
}

export async function sendSignup(user: SignupTypes) {
    const data = await fetch(url + '/login/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(user),
    })
        .then((res) => res.json())
        .then((ret) => {
            return ret;
        })
        .catch((err) => {
            console.log("Não foi possivel se registrar");
            return false
        });

    return data;
}

export async function requestQuestions(category: string) {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('@Auth:token')}` },
    };

    const datas = {
        category,
    };

    const data = await axios
        .post(`${url}/question/get-questions`, datas, config)
        .then((ret) => {
            const { data } = ret;
            return data;
        })
        .catch((err) => {
            console.log(err);
        });

    return data;
}

export async function requestQuestion(datas: CheckQuestTypes) {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('@Auth:token')}` },
    };

    const data = await axios
        .post(`${url}/question/get-question`, datas, config)
        .then((ret) => {
            const { data } = ret;
            return data;
        })
        .catch((err) => {
            console.log(err);
        });

    return data;
}

export async function verifyAnswer(data: VerifyQuestTypes) {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('@Auth:token')}` },
    };

    const datas = await axios
        .post(`${url}/question/check-question`, data, config)
        .then((ret) => {
            const { data } = ret;
            return data;
        })
        .catch((err) => {
            location.replace('/');
        });
    return datas;
}

export async function logout() {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('@Auth:token')}` },
    };

    const data = {
        token: localStorage.getItem('@Auth:refresh_token'),
    };

    const ret = axios
        .post(`${url}/login/logout`, data, config)
        .then((ret) => {
            const { data } = ret;
            return data;
        })
        .catch((err) => {
            console.log('Ocorreu um erro ao sair.');
            return false;
        });

    return ret;
}

export async function verifyToken() {
    const token = localStorage.getItem('@Auth:refresh_token');
    if (!token) return false;

    const data = await axios
        .post(`${url}/login/verify-refresh`, {token})
        .then((ret) => {
            const { data } = ret;
            if (data.result) return true;
            return false;
        })
        .catch((err) => {
            console.log('Token inválido');
            return false;
        });
    return data;
}
