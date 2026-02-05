import styles from './Loading.module.css'

export function Spinner({ text = 'Cargando...' }) {
    return (
        <div className={styles.spinner}>
            <div className={styles.circle} />
            <p className={styles.text}>{text}</p>
        </div>

    )
}