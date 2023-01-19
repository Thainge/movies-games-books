import styles from './inputItem.module.css';

function InputItem({ item, index, deleteInputItem }) {
    return (
        <div className={styles.resultItem}>
            <div className={styles.number}>{index + 1}</div>
            <div className={styles.text}>
                <div className={styles.itemText}>
                    - {item.name}
                </div>
            </div>
            <div className={styles.delete} onClick={() => deleteInputItem(index)}>✕</div>
        </div>
    )
}

export default InputItem;