import styles from './BooksHome.module.css';
import { useState } from 'react';
import AddModal from '../../Components/BookComponents/forms/add';
import Modal from 'react-modal';
import { ContextFunction } from '../../Contexts/ContextProvider';
import HomeCollection from '../../Components/BookComponents/Other/HomeCollection';

Modal.setAppElement(document.getElementById('root'));

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

function BooksHome({ drawerIsOpen }) {
    const obj = ContextFunction();
    const { allBooks } = obj;

    // Add new Directory modal
    const [addModalState, setAddModalState] = useState(false);
    const openModal = () => {
        setAddModalState(true);
    }

    return (
        <div className={`${styles.Container} ${drawerIsOpen ? styles.drawerOpen : styles.nothing}`}>
            <h1 className={styles.header}>Book Collections</h1>
            <div className={styles.MoviesContainer}>
                <div className={styles.add} onClick={openModal}>
                    <div className={styles.addIcon}>+</div>
                    <div className={styles.addText}>New Collection</div>
                </div>
                {
                    allBooks.map((item, index) =>
                        <HomeCollection key={index} item={item} index={index} />
                    )
                }
            </div>
            <Modal
                isOpen={addModalState}
                onRequestClose={() => setAddModalState(false)}
                style={customStyles}
                overlayClassName={styles.overlay}
                contentLabel="Example Modal"
            >
                {
                    addModalState ? <AddModal setAddModalState={setAddModalState} /> : <></>
                }
            </Modal>
        </div>
    );
}

export default BooksHome;