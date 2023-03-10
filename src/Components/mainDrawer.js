import styles from './Router.module.css';
import Drawer from 'react-modern-drawer';
import Modal from 'react-modal';
import { useState } from 'react';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        margin: '0',
        padding: '0',
        border: 'none',
        background: 'none',
    },
};

function MainDrawer({ drawerOpen, setDrawerOpen, allFolders, AddModal, DrawerChild, title }) {
    const toggleDrawer = () => {
        setDrawerOpen((prevState) => !prevState)
    }

    const [addModalState, setAddModalState] = useState(false);
    const openModal = () => {
        setAddModalState(true);
    }

    const [searchText, setSearchText] = useState('');

    const searchUpdate = (e) => {
        let searchVal = e.target.value;
        setSearchText(searchVal);
    }

    return (
        <>
            <div className={`${styles.close} ${styles.closedBtn}`} onClick={toggleDrawer}>
                <div className={`${styles.barsContainer} ${styles.barsOnly}`}>
                    <div className={styles.bar1}></div>
                    <div className={styles.bar2}></div>
                    <div className={styles.bar3}></div>
                </div>
            </div>
            <Drawer
                open={drawerOpen}
                direction='left'
                enableOverlay={false}
            >
                <div className={styles.drawerContainer}>
                    <div className={styles.drawerHeader}>
                        <div className={styles.drawerHeaderText}>{title}</div>
                        <div className={styles.close2} onClick={toggleDrawer}>
                            <div className={`${styles.barsContainer} ${styles.change}`}>
                                <div className={styles.bar1}></div>
                                <div className={styles.bar2}></div>
                                <div className={styles.bar3}></div>
                            </div>
                        </div>
                    </div>
                    <input type={'search'} className={styles.search} onChange={searchUpdate} placeholder={'search...'} />
                    <div className={styles.listColumn}>
                        {
                            allFolders ? allFolders.map((item, index) => (
                                <DrawerChild searchText={searchText} key={index} item={item} />
                            )) : <></>
                        }
                        <div className={styles.addBackground}>
                            <div className={styles.addNew} onClick={openModal}>
                                <div className={styles.add}>+</div>
                                <div className={styles.new}>New Collection</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
            <Modal
                className={styles.Modal}
                isOpen={addModalState}
                onRequestClose={() => setAddModalState(false)}
                style={customStyles}
                overlayClassName={styles.overlay}
                contentLabel="Example Modal"
            >
                {
                    addModalState ? <AddModal setAddModalState={setAddModalState} /> : <></>
                }
            </Modal></>
    )
}

export default MainDrawer;