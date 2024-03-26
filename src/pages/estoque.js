import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuantidadeTotalTable.css';

function QuantidadeTotalTable() {
  const [quantidades, setQuantidades] = useState([]);
  const [selectedMercadoria, setSelectedMercadoria] = useState('');
  const [mercadorias, setMercadorias] = useState([]);

  useEffect(() => {
    fetchQuantidades();
    fetchMercadorias();
  }, []);

  const fetchQuantidades = async () => {
    try {
      const response = await axios.get('http://localhost:5000/quantidade_total');
      setQuantidades(response.data);
    } catch (error) {
      console.error('Failed to fetch quantidade total:', error);
    }
  };

  const fetchMercadorias = async () => {
    try {
      const response = await axios.get('http://localhost:5000/mercadorias');
      setMercadorias(response.data);
    } catch (error) {
      console.error('Failed to fetch mercadorias:', error);
    }
  };

  const handleMercadoriaChange = async (event) => {
    const selectedMercadoria = event.target.value;
    setSelectedMercadoria(selectedMercadoria);

    try {
      const response = await axios.get(`http://localhost:5000/quantidade_total?nome_mercadoria=${selectedMercadoria}`);
      setQuantidades(response.data);
    } catch (error) {
      console.error('Failed to fetch quantidade total for selected mercadoria:', error);
    }
  };

  return (
    <div className='quantidadeTotal'>
      <h2 id="title">Relatório Quantidade Total</h2>
      <label htmlFor="mercadoriaSelect">Selecione a Mercadoria:</label>
      <select id="mercadoriaSelect" value={selectedMercadoria} onChange={handleMercadoriaChange}>
        <option value="">Todas as Mercadorias</option>
        {mercadorias.map((mercadoria, index) => (
          <option key={index} value={mercadoria} style={{ backgroundColor: '#030640', color:'white' }}>{mercadoria}</option>
        ))}
      </select>
      <table className="quantidade-table"> 
        <thead>
          <tr>
            <th>Mercadoria</th>
            <th>Ano/Mês</th>
            <th id="entrada">Quantidade Total de Entrada de Mercadorias</th>
            <th id="saida">Quantidade Total de Saída de Mercadorias</th>
          </tr>
        </thead>
        <tbody>
          {quantidades.map((quantidade, index) => (
            <tr key={index}>
              <td>{quantidade.nome_mercadoria}</td>
              <td>{quantidade.mes_ano}</td>
              <td>{quantidade.quantidade_total_entradas}</td>
              <td>{quantidade.quantidade_total_saidas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QuantidadeTotalTable;
