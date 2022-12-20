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
    },
};

function MainDrawer({ allFolders, AddModal, DrawerChild }) {

    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const [addModalState, setAddModalState] = useState(false);
    const openModal = () => {
        setAddModalState(true);
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
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
            >
                <div className={styles.drawerContainer}>
                    <div className={styles.drawerHeader}>
                        <div className={styles.drawerHeaderText}>Movies</div>
                        <div className={`${styles.close2} ${styles.openedBtn}`} onClick={toggleDrawer}>
                            <div className={`${styles.barsContainer} ${styles.change}`}>
                                <div className={styles.bar1}></div>
                                <div className={styles.bar2}></div>
                                <div className={styles.bar3}></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.listColumn}>
                        {
                            allFolders.map((item, index) => (
                                <DrawerChild key={index} item={item} />
                            ))
                        }
                        <div className={styles.addNew} onClick={openModal}>
                            <div className={styles.add}>+</div>
                            <div className={styles.new}>New Collection</div>
                        </div>
                    </div>
                </div>
            </Drawer>
            <Modal
                className="Modal"
                isOpen={addModalState}
                onRequestClose={() => setAddModalState(false)}
                style={customStyles}
                overlayClassName="Overlay"
                contentLabel="Example Modal"
            >
                {
                    addModalState ? <AddModal setAddModalState={setAddModalState} /> : <></>
                }
            </Modal></>
    )
}

export default MainDrawer;