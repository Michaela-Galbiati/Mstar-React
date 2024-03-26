// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cadastro from './pages/cadastro.js';
import Entrada from './pages/entrada.js';
import QuantidadeTotalTable from './pages/estoque.js';
import MensalTable from './pages/mensal.js';
import Saida from './pages/saida.js';
import Home from './pages/home.js';
import './App.css';

function App() {


  return (
    <Router>
      <div className="container1">
        <nav className="menu">
          <ul>
            <li className="logo">MStar Supply</li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cadastro">Cadastro</Link>
            </li>
            <li>
              <Link to="/entrada">Entrada</Link>
            </li>
            <li>
              <Link to="/saida">Saída</Link>
            </li>
            <li>
              <Link to="/estoque">Disponibilidade</Link>
            </li>
            <li>
              <Link to="/mensal">Relatório Mensal</Link>
            </li>
          </ul>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/entrada" element={<Entrada />} />
            <Route path="/saida" element={<Saida />} />
            <Route path="/estoque" element={<QuantidadeTotalTable />} />
            <Route path="/mensal" element={<MensalTable />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;
