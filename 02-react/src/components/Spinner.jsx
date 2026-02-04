import styles from './Spinner.module.css'

export function Spinner() {
    return (
        <div className={styles.spinner}>
            <div className={styles.circle} />
            <p className={styles.text}>Cargando empleos...</p>
        </div>

    )
}