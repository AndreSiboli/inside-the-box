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

export default function Input(props: PropTypes) {
    const { text, type, id, value, handleInput} = props;

    return (
        <div className={`${styles.input_container}`}>
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
