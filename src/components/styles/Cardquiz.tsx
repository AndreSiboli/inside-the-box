import { Link } from 'react-router-dom';
import { ReactElement } from 'react';
import styles from './Cardquiz.module.scss';

interface PropTypes {
    image: ReactElement;
    title: string;
    text: string;
    to: string;
}

export default function Cardquiz(props: PropTypes) {
    const { image, title, text, to } = props;
    return (
        <Link to={to} className={styles.card_container}>
            <div className={styles.card_wrapper}>
                <div className={styles.card_image}>{image}</div>
                <div className={styles.card_title}>
                    <h3>{title}</h3>
                </div>
            </div>
            <div className={styles.card_text}>
                <p>{text}</p>
            </div>
        </Link>
    );
}
