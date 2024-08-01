import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayout from './layouts/MainLayout';
import AllBooks from './pages/AllBooks';
import NotFound from './pages/NotFound'
import OneBook from './components/OneBook';
import AddBook from './components/AddBook';
import SearchResults from './components/SearchResult';
import AboutUs from './components/AboutUS'
import Favorites from './components/favorites'
import Profile from './components/Profile'
import Sign from './components/Sign/Sign'
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './components/admin/Dashboard';
import { AuthProvider, useAuth } from './AuthContext';
import AdminRoute from './AdminRoute';

const AppContent = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<AllBooks />}/>~
        <Route path='/allbooks/:category/:bookId' element={<OneBook />} />
        <Route path='*' element={<NotFound />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path='/login' element={<Sign />} />
        <Route path='/aboutus' element={<AboutUs />} />

        {/* routes admin */}
        <Route path='/admin' element={<AdminRoute><Dashboard /></AdminRoute>} />

        {/* routes client */}
        <Route path='/addbook' element={<ProtectedRoute><AddBook /></ProtectedRoute>} />
        <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;