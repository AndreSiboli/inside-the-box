import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './QuizContainer.module.scss';
import Answer from './Answer';
import { verifyAnswer } from '../../utils/requests';

type ShuffledType = {
    _id: string;
    text: string;
}[];

interface PropTypes {
    dataQuest: {
        _id: string;
        question: string;
        answers: {
            _id: string;
            text: string;
        }[];
    };
    handlePoints: Function;
}

export default function QuizContainer({ dataQuest, handlePoints }: PropTypes) {
    const { question, answers, _id: idQuestion } = dataQuest;
    const letters = ['A', 'B', 'C', 'D'];
    const { category } = useParams();
    const [isVerifying, setIsVerifying] = useState(false);
    const [shuffledAnswers, setShuffledAnswers] = useState<ShuffledType | null>(null);

    useEffect(() => {
        setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
    }, [answers]);

    const handleAnswer = async (idAnswer: string) => {
        const answer = {
            idQuestion: idQuestion,
            userResponse: idAnswer,
            category: category,
        };

        setIsVerifying(true);

        setTimeout(async () => {
            const ret = await verifyAnswer(answer);
            console.log(ret, 'verify');
            if (ret.err) console.log(ret.err);
            if (dataQuest) setIsVerifying(false);
            if (!ret.response) return handlePoints(false);
            handlePoints(true);
        }, 1000);
    };

    return (
        <div className={styles.quiz_container}>
            <div className={styles.question_container}>
                <p>{question}</p>
            </div>
            <div className={styles.answer_container}>
                <div className={styles.question_wrapper}>
                    {dataQuest &&
                        shuffledAnswers &&
                        shuffledAnswers.map((ans, index) => (
                            <Answer
                                letter={letters[index]}
                                answer={ans}
                                key={ans._id + idQuestion}
                                handleAnswer={handleAnswer}
                                isCheck={isVerifying}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}
