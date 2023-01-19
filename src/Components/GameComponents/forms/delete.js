import React from 'react';
import { ContextFunction } from '../../../Contexts/ContextProvider';
import localStorage from 'local-storage';
import styles from './form.module.css';

function DeleteModal({ setDeleteIsOpen, item, index }) {
    const obj = ContextFunction();
    const { allGames, setAllGames } = obj;

    function closeDelete() {
        setDeleteIsOpen(false);
    }

    const deleteFolder = () => {
        const reducedArr = [...allGames];
        reducedArr.splice(index, 1);
        setAllGames(reducedArr);
        localStorage.set('games', reducedArr);
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
