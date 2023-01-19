import React, { useEffect, useState } from 'react';
import { ContextFunction } from '../Contexts/ContextProvider';
import { Routes, Route, useLocation } from "react-router-dom";
import Movies from '../Pages/MoviePages/Movies';
import MoviesHome from '../Pages/MoviePages/Home';
import MovieDetails from '../Pages/MoviePages/MovieDetails';
import GamesHome from '../Pages/GamePages/GamesHome';
import Games from '../Pages/GamePages/Movies';
import PageNotFound from '../Pages/PageNotFound';
import Header from './MovieComponents/Other/header';
import MainDrawer from './mainDrawer';
import MovieDrawerChild from './MovieComponents/Other/drawerChild';
import GamesDrawerChild from './GameComponents/Other/drawerChild';
import AddModalMovies from './MovieComponents/forms/add';
import AddModalGames from './GameComponents/forms/add';
import 'react-modern-drawer/dist/index.css';
import Books from '../Pages/BookPages/Books';
import BooksHome from '../Pages/BookPages/BooksHome';
import AddModalBooks from './BookComponents/forms/add';
import BooksDrawerChild from './BookComponents/Other/drawerChild';

function RouterComponent() {
    const obj = ContextFunction();
    const { allFolders, allGames, allBooks } = obj;

    const location = useLocation();
    let locationPath = location.pathname;

    let terms = [
        'movies',
        'games',
        'books'
    ]
    let foldersData = [];
    let title = 'library';
    let currentDrawer = MovieDrawerChild;

    terms.forEach((item) => {
        if (locationPath.slice(0, 12).includes(item)) {
            return title = item;
        }
    });

    let currentModal = AddModalMovies;

    if (title === 'movies') {
        foldersData = allFolders;
        document.documentElement.setAttribute('data-theme', 'movies');
        document.title = "Movies";
        currentDrawer = MovieDrawerChild;
        currentModal = AddModalMovies;
    } else if (title === 'games') {
        foldersData = allGames;
        document.documentElement.setAttribute('data-theme', 'games');
        document.title = "Games";
        currentDrawer = GamesDrawerChild;
        currentModal = AddModalGames;
    } else if (title === 'books') {
        foldersData = allBooks;
        document.documentElement.setAttribute('data-theme', 'books');
        document.title = "Books";
        currentDrawer = BooksDrawerChild;
        currentModal = AddModalBooks;
    }

    const [drawerOpen, setDrawerOpen] = useState(true);

    return (
        <>
            <Header allFolders={foldersData} drawerOpen={drawerOpen} />
            <MainDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} allFolders={foldersData} title={title} AddModal={currentModal} DrawerChild={currentDrawer} />
            {/* All possible routes */}
            <Routes>
                <Route path="/" element={<MoviesHome drawerIsOpen={drawerOpen} />} />
                <Route path="/movies" element={<MoviesHome drawerIsOpen={drawerOpen} />} />
                <Route path="/movies/:id/:movieFolder" element={<Movies drawerIsOpen={drawerOpen} />} exact />
                <Route path="/movies/:id/:movieFolder/:movieId" element={<MovieDetails drawerIsOpen={drawerOpen} />} />
                <Route path="/games" element={<GamesHome drawerIsOpen={drawerOpen} />} />
                <Route path="/games/:id/:gameFolder" element={<Games drawerIsOpen={drawerOpen} />} />
                <Route path="/books" element={<BooksHome drawerIsOpen={drawerOpen} />} />
                <Route path="/books/:id/:bookFolder" element={<Books drawerIsOpen={drawerOpen} />} />
                <Route path="*" element={<PageNotFound setDrawerOpen={setDrawerOpen} />} />
            </Routes >
        </>
    );
}

export default RouterComponent;