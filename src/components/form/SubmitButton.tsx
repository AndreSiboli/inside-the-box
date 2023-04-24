import styles from './SubmitButton.module.scss';

interface PropTypes {
    text: string;
    handleSubmit: Function;
}

export default function SubmitButton(props: PropTypes) {
    const { text, handleSubmit } = props;

    function submit(e: any) {
        handleSubmit(e)
    }
    return (
        <button type="submit" className={styles.submitButton} onClick={(e) => submit(e)}>
            {text}
        </button>
    );
}
