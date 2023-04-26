import styles from './Navbar.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/Auth';

//------------------------------------- Components -------------------------------------
import Container from '../styles/Container';
import LinkButton from '../styles/Buttons/LinkButton';
import Dropdown from '../styles/Buttons/Dropdown';
import Logo from '../styles/Logo';

export default function Navbar() {
    const { user }: any = useContext(AuthContext);
    const [userName, setUserName] = useState<string>('');
    const [active, setActive] = useState(false);
    const { pathname, hash } = useLocation();
    const Navigator = useNavigate();

    useEffect(() => {
        let myUser = { name: '' };
        if (user) {
            if (typeof user === 'string') myUser = JSON.parse(user).name;
            else if (typeof user === 'object') myUser = user;
            setUserName(myUser.name);
        } else setUserName('');
    }, [user]);

    useEffect(() => {
        if (active) {
            document.body.style.overflow = 'hidden';
            return;
        }
        document.body.style.overflow = 'auto';
    }, [active]);

    function minimize() {
        console.log(active);
        if (window.innerWidth >= 768 && active) {
            setActive(false);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', minimize);

        return () => {
            window.removeEventListener('resize', minimize);
        };
    }, [active]);

    useEffect(()=>{
        const url = '/';
        console.log(pathname)
        if (pathname === url && hash) {
            const getEl = document.querySelector(hash);
            if (!getEl) return;
            
            getEl.scrollIntoView()
            Navigator('/')
        }
        
    },[pathname, hash])


    return (
        <header className={!active ? `${styles.header}` : `${styles.header} ${styles.active}`}>
            <Container>
                <div className={styles.header_container}>
                    <div className={styles.header_logo}>
                        {!active ? <Logo theme="light" /> : <Logo theme="blueish" />}
                    </div>

                    <div className={styles.hamburger} onClick={() => setActive(!active)}>
                        <span className={styles.trace}></span>
                        <span className={styles.trace}></span>
                    </div>

                    <nav className={styles.header_links}>
                        <div className={styles.header_linksWrapper}>
                            <div className={styles.header_groupLinks}>
                                <div className={styles.link_container}>
                                    <Link to="/#quizes" >
                                        Quizes
                                    </Link>
                                </div>
                                <div className={styles.link_container}>
                                    <Link to="/#about" >Sobre</Link>
                                </div>
                                <div className={styles.link_container}>
                                    <Link to="/#creator" >Criador</Link>
                                </div>
                            </div>
                            {!userName ? (
                                <div className={styles.header_groupLinks}>
                                    <div className={styles.link_container}>
                                        <Link to="login">Login</Link>
                                    </div>
                                    <div
                                        className={`${styles.link_container} ${styles.noEffect_link}`}
                                    >
                                        <LinkButton to="signup" text="Sign up" />
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.header_groupLinks}>
                                    <div
                                        className={`${styles.link_container} ${styles.link_profile}`}
                                    >
                                        <Dropdown user={userName} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </Container>
        </header>
    );
}
