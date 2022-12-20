import React from 'react';
import { ContextFunction } from '../Contexts/ContextProvider';
import { Routes, Route } from "react-router-dom";
import Movies from '../Pages/MoviePages/Movies';
import MoviesHome from '../Pages/MoviePages/Home';
import MovieDetails from '../Pages/MoviePages/MovieDetails';
import PageNotFound from '../Pages/PageNotFound';
import Header from './MovieComponents/Other/header';
import 'react-modern-drawer/dist/index.css';
import MainDrawer from './mainDrawer';
import DrawerChild from './MovieComponents/Other/drawerChild';
import AddModal from './MovieComponents/forms/add';

function RouterComponent() {
    const obj = ContextFunction();
    const { allFolders } = obj;

    return (
        <>
            <Header allFolders={allFolders} />
            <MainDrawer allFolders={allFolders} title={'Movies'} AddModal={AddModal} DrawerChild={DrawerChild} />
            {/* All possible routes */}
            <Routes>
                <Route path="/" element={<MoviesHome />} />
                <Route path="/movies" element={<MoviesHome />} />
                <Route path="/movies/:id/:movieFolder" element={<Movies />} exact />
                <Route path="/movies/:id/:movieFolder/:movieId" element={<MovieDetails />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes >
        </>
    );
}

export default RouterComponent;