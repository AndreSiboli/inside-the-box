import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import Logo from '../styles/Logo';
import Container from '../styles/Container';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.footer_container}>
                    <div className={styles.footer_links}>
                        <div className={styles.footer_group_links}>
                            <h3>Redes Sociais</h3>
                            <nav>
                                <Link to="https://www.linkedin.com/in/andr%C3%A9-siboli-81b969244">
                                    Linkedin
                                </Link>
                                <Link to="https://github.com/AndreSiboli">Github</Link>
                            </nav>
                        </div>
                        <div className={styles.footer_group_links}>
                            <h3>Menções</h3>
                            <nav>
                                <Link to="https://undraw.co/illustrations">Undraw</Link>
                                <Link to="https://pexels.com">Pexels</Link>
                            </nav>
                        </div>
                    </div>
                    <div className={styles.footer_logo}>
                        <Logo theme="light" />
                    </div>
                </div>
            </Container>
        </footer>
    );
}
