
import React, { useEffect, useState } from 'react';
import MovieBanner from '../../Components/MovieComponents/Other/MovieBanner';
import styles from './Movies.module.css';
import { ContextFunction } from '../../Contexts/ContextProvider';
import { useParams } from 'react-router-dom';
import ls from 'local-storage';
import fetchRequest from '../../hooks/addNewMovies';

const gridImage = require('../../assets/grid.png');
const rowImage = require('../../assets/row.png');

function Movies({ drawerIsOpen }) {
    const obj = ContextFunction();
    const { allFolders, isGrid, setIsGrid } = obj;
    const [loading, setLoading] = useState(false);
    let { movieFolder, id } = useParams();

    let foundIndex = 0;
    let defaultData = [];
    if (allFolders) {
        allFolders.forEach((item, index) => {
            let ItemId = item.id.toString();
            if (ItemId === id) {
                foundIndex = index;
            }
        });
    }

    if (foundIndex >= 0) {
        let ready = allFolders[foundIndex].FinishedData;
        defaultData = ready;
    }
    // Fix params movie errors

    const [filteredData, setFilteredData] = useState(defaultData);
    const [pureData, setPureData] = useState(defaultData);

    useEffect(() => {
        setFilteredData(defaultData);
        setPureData(defaultData);
    }, [allFolders])

    const filterDataFunction = (e) => {
        e.preventDefault();
        let term = e.target.value.toLowerCase();
        let newData = pureData.filter(item => item.title.toLowerCase().includes(term));
        setFilteredData(newData);
    }

    const refreshMovies = async () => {
        let allMovieStrings = [];
        const dirHandle = await window.showDirectoryPicker({ mode: "read" });
        for await (const entry of dirHandle.values()) {
            let movieString = entry.name;
            allMovieStrings.push(movieString);
        }
        setLoading((prev) => true)
        const readyForData = await fetchRequest(allMovieStrings);
        setFilteredData(readyForData);
        setPureData(readyForData);

        let readyData = [...allFolders];
        readyData[foundIndex].FinishedData = readyForData;

        ls.set('movies', readyData);
        setLoading((prev) => false)
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

    return (
        <div className={`${styles.Container} ${drawerIsOpen && !MediaBelow ? styles.drawerOpen : styles.normal} ${MediaBelow && !isGrid ? styles.fullWidth : styles.nothing}`}>
            <h1 className={styles.header}>{movieFolder}</h1>
            <div className={styles.containerInput}>
                <input onChange={filterDataFunction} placeholder='Search' type={'search'} className={styles.searchInput}></input>
                <label onClick={refreshMovies} title='Select Directory' htmlFor="file-input" className={styles.fileText}>
                    <img src={require('../../assets/reload.png')} className={styles.reload}></img>
                    <div className='text'>Refresh Directory</div>
                </label>
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
        </div>

    );
}

export default Movies;