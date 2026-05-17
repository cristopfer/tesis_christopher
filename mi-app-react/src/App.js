// src/App.js
import { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { ModulesPage } from './pages/ModulesPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <>
      <header className="app-header">
        <h1>♟️ Sistema Inteligente de Predicción en Ajedrez</h1>
        <p>Análisis avanzado de partidas usando Machine Learning y XGBoost</p>
      </header>

      <div className="container">
        {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
        {currentPage === 'modules' && <ModulesPage onNavigate={setCurrentPage} />}
      </div>
    </>
  );
}

export default App;
