import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchPets from './pages/SearchPets';
import UserProfile from './pages/UserProfile';
import AdminRequestPage from './pages/AdministratorPage';
import AppNavbar from './components/Navbar';
import AnimalPage from './pages/AnimalProfile';

function App() {
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route
          path='/'
          element={<SearchPets />}
        />
        <Route
          path='/saved'
          element={<UserProfile />}
        />
        <Route
          path='/admin'
          element={<AdminRequestPage />}
        />
        <Route
          path='/animal/:petId'
          element={<AnimalPage />}
        />
        <Route
          path='*'
          element={<h1 className='display-2'>Wrong page!</h1>}
        />
      </Routes>
    </>
  );
}

export default App;