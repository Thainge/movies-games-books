
import React, { useEffect, useState } from 'react';
import MovieBanner from '../../Components/BookComponents/Other/MovieBanner';
import styles from './Books.module.css';
import { ContextFunction } from '../../Contexts/ContextProvider';
import { useParams } from 'react-router-dom';
import ls from 'local-storage';
import fetchRequest from '../../hooks/addNewMovies';
import AddModal from '../../Components/BookComponents/forms/add';
import Modal from 'react-modal';

const gridImage = require('../../assets/grid.png');
const rowImage = require('../../assets/row.png');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0',
        margin: '0',
        background: 'none',
        outline: 'none',
        border: 'none',
        overflow: 'hidden',
        textAlign: 'center',
    },
};

function Books({ drawerIsOpen }) {
    const obj = ContextFunction();
    const { allBooks, isGrid, setIsGrid } = obj;
    const [loading, setLoading] = useState(false);
    let { movieFolder, id } = useParams();

    let foundIndex = 0;
    let defaultData = [];
    if (allBooks) {
        allBooks.forEach((item, index) => {
            let ItemId = item.id.toString();
            if (ItemId === id) {
                foundIndex = index;
            }
        });
    }

    if (foundIndex >= 0) {
        let ready = allBooks[foundIndex].FinishedData;
        defaultData = ready;
    }
    // Fix params movie errors

    const [filteredData, setFilteredData] = useState(defaultData);
    const [pureData, setPureData] = useState(defaultData);

    useEffect(() => {
        setFilteredData(defaultData);
        setPureData(defaultData);
    }, [allBooks])

    const filterDataFunction = (e) => {
        e.preventDefault();
        let term = e.target.value.toLowerCase();
        let newData = pureData.filter(item => item.title.toLowerCase().includes(term));
        setFilteredData(newData);
    }

    const addModalPopup = async () => {

    }

    function getWindowDimensions() {
        const width = window.innerWidth
        const height = window.innerHeight
        return {
            width,
            height
        };
    }

    const [MediaBelow, setMediaBelow] = useState(false);

    const updateScreenWidth = () => {
        const width = window.innerWidth;
        if (width > 778) {
            setMediaBelow(() => false);
        }
        if (width < 778) {
            setMediaBelow(() => true);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', updateScreenWidth);
        const width = window.innerWidth;
        if (width > 778) {
            setMediaBelow(() => false);
        }
        if (width < 778) {
            setMediaBelow(() => true);
        }
        return () => window.removeEventListener('resize', updateScreenWidth);
    }, [])

    const [addModalState, setAddModalState] = useState(false);
    const openModal = () => {
        setAddModalState(true);
    }

    return (
        <div className={`${styles.Container} ${drawerIsOpen && !MediaBelow ? styles.drawerOpen : styles.normal} ${MediaBelow && !isGrid ? styles.fullWidth : styles.nothing}`}>
            <h1 className={styles.header}>{movieFolder}</h1>
            <div className={styles.containerInput}>
                <input onChange={filterDataFunction} placeholder='Search' type={'search'} className={styles.searchInput}></input>
                <div onClick={openModal} title='Select Directory' htmlFor="file-input" className={styles.fileText}>
                    <img src={require('../../assets/add.png')} className={styles.reload}></img>
                    <div className={styles.text}>Add Books</div>
                </div>
                <div className={styles.disabledInput} id="file-input" />
            </div>
            <div className={styles.MoviesPapa}>
                <div className={styles.buttonBox}>
                    <img onClick={() => setIsGrid((prev) => !prev)} src={isGrid ? gridImage : rowImage} className={styles.button} />
                </div>
                <div className={`${styles.MoviesContainer} ${isGrid ? styles.grid : styles.row}`}>
                    {
                        loading
                            ? <img src={require('../../assets/loading.gif')} className={styles.imageLoading}></img>
                            : filteredData.map((item, index) =>
                                <MovieBanner key={index} isGrid={isGrid} item={item} />
                            )
                    }
                </div>
            </div>
            <Modal
                isOpen={addModalState}
                onRequestClose={() => setAddModalState(false)}
                style={customStyles}
                overlayClassName={styles.overlay}
                contentLabel="Example Modal"
            >
                {
                    addModalState ? <AddModal setAddModalState={setAddModalState} adding={true} /> : <></>
                }
            </Modal>
        </div>
    );
}

export default Books;