// pages/home.js
import React from 'react';
import './home.css'; 
import bitmap from '../assets/bitmap.png';

function Home() {
  return (
    <div className="home-container">
      <div className="content1">
        <h2>Bem-vindo à MStar Supply</h2>
        <p>Aqui você encontrará tudo o que precisa para gerenciar seu estoque de forma eficiente.</p>
        <img src={bitmap} alt="Imagem de exemplo" />
      </div>
    </div>
  );
}

export default Home;
