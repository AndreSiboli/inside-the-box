import { useEffect, useState } from 'react';
import styles from './Message.module.scss';

interface PropTypes {
    data: {
        text: string;
        isEnable: string;
    };
    handleMessage: Function;
}

export default function Message({ data, handleMessage }: PropTypes) {
    const { text, isEnable } = data;
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setIsActive(true);
        var a = setTimeout(() => {
            setIsActive(false);
            handleMessage(false)
        }, 7000);

        return ()=>{
            clearTimeout(a)
        }
    }, [text]);

    return (
        <>
            {isActive && (
                <div className={`${styles.message_container} ${styles[isEnable]}`}>
                    <p>{text}</p>
                </div>
            )}
        </>
    );
}
