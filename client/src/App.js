import React, {useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchPets from './pages/SearchPets';
import UserProfile from './pages/UserProfile';
import AdminRequestPage from './pages/AdministratorPage';
import AppNavbar from './components/Navbar';
import AnimalProfile from './pages/AnimalProfile';

function App() {
  const [showModal, setShowModal] = useState(false);

  const updateShowModal = (newState) => {
    setShowModal(newState);
  }

  return (
    <>
      <AppNavbar showModal={showModal} updateShowModal={updateShowModal} />
      <Routes>
        <Route
          path='/'
          element={<SearchPets updateShowModal={updateShowModal} />}
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
          element={<AnimalProfile />}
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