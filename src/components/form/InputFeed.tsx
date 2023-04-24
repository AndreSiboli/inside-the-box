import { useEffect, useState } from 'react';
import { checkEmail, checkName, checkPassword } from '../../utils/checkInput';
import styles from './Input.module.scss';

interface PropTypes {
    text: string;
    type: string;
    id: string;
    value: string;
    handleInput: Function;
}

export default function InputFeed(props: PropTypes) {
    const { text, type, id, value, handleInput } = props;
    const [feed, setFeed] = useState(false);

    useEffect(() => {
        const name = id;
        let result: string | boolean = false;

        if (name === 'name') result = checkName(value);
        else if (name === 'email') result = checkEmail(value);
        else if (name === 'password') result = checkPassword(value);
        else if (name === 'repassword') result = checkPassword(value);

        if(value === '') {
            setFeed(false)
            return
        }
        if (!result){ 
            setFeed(true)
            return
        }
        setFeed(false);
        
       
    }, [value]);

    return (
        <div
            className={
                !feed
                    ? `${styles.input_container}`
                    : `${styles.input_container} ${styles.input_feed}`
            }
        >
            <input
                type={type}
                value={value}
                id={id}
                name={id}
                required
                onChange={({ target }: any) => {
                    handleInput({ target });
                }}
            />
            <label htmlFor={id}>{text}</label>
        </div>
    );
}
