import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import { Link, useParams } from "react-router-dom";
import localStorage from 'local-storage';
import styles from './MovieBanner.module.css';
import { ContextFunction } from '../../../Contexts/ContextProvider';

function MovieBanner({ item, isGrid }) {
    const obj = ContextFunction();
    const { allFolders, setAllFolders } = obj;

    let { id } = useParams();

    const [hovering, setHovering] = useState(false);

    const deleteItem = () => {
        let currentFolders = [...allFolders];

        let ItemId = item.id;
        let foundIndex = 0;
        currentFolders[id - 1].FinishedData.forEach((item, index) => {
            if (ItemId === item.id) {
                foundIndex = index;
            }
        });

        currentFolders[id - 1].FinishedData.splice(foundIndex, 1);
        setAllFolders(currentFolders);
        localStorage.set('movies', currentFolders);
    }

    return (
        <Fade duration={300}>
            {
                isGrid
                    ? <div className={styles.linker}>
                        <div className={styles.posterContainer} onMouseOut={() => setHovering(false)} onMouseOver={() => setHovering(true)}>
                            {
                                hovering ? <Fade duration={300}>
                                    <img onClick={deleteItem} src={require('../../../assets/delete.png')} className={styles.delete} />
                                </Fade> : <></>
                            }
                            <Link to={`${item.id}`} className={styles.posterLink}>
                                <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} className={styles.poster} />
                                <h1 className={styles.posterHeader}>{item.title}</h1>
                            </Link>
                        </div>
                    </div>
                    : <div className={styles.linker} >
                        <div className={styles.rowPosterContainer} onMouseOut={() => setHovering(false)} onMouseOver={() => setHovering(true)}>
                            {
                                hovering ? <Fade duration={300}>
                                    <img onClick={deleteItem} src={require('../../../assets/delete.png')} className={styles.delete} />
                                </Fade> : <></>
                            }
                            <Link to={`${item.id}`} className={styles.rowPosterLink}>
                                <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} className={styles.rowPoster} />
                                <h1 className={styles.rowPosterHeader}>{item.title}</h1>
                                <h1 className={styles.rowPosterTime}>{item.IMDBdata.runtime}</h1>
                                <div className={styles.starContainer}><img className={styles.star} src={require('../../../assets/star.png')} />IMDB: <div className={styles.extra}>{item.IMDBdata.rating}</div></div>
                                <div className={styles.starContainer}><img className={styles.star} src={require('../../../assets/star.png')} />TMDB: <div className={styles.extra}>{item.vote_average}</div></div>
                            </Link>
                        </div>
                    </div>
            }
        </Fade>
    );
}

export default MovieBanner;
