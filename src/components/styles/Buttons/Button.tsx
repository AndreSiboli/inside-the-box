import styles from './Button.module.scss';

interface PropTypes{
    text: string,
    handleRefresh: Function,
}

export default function Button(props: PropTypes) {
    const { text, handleRefresh } = props;
    return <button className={styles.button} onClick={()=>handleRefresh()}>{text}</button>;
}
