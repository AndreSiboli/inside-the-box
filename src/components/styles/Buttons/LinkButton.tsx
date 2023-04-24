import { Link } from 'react-router-dom';
import styles from './LinkButton.module.scss';

interface PropTypes {
    to: string;
    text: string;
}

export default function LinkButton(props: PropTypes) {
    const { to, text } = props;
    return <Link to={to} className={styles.linkButton}>{text}</Link>;
}
