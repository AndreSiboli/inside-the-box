import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Auth';
import styles from './Login.module.scss';

import Input from '../components/form/Input';
import SubmitButton from '../components/form/SubmitButton';
import Container from '../components/styles/Container';
import Logo from '../components/styles/Logo';

import { sendLogin } from '../utils/requests';
import { checkEmail, checkPassword } from '../utils/checkInput';
import Message from '../components/styles/Message';

interface MessageProps {
    text: string;
    isEnable: string;
}

export default function Login() {
    const { user, setUser }: any = useContext(AuthContext);
    const Navigator = useNavigate();
    const [messageLog, setMessageLog] = useState<MessageProps | false>(false);
    const [infoUser, setInfoUser] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (user) Navigator('/');
    }, [user]);

    function updateInput(e: any) {
        const name = e.target.name;
        const value = e.target.value;
        setInfoUser({ ...infoUser, [name]: value });
    }

    const submit = async (e: any) => {
        e.preventDefault();

        const user = {
            email: infoUser.email,
            password: infoUser.password,
        };

        const email = checkEmail(user.email);
        const password = checkPassword(user.password);

        if (!email || !password) {
            return setMessageLog({ text: 'Email ou senha inválida', isEnable: 'err' });
        }

        const {data}: any = await sendLogin(user);

        if (!data.token || !data.refresh_token)
            return setMessageLog({ text: 'Email ou senha inválida', isEnable: 'err' });

        localStorage.setItem('@Auth:token', data.token);
        localStorage.setItem('@Auth:refresh_token', data.refresh_token);
        localStorage.setItem('@Auth:user', JSON.stringify(data.user));
        setUser(data.user)
        Navigator('/');
    };

    return (
        <section className={styles.login}>
            <div className={styles.login_container}>
                <Container>
                    <div className={styles.login_wrapper}>
                        <div>
                            <Logo theme="dark" />
                        </div>
                        <div className={styles.login_main}>
                            <div className={styles.login_merchan}>
                                <h3>Login</h3>
                                <p>Para que pensar fora da caixa?</p>
                            </div>

                            <form className={styles.form}>
                                <div className={styles.form_input_container}>
                                    <Input
                                        text="Email"
                                        type="email"
                                        id="email"
                                        value={infoUser.email}
                                        handleInput={(e: any) => {
                                            updateInput(e);
                                        }}
                                    />
                                </div>
                                <div className={styles.form_input_container}>
                                    <Input
                                        text="Password"
                                        type="password"
                                        id="password"
                                        value={infoUser.password}
                                        handleInput={(e: any) => {
                                            updateInput(e);
                                        }}
                                    />
                                </div>
                                <div className={styles.form_link_container}>
                                    <Link to="/login/forgot">Esqueceu a senha?</Link>
                                </div>

                                {messageLog && (
                                    <Message data={messageLog} handleMessage={setMessageLog} />
                                )}

                                <div className={styles.form_input_container}>
                                    <SubmitButton text="Login" handleSubmit={submit} />
                                </div>
                            </form>
                        </div>
                        <div className={styles.login_sign}>
                            <p>
                                Não tem uma conta? <Link to="/signup">Junte-se</Link>
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
            <div className={styles.login_container}>
                <Container>
                    <div></div>
                </Container>
            </div>
        </section>
    );
}
