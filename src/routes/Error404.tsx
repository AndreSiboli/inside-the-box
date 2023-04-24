import { useEffect, useState } from 'react';
import styles from './Error404.module.scss';

//------------------------------------- Components -------------------------------------
import Navbar from '../components/bars/Navbar';
import Container from '../components/styles/Container';
import Footer from '../components/bars/Footer';

//------------------------------------- Images -------------------------------------
import space from '../assets/svg/error404/space.svg';
import blank from '../assets/svg/error404/blank.svg';
import notFound from '../assets/svg/error404/notFound.svg';
import spaceship from '../assets/svg/error404/spaceship.svg';
import box from '../assets/svg/error404/box.svg';

export default function Error404() {
    const [svg, setSvg] = useState<string>();

    useEffect(() => {
        const svgs = [space, blank, notFound, spaceship, box];
        const randomNum = Math.round(Math.random() * 4);
        const chosenSvg = svgs[randomNum];
        setSvg(chosenSvg);
    }, []);

    return (
        <>
            <Navbar />
            <div className={styles.notFound}>
                <Container>
                    <div className={styles.notFound_container}>
                        <div className={styles.notFound_image}>
                            <img src={svg} alt="" />
                        </div>
                        <div className={styles.notFound_text}>
                            <h1>Página não encontrada</h1>
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
}
