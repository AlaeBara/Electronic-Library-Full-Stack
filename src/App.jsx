import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import MainLaout from './layouts/MainLayout';
import AllBooks from './pages/AllBooks';
import NotFound from './pages/NotFound'
import CategoryBooks from './pages/CategoryBooks'
import OneBook from './components/OneBook';
import AddBook from './components/AddBook';
import SearchResults from './components/SearchResult';
import AboutUs from './components/AboutUS'
import Favorites from './components/favorites'
import Profile from './components/Profile'
import Sign from './components/Sign/Sign'


const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<MainLaout />}>
    <Route index element={<HomePage />} />
    <Route path='/allbooks' element={<AllBooks />} />
    <Route path='/allbooks/:category/:bookId' element={<OneBook />} />
    <Route path='*' element={<NotFound />} />
    <Route path="/allbooks/:categoryName" element={<CategoryBooks />} />
    <Route path="/search" element={<SearchResults />} />
    <Route path='/addbook' element={<AddBook />} />
    <Route path='/aboutus' element={<AboutUs />} />
    <Route path="/favorites" element={<Favorites />} />
    <Route path="/profile" element={<Profile />} />
    <Route path='/login' element={<Sign />} />
  </Route>
  )
);

const App = () => {
  return <RouterProvider router={router}/>;
};
export default App;