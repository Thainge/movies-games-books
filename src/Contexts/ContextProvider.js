import React, { useContext, useState, useEffect } from 'react';
import ls from 'local-storage';

const Context = React.createContext();

export function ContextFunction() {
    return useContext(Context)
}

export function InputProvider({ children }) {
    // Movies
    const storedFolders = ls.get('movies');
    let allFoldersDefault = [];
    if (storedFolders) {
        allFoldersDefault = storedFolders;
    }
    const [allFolders, setAllFolders] = useState(allFoldersDefault);

    // Games
    const storedGames = ls.get('games');
    let allGamesDefault = [];
    if (storedGames) {
        allGamesDefault = storedGames;
    }
    const [allGames, setAllGames] = useState(allGamesDefault);

    // Books
    const storedBooks = ls.get('books');
    let allDefaultBooks = [];
    if (storedBooks) {
        allDefaultBooks = storedBooks;
    }
    const [allBooks, setAllBooks] = useState(allDefaultBooks);

    // Grid or row
    const [isGrid, setIsGrid] = useState(true);

    useEffect(() => {
        console.log(isGrid)
    }, [isGrid])

    let obj = {
        allFolders: allFolders,
        setAllFolders: setAllFolders,
        allGames: allGames,
        setAllGames: setAllGames,
        allBooks: allBooks,
        setAllBooks: setAllBooks,
        isGrid: isGrid,
        setIsGrid: setIsGrid,
    }

    return (
        <Context.Provider value={obj}>
            {children}
        </Context.Provider>
    )
}