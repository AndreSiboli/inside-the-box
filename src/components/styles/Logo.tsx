import { Link } from 'react-router-dom';
import { FaBoxOpen } from 'react-icons/fa';
import styles from './Logo.module.scss';

interface PropTypes {
    theme: string;
}

export default function Logo(props: PropTypes) {
    const { theme } = props;

    return (
        <div className={`${styles.logo} ${styles[theme]}`}>
            <Link to="/">
                <h1>
                    <span>Inside</span>
                    <span>
                        The <FaBoxOpen />
                    </span>
                </h1>
            </Link>
        </div>
    );
}
