import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
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
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './AuthContext'; // Import the AuthProvider

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/allbooks' element={<AllBooks />} />
        <Route path='/allbooks/:category/:bookId' element={<OneBook />} />
        <Route path='*' element={<NotFound />} />
        <Route path="/allbooks/:categoryName" element={<CategoryBooks />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path='/login' element={<Sign />} />
        <Route path='/aboutus' element={<AboutUs />} />

        {/* routes client */}
        <Route path='/addbook' element={<ProtectedRoute><AddBook /></ProtectedRoute>} />
        <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Route>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;