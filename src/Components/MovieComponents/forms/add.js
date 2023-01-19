import { format } from 'date-fns';
import React, { useState } from 'react';
import { ContextFunction } from '../../../Contexts/ContextProvider';
import localStorage from 'local-storage';
import styles from './form.module.css';
import fetchRequest from '../../../hooks/addNewMovies';

function AddModalMovies({ setAddModalState }) {
    const obj = ContextFunction();
    const { allFolders, setAllFolders } = obj;

    function closeModal() {
        setAddModalState(false);
        setCurrentMoviesData([]);
        setText('');
        setSuccess({
            success: false,
            itemCount: 0,
        })
    }

    function SubmitEverything(e) {
        e.preventDefault();

        const date = format(new Date(), 'M/dd/yyyy');
        let newID = (allFolders.length + 1);
        const ReadyData = [
            ...allFolders,
            {
                id: newID,
                folderName: text,
                date: date,
                FinishedData: currentMoviesData,
            }
        ];
        console.log(ReadyData)
        setAllFolders(ReadyData);
        localStorage.set('movies', ReadyData);
        closeModal();
    }

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [currentMoviesData, setCurrentMoviesData] = useState([]);
    const [text, setText] = useState('');

    const fileInput = async () => {
        let allMovieStrings = [];
        const dirHandle = await window.showDirectoryPicker({ mode: "read" });
        for await (const entry of dirHandle.values()) {
            let movieString = entry.name;
            allMovieStrings.push(movieString);
        }
        setLoading((prev) => {
            return true;
        });
        const readyForData = await fetchRequest(allMovieStrings);
        setLoading((prev) => {
            return false;
        });
        setSuccess((prev) => {
            return {
                success: true,
                itemCount: readyForData.length,
            }
        })
        setCurrentMoviesData(readyForData);
    }

    return (
        <form className={styles.flexCenterMovie} onSubmit={SubmitEverything}>
            <div className={styles.formContainer}>
                <div className={styles.textContainer}>
                    <label htmlFor="text" className={styles.nameText}>
                        Name:
                    </label>
                    <input type="text" required onChange={(e) => setText(e.target.value)} placeholder={'Name'} className={styles.nameInput} />
                </div>
                <div className={styles.imageUploadContainer}>
                    <div className={styles.textInfo}>Files must be put into the correct format containing exact movie name and year, for instance, "Iron Man (2008).mp4"</div>
                    <div onClick={fileInput} title='Select Directory' className={styles.fileText}>
                        <img src={require('../../../assets/upload.png')} className={styles.imageUpload}></img>
                        {
                            success.success ? <div className={styles.success}>Selected {success.itemCount} items</div> : <div className={styles.text}>Select Directory</div>
                        }
                    </div>
                </div>
            </div>
            {
                loading ? <div className={styles.loadingBox}>
                    <img src={require('../../../assets/loading.gif')} className={styles.imageLoading}></img>
                </div> : <></>
            }
            <div className={styles.buttonsContainer}>
                <div className={styles.delete} onClick={closeModal}>Cancel</div>
                <input type={'submit'} className={`${loading ? styles.disabledEdit : styles.edit}`} value="Submit" />
            </div>
        </form>
    );
}

export default AddModalMovies;