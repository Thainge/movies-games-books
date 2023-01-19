import React from 'react';
import { ContextFunction } from '../../../Contexts/ContextProvider';
import localStorage from 'local-storage';
import styles from './form.module.css';

function DeleteModal({ setDeleteIsOpen, item, index }) {
    const obj = ContextFunction();
    const { allBooks, setAllBooks } = obj;

    function closeDelete() {
        setDeleteIsOpen(false);
    }

    const deleteFolder = () => {
        const reducedArr = [...allBooks];
        reducedArr.splice(index, 1);
        setAllBooks(reducedArr);
        localStorage.set('books', reducedArr);
        closeDelete();
    }

    return (
        <form className={styles.flexCenterGame}>
            <div className={styles.white}>Are you sure you want to delete {item.folderName}?</div>
            <div className={styles.buttonsContainer}>
                <div className={styles.edit} onClick={closeDelete}>Cancel</div>
                <div className={styles.delete} onClick={deleteFolder}>Delete</div>
            </div>
        </form>
    );

}

export default DeleteModal;
