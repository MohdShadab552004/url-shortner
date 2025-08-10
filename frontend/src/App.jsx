import React from 'react'
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import NotFound from './pages/NotFoundPage';
import { Route, Routes } from 'react-router-dom';
import RedirectPage from './pages/RedirectPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/redirect/:code" element={<RedirectPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
export default App