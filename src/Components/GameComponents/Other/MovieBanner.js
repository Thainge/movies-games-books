import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import { Link, useParams } from "react-router-dom";
import localStorage from 'local-storage';
import styles from './MovieBanner.module.css';
import { ContextFunction } from '../../../Contexts/ContextProvider';

function MovieBanner({ item, isGrid }) {
    const obj = ContextFunction();
    const { allGames, setAllGames } = obj;

    let { id } = useParams();

    const [hovering, setHovering] = useState(false);

    const deleteItem = () => {
        let currentGames = [...allGames];

        let foundIndex = 0;
        currentGames.forEach((item, index) => {
            let itemID = item.id.toString();
            let otherID = id.toString();
            if (itemID === otherID) {
                foundIndex = index;
            }
        });

        let newData = currentGames[foundIndex].FinishedData;
        let deleteIndex = 0;
        newData.forEach((forItem, index) => {
            if (forItem.id === item.id) {
                deleteIndex = index;
            }
        });

        newData.splice(deleteIndex, 1);
        setAllGames(currentGames);
        localStorage.set('games', currentGames);
    }

    return (
        <Fade duration={300}>
            {
                isGrid
                    ? <div className={styles.linker} >
                        <div className={styles.posterContainer} onMouseOut={() => setHovering(false)} onMouseOver={() => setHovering(true)}>
                            {
                                hovering ? <Fade duration={300}>
                                    <img onClick={deleteItem} src={require('../../../assets/delete.png')} className={styles.delete} />
                                </Fade> : <></>
                            }
                            <a href={item.link} className={styles.posterLink}>
                                <div className={styles.posterBox}>
                                    <img src={item.header} target='blank_' className={styles.poster} />
                                </div>
                                <h1 className={styles.posterHeader}>{item.title}</h1>
                            </a>
                        </div>
                    </div>
                    : <div className={styles.linker} >
                        <div className={styles.rowPosterContainer} onMouseOut={() => setHovering(false)} onMouseOver={() => setHovering(true)}>
                            {
                                hovering ? <Fade duration={300}>
                                    <div className={styles.deleteText} onClick={deleteItem}>✕</div>
                                </Fade> : <></>
                            }
                            <a href={item.link} className={styles.rowPosterLink} target='blank_'>
                                <img src={item.header} className={styles.rowPoster} />
                                <h1 className={styles.rowPosterHeader}>{item.title}</h1>
                            </a>
                        </div>
                    </div>
            }
        </Fade>
    );
}

export default MovieBanner;
