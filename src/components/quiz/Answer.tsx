import { useEffect, useRef, useState } from 'react';
import styles from './Answer.module.scss';

interface PropTypes {
    letter: string;
    answer: {
        _id: string;
        text: string;
    };
    handleAnswer: Function;
    isCheck: boolean
}

export default function Answer(props: PropTypes) {
    const { letter, answer, handleAnswer, isCheck } = props;
    const { _id, text } = answer;
    const [chosen, setChosen] = useState(false)
    
    const submit = () => {
        setChosen(true)
        handleAnswer(_id)
    };

    return (
        <div className={!chosen ?`${styles.answer_container}`: `${styles.answer_container} ${styles.chosen}`} onClick={!isCheck ? submit : ()=>{}}>
            <div className={styles.answer_letter}>
                <p>{letter}</p>
            </div>
            <div className={styles.answer_alternative}>
                <p>{text}</p>
            </div>
        </div>
    );
}
