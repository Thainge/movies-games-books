import React from 'react';
import { ContextFunction } from '../../../Contexts/ContextProvider';
import localStorage from 'local-storage';
import styles from './form.module.css';

function DeleteModal({ setDeleteIsOpen, item, index }) {
    const obj = ContextFunction();
    const { allFolders, setAllFolders } = obj;

    function closeDelete() {
        setDeleteIsOpen(false);
    }

    const deleteFolder = () => {
        const reducedArr = [...allFolders];
        reducedArr.splice(index, 1);
        setAllFolders(reducedArr);
        localStorage.set('movies', reducedArr);
        closeDelete();
    }

    return (
        <form className={styles.flexCenter}>
            <div className={styles.white}>Are you sure you want to delete {item.folderName}?</div>
            <div className={styles.buttonsContainer}>
                <div className={styles.edit} onClick={closeDelete}>Cancel</div>
                <div className={styles.delete} onClick={deleteFolder}>Delete</div>
            </div>
        </form>
    );

}

export default DeleteModal;
