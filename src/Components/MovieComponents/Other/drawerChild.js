import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './drawerChild.module.css';

function DrawerChild({ item, searchText }) {

    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
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

    return (
        <div className={styles.container}>
            <div className={styles.header} onClick={toggleDrawer}>
                <div className={`${styles.arrow} ${isOpen ? styles.down : styles.right}`}></div>
                <div className={styles.FolderName}>{item.folderName}</div>
            </div>

            {
                isOpen ? <div className={styles.folderChildren}>
                    {
                        shownItems.map((data, index) => (
                            <Link key={index} to={`/movies/${item.id}/${item.folderName}/${data.id}`} className={styles.wrapper}>
                                <div className={styles.number}>#</div>
                                <div className={styles.folderChild}>{data.title}</div>
                            </Link>
                        ))
                    }
                </div> : <></>
            }
        </div>
    )
}

export default DrawerChild;