import styles from './Home.module.scss';

//------------------------------------- Components -------------------------------------
import Container from '../components/styles/Container';
import Cardquiz from '../components/styles/Cardquiz';
import Navbar from '../components/bars/Navbar';
import Footer from '../components/bars/Footer';

//------------------------------------- Images -------------------------------------

import {
    FaCross,
    FaGlobeAmericas,
    FaBookDead,
    FaGamepad,
    FaRegSmileBeam,
    FaMoon,
    FaAtlas,
} from 'react-icons/fa';
import aboutSvg from '../assets/home/love.svg';
import creatorSvg from '../assets/home/dev.svg';
import LinkButton from '../components/styles/Buttons/LinkButton';

export default function Home() {
    const quizes = [
        {
            image: <FaCross />,
            title: 'Biblía',
            text: 'Você é um leitor assíduo da palavra?',
            to: 'quiz/bible',
        },
        {
            image: <FaBookDead />,
            title: 'História',
            text: 'Você conhece a história por trás dos acontecimentos?',
            to: 'quiz/history',
        },
        {
            image: <FaGlobeAmericas />,
            title: 'Geografia',
            text: 'Conhece algo além do país que mora?',
            to: 'quiz/geography',
        },
        {
            image: <FaGamepad />,
            title: 'Games',
            text: 'Você está pronto para uma aventura hardmode?',
            to: 'quiz/games',
        },
        {
            image: <FaRegSmileBeam />,
            title: 'Cotidiano',
            text: 'Você sabe coisas comuns em um mundo nada comum?',
            to: 'quiz/daily',
        },
        {
            image: <FaMoon />,
            title: 'Ciência',
            text: 'Se a terra já está fácil, esse quiz é para você.',
            to: 'quiz/science',
        },
        {
            image: <FaAtlas />,
            title: 'Em breve',
            text: 'O que será que vem por aí?',
            to: '/',
        },
        {
            image: <FaAtlas />,
            title: 'Em breve',
            text: 'O que será que vem por aí?',
            to: '/',
        },
    ];

    return (
        <>
            <Navbar />
            <main className={styles.home} id="quizes">
                <Container>
                    <div className={styles.home_container}>
                        {quizes.map((quiz, index) => (
                            <Cardquiz
                                image={quiz.image}
                                title={quiz.title}
                                text={quiz.text}
                                to={quiz.to}
                                key={index}
                            />
                        ))}
                    </div>
                </Container>
            </main>
            <section className={styles.about} id="about">
                <Container>
                    <div className={styles.about_container}>
                        <div className={styles.about_title}>
                            <h2>Sobre</h2>
                        </div>
                        <div className={styles.about_content}>
                            <div className={styles.about_content_text}>
                                <p>
                                    Bem vindo ao <span>Inside the Box!</span> Aqui você encontrará
                                    uma maneira divertida e desafiadora de testar seus conhecimentos
                                    e habilidades em diversos assuntos. Nossa plataforma de quiz foi
                                    projetada para mantê-lo entretido e engajado, enquanto você
                                    aprende algo novo a cada pergunta respondida.
                                    <br /> <br />
                                    Não importa se você é um especialista em ciência, história,
                                    cultura pop ou qualquer outro tema, o{' '}
                                    <span>Inside the Box</span> tem algo para todos. Com perguntas
                                    cuidadosamente selecionadas e diversas opções de categorias, há
                                    sempre algo novo para aprender e descobrir.
                                    <br /> <br />
                                    Então, junte-se a nós nesta jornada de diversão e conhecimento.
                                    Desafie-se e veja até onde você pode chegar pensando{' '}
                                    <span>Inside the Box</span>.
                                    <br /> <br />
                                    Site ainda em construção!
                                </p>
                            </div>
                            <div className={styles.about_content_image}>
                                <img src={aboutSvg} alt="" />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
            <section className={styles.creator}>
                <Container>
                    <div className={styles.creator_container}>
                        <div className={styles.creator_title}>
                            <h2>Criador</h2>
                        </div>
                        <div className={styles.creator_content}>
                            <div className={styles.creator_content_image}>
                                <img src={creatorSvg} alt="" />
                            </div>
                            <div className={styles.creator_content_wrapper}>
                                <p>
                                    Olá, meu nome é André Siboli e é um prazer poder me apresentar
                                    para você. Sou um profissional dedicado, apaixonado pelo que
                                    faço e sempre em busca de novos desafios.
                                    <br /> <br />
                                    Formado em Análise e Desenvolvimento de Sistema. Sempre tive um
                                    interesse especial por tecnologia, o que me levou a buscar
                                    conhecimento em programação e desenvolvimento de software.
                                    <br /> <br />
                                    Sei que ainda tenho muito a aprender e a desenvolver, mas estou
                                    sempre disposto a encarar novos desafios e a buscar o
                                    aperfeiçoamento constante. Acredito que é assim que se constrói
                                    uma carreira sólida.
                                    <br /> <br />
                                </p>
                                <div className={styles.creator_button}>
                                    <div className={styles.creator_button_container}>
                                        <LinkButton
                                            to="https://andresiboli.github.io/portifolio"
                                            text="Portifólio"
                                        />
                                    </div>
                                    <div className={styles.creator_button_container}>
                                        <LinkButton
                                            to="https://github.com/AndreSiboli"
                                            text="Github"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
            <Footer />
        </>
    );
}
