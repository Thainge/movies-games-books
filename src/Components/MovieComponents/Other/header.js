import React from 'react';
import styles from './header.module.css';
import { NavLink } from "react-router-dom";

function Header({ drawerOpen }) {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    let currentText = 'The M⬤vie Database';
    let currentLoc = 'Movies';

    if (currentTheme === 'movies') {
        currentText = 'The M⬤vie Database';
        currentLoc = 'Movies';
    }
    if (currentTheme === 'games') {
        console.log(currentTheme)
        currentText = 'Steam';
        currentLoc = 'Games';
    }
    if (currentTheme === 'books') {
        currentText = 'The Book API';
        currentLoc = 'Books';
    }

    return (
        <div className={`${styles.headerContainer} ${drawerOpen ? styles.drawerOpen : styles.nothing}`}>
            <ul className={styles.navBar}>
                <li className={styles.liEl}>
                    <NavLink className={({ isActive }) => isActive ? styles.activeLink : styles.link} to={"/movies"}>Movies</NavLink>
                </li>
                <li className={styles.liEl}>
                    <NavLink className={({ isActive }) => isActive ? styles.activeLink : styles.link} to={"/games"}>Games</NavLink>
                </li>
                <li className={styles.liEl}>
                    <NavLink className={({ isActive }) => isActive ? styles.activeLink : styles.link} to={"/books"}>Books</NavLink>
                </li>
            </ul>
            {/* <div className={styles.center}>
                <h2 className={styles.h1El}>{currentLoc} Library</h2>
                <div className={styles.centerText}>powered by <span className={styles.special}>{currentText}</span></div>
            </div> */}
        </div>
    );
}

export default Header;
