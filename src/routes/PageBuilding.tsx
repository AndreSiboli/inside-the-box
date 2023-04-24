import { useEffect, useState } from 'react';
import styles from './PageBuilding.module.scss';

//------------------------------------- Components -------------------------------------
import Navbar from '../components/bars/Navbar';
import Footer from '../components/bars/Footer';
import Container from '../components/styles/Container';

//------------------------------------- Images -------------------------------------
import house from '../assets/svg/pagebuild/house.svg';
import buildPage from '../assets/svg/pagebuild/buildPage.svg';
import groupBuild from '../assets/svg/pagebuild/groupBuild.svg';
import designPage from '../assets/svg/pagebuild/designPage.svg';

export default function PageBuilding() {
    const [svg, setSvg] = useState<string>();

    useEffect(() => {
        const svgs = [house, buildPage, groupBuild, designPage];
        const randomNum = Math.round(Math.random() * 3);
        const chosenSvg = svgs[randomNum];
        setSvg(chosenSvg);
    }, []);

    return (
        <>
            <Navbar />
            <div className={styles.pageBuilding}>
                <Container>
                    <div className={styles.pageBuilding_container}>
                        <div className={styles.pageBuilding_image}>
                            <img src={svg} alt="" />
                        </div>
                        <div className={styles.pageBuilding_text}>
                            <h1>Página em construção</h1>
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
}
