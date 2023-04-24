import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Auth';
import styles from './Signup.module.scss';

import InputFeed from '../components/form/InputFeed';
import SubmitButton from '../components/form/SubmitButton';
import Container from '../components/styles/Container';
import Logo from '../components/styles/Logo';
import { sendSignup } from '../utils/requests';
import { checkEmail, checkName, checkPassword } from '../utils/checkInput';
import Message from '../components/styles/Message';

interface MessageProps {
    text: string;
    isEnable: string;
}

export default function Login() {
    const { user }: any = useContext(AuthContext);
    const Navigator = useNavigate();
    const [messageLog, setMessageLog] = useState<MessageProps | false>(false);
    const [infoUser, setInfoUser] = useState({
        name: '',
        email: '',
        password: '',
        repassword: '',
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
            repassword: infoUser.repassword,
            name: infoUser.name,
        };

        const name = checkName(user.name);
        const email = checkEmail(user.email);
        const password = checkPassword(user.password);

        if (!name) {
            return setMessageLog({
                text: 'Nome inválido. Não use números, caracteres especiais ou espaço',
                isEnable: 'err',
            });
        }
        if (!email) {
            return setMessageLog({ text: 'Email inválido. Ex: nome@domain.com', isEnable: 'err' });
        }
        if (!password) {
            return setMessageLog({ text: 'Senha inválida. Ex: Algo898@', isEnable: 'err' });
        }
        if (user.password !== user.repassword) {
            return setMessageLog({ text: 'As senhas não coincidem', isEnable: 'err' });
        }

        const signupRet = await sendSignup(user);

        if (signupRet.logErr) {
            //do something
            console.log(signupRet.logErr);
            return;
        }
        if (signupRet.redirect) Navigator('/login');
    };

    return (
        <section className={styles.login}>
            <div className={styles.login_container}>
                <Container>
                    <div></div>
                </Container>
            </div>
            <div className={styles.login_container}>
                <Container>
                    <div className={styles.login_wrapper}>
                        <div>
                            <Logo theme="dark" />
                        </div>
                        <div className={styles.login_main}>
                            <div className={styles.login_merchan}>
                                <h3>Sign up</h3>
                                <p>Está pronto para pensar dentro da caixa?</p>
                            </div>

                            <form className={styles.form}>
                                <div className={styles.form_input_container}>
                                    <InputFeed
                                        text="Name"
                                        type="text"
                                        id="name"
                                        value={infoUser.name}
                                  
                                        handleInput={(e: any) => {
                                            updateInput(e);
                                        }}
                                    />
                                </div>
                                <div className={styles.form_input_container}>
                                    <InputFeed
                                        text="Email"
                                        type="email"
                                        id="email"
                                        value={infoUser.email}
                                       
                                        handleInput={(e: any) => {
                                            updateInput(e);
                                        }}
                                    />
                                </div>
                                <div
                                    className={`${styles.form_input_container} ${styles.form_password_container}`}
                                >
                                    <InputFeed
                                        text="Password"
                                        type="password"
                                        id="password"
                                        value={infoUser.password}
                                       
                                        handleInput={(e: any) => {
                                            updateInput(e);
                                        }}
                                    />
                                    <InputFeed
                                        text="Re-password"
                                        type="password"
                                        id="repassword"
                                        value={infoUser.repassword}
                                      
                                        handleInput={(e: any) => {
                                            updateInput(e);
                                        }}
                                    />
                                </div>
                                <p className={styles.rule}>Ao menos um caractere maiúsculo, minusculo, número, especial{"(-_*@#&)"} e 8 ou mais digítos</p>
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
                                Já tem uma conta? <Link to="/login">Conectar-se</Link>
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    );
}
