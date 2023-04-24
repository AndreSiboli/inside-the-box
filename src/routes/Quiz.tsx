import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

//------------------------------------- Components -------------------------------------
import QuizContainer from '../components/quiz/QuizContainer';
import Button from '../components/styles/Buttons/Button';
import Container from '../components/styles/Container';
import styles from './Quiz.module.scss';
import { FaArrowLeft } from 'react-icons/fa';

import { requestQuestion, requestQuestions } from '../utils/requests';

interface QuestionTypes {
    _id: string;
    question: string;
    answers: {
        _id: string;
        text: string;
    }[];
}

export default function Quiz() {
    const { category } = useParams();
    const Navigator = useNavigate();
    const [idQuestions, setIdQuestion] = useState<string[] | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<QuestionTypes | null>(null);
    const [howManyQuest, setHowManyQuest] = useState<number>(0);
    const [points, setPoints] = useState(0);
    const [finishedGame, setFinishedGame] = useState(false);
    const [game, setGame] = useState<string | null>(null);

    useEffect(() => {
        if (category === 'history') setGame('História');
        else if (category === 'games') setGame('Games');
        else if (category === 'geography') setGame('Geografia');
        else if (category === 'bible') setGame('Bíblia');
        else if (category === 'daily') setGame('Cotidiano');
        else if (category === 'science') setGame('Ciência');
        else setGame('Quiz não encontrado');
        reqQuestions();
    }, []);

    useEffect(() => {
        if (!idQuestions) return;
        if (idQuestions.length === 0) return setCurrentQuestion(null);
        reqQuestion();
    }, [idQuestions]);

    const observerPoints = (res: boolean) => {
        if (!res) setPoints(points);
        else setPoints(points + 1);

        if (!idQuestions) return;

        const arr = [...idQuestions];
        arr.shift();
        setIdQuestion(arr);

        if (arr.length === 0) return setFinishedGame(true);
    };

    const reqQuestion = async () => {
        if (!idQuestions || !category) return;

        const data = {
            id: idQuestions[0],
            category,
        };

        const ret = await requestQuestion(data);
        const { question } = ret;

        if (!question) return;
        setCurrentQuestion(question);
    };

    const reqQuestions = async () => {
        if (!category) return;
        const ret = await requestQuestions(category);
        const { restrict = null, redirect = null, questions = null } = ret;

        if (restrict === false) location.replace('/logout');
        if (redirect) location.replace('/notfound');
        if (!questions) return;

        const arrQuest: string[] = [];
        questions.forEach((question: { _id: string }) => {
            arrQuest.push(question._id);
        });

        setIdQuestion(arrQuest);
        setHowManyQuest(questions.length);
    };

    function quizExit() {
        const con = confirm('Tem certeza que deseja sair?\nTodo o progressos será perdido');
        if (con) {
            Navigator('/');
        }
    }

    return (
        <section className={styles.quiz}>
            <Container>
                <div className={styles.quiz_container}>
                    <div className={styles.quiz_exit}>
                        <p onClick={quizExit}>
                            <>
                                <FaArrowLeft />
                                Voltar ao menu
                            </>
                        </p>
                    </div>
                    <div className={styles.quiz_wrapper}>
                        <h1>{game}</h1>
                        {currentQuestion && (
                            <QuizContainer
                                dataQuest={currentQuestion}
                                handlePoints={observerPoints}
                            />
                        )}

                        {!currentQuestion && !finishedGame && (
                            <div className={styles.load_container}>
                                <div className={styles.load}></div>
                            </div>
                        )}
                        {finishedGame && (
                            <div className={styles.quiz_points_container}>
                                <div className={styles.quiz_points_wrapper}>
                                    <div></div>
                                    <div className={styles.quiz_points_text}>
                                        <p>
                                            Sua pontuação foi: {points}/{howManyQuest}
                                        </p>
                                    </div>
                                    <div className={styles.quiz_points_button}>
                                        <Link to="/">Quizes</Link>
                                        <div className={styles.button_container}>
                                            <Button
                                                text="Refazer"
                                                handleRefresh={function refresh() {
                                                    Navigator(0)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
}
