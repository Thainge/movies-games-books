import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './drawerChild.module.css';

function GamesDrawerChild({ item, searchText }) {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    }

    const [shownItems, setShownItems] = useState(item.FinishedData);

    useEffect(() => {
        if (searchText.length > 0) {
            let newArr = [];
            item.FinishedData.forEach((item, index) => {
                let searchVal = searchText.toLowerCase();
                let itemVal = item.title.toLowerCase();
                if (itemVal.includes(searchVal)) {
                    newArr.push(item);
                }
            });
            setIsOpen(true);
            setShownItems(newArr);
        } else {
            setShownItems(item.FinishedData);
        }
    }, [searchText]);

    const setCurrentFolder = () => {
        let navString = `/games/${item.id}/${item.folderName}`;
        navigate(navString);
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.header} ${isOpen ? styles.headerActive : styles.nothing}`} onClick={setCurrentFolder}>
                <div className={styles.arrowContainer} onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleDrawer();
                }}>
                    <div className={`${styles.arrow} ${isOpen ? styles.down : styles.right}`}></div>
                </div>
                <div className={styles.FolderName}>{item.folderName}</div>
            </div>

            {
                isOpen ? <div className={styles.folderChildren}>
                    {
                        shownItems.map((data, index) => (
                            <a key={index} href={`https://store.steampowered.com/app/${item.id}`} target="_blank" className={styles.wrapper}>
                                <div className={styles.number}></div>
                                <div className={styles.folderChild}>{data.title}</div>
                            </a>
                        ))
                    }
                </div> : <></>
            }
        </div>
    )
}

export default GamesDrawerChild;