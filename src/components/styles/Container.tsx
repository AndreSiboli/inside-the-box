import { ReactElement } from 'react';
import styles from './Container.module.scss';

export default function Container({ children }: { children: ReactElement }) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
}
