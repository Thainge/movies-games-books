import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './drawerChild.module.css';

function DrawerChild({ item }) {

    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    return (
        <div className={styles.container}>
            <div className={styles.header} onClick={toggleDrawer}>
                <div className={`${styles.arrow} ${isOpen ? styles.down : styles.right}`}></div>
                <div className={styles.FolderName}>{item.folderName}</div>
            </div>

            {
                isOpen ? <div className={styles.folderChildren}>
                    {
                        item.FinishedData.map((data, index) => (
                            <Link to={`/movies/${item.id}/${item.folderName}/${data.id}`} className={styles.wrapper}>
                                <div className={styles.number}>#</div>
                                <div key={index} className={styles.folderChild}>{data.title}</div>
                            </Link>
                        ))
                    }
                </div> : <></>
            }
        </div>
    )
}

export default DrawerChild;