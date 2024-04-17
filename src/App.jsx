import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './dark-mode.css';
import ShoppingCart from './pages/ShoppingCart';
import Product from './pages/Product';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const body = document.querySelector('body');
    body.classList.toggle('dark-mode');
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <button onClick={toggleDarkMode} className='small-button'>
        {darkMode ? 'Modo Claro' : 'Modo Escuro - beta'}
      </button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ShoppingCart" element={<ShoppingCart />} />
        <Route path="/Product/:id" element={<Product />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
