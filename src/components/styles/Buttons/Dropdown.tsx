import { Link } from 'react-router-dom';
import styles from './Dropdown.module.scss';
import { FaUser, FaAngleDown, FaDoorOpen } from 'react-icons/fa';

interface PropTypes {
    user: string;
}

export default function Dropdown(props: PropTypes) {
    const { user } = props;

    return (
        <div className={styles.dropdown}>
            <p>
                <span>
                    <FaUser /> {user}
                </span>
                <span>
                    <FaAngleDown />
                </span>
            </p>
            <div className={styles.dropdown_child_container}>
                <div className={styles.dropdown_child}>
                    <div className={styles.dropdown_child_link}>
                        <Link to="/profile">Profile</Link>
                    </div>
                    <div className={styles.dropdown_child_link}>
                        <Link to="/logout">
                            <span>
                                <FaDoorOpen /> Logout
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
