import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './entrada.css'

function Entrada() {
  const [nomeMercadoria, setNomeMercadoria] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [local, setLocal] = useState('');
  const [mercadorias, setMercadorias] = useState([]);
  const [entradaq, setEntradaq] = useState([]);
  const [entradan, setEntradan] = useState([]);
  const [entradadh, setEntradadh] = useState([]);
  const [entradal, setEntradal] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMercadorias();
    fetchEntradaq();
    fetchEntradan();
    fetchEntradadh();
    fetchEntradal();
  }, []);



  const fetchMercadorias = async () => {
    try {
      const response = await axios.get('http://localhost:5000/mercadorias');
      setMercadorias(response.data);
    } catch (error) {
      console.error('Failed to fetch mercadorias:', error);
    }
  };

  const fetchEntradan = async () => {
    try {
      const response = await axios.get('http://localhost:5000/entradan');
      setEntradan(response.data);
    } catch (error) {
      console.error('Failed to fetch entradan:', error);
    }
  };

  const fetchEntradaq = async () => {
    try {
      const response = await axios.get('http://localhost:5000/entradaq');
      setEntradaq(response.data);
    } catch (error) {
      console.error('Failed to fetch entradaq:', error);
    }
  };

  const fetchEntradadh = async () => {
    try {
      const response = await axios.get('http://localhost:5000/entradadh');
      setEntradadh(response.data);
    } catch (error) {
      console.error('Failed to fetch entradadh:', error);
    }
  };

  const fetchEntradal = async () => {
    try {
      const response = await axios.get('http://localhost:5000/entradal');
      setEntradal(response.data);
    } catch (error) {
      console.error('Failed to fetch entradadh:', error);
    }
  };

  const handleAddEntrada = async () => {
    try {
      const response = await axios.post('http://localhost:5000/add_entrada', {
        nome_mercadoria: nomeMercadoria,
        quantidade: quantidade,
        data_hora: dataHora,
        local: local
      });

      setMessage(response.data.message);

    } catch (error) {
      setMessage('Falha ao adicionar entrada');
      console.error('Falha ao adicionar entrada:', error);
    }
  };

  return (
    <div id="principal">
      <h1 id='title'>Registro de Entrada</h1>
    <div className='container'>
    <div className='form-containerent'>
     <div className='form'>
     <p className='titulo'>Registre os dados da operação de entrada:</p>
      <select value={nomeMercadoria} onChange={(e) => setNomeMercadoria(e.target.value)}>
        <option value="">Selecione a Mercadoria</option>
        {mercadorias.map((mercadoria) => (
          <option key={mercadoria.id} value={mercadoria}>{mercadoria}</option>
        ))}
      </select>
      <br></br><label>Quantidade:</label>
      <br></br><input type="text" placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} requiresd/>
      <br></br><label>Data/Hora</label>
      <br></br><input type="datetime-local" placeholder="Data e Hora" value={dataHora} onChange={(e) => setDataHora(e.target.value)} requiresd/>
      <br></br><label>Local</label>
      <br></br><input type="text" placeholder="Local" value={local} onChange={(e) => setLocal(e.target.value)} requiresd/>
      <button className='buttonentrada' onClick={handleAddEntrada}>Add Entrada</button>

      {message && <p>{message}</p>}
     </div>
     </div>

      <table>
        <thead>
          <tr>
            <th>Mercadoria</th>
            <th>Quantidade</th>
            <th>Data e Hora</th>
            <th>Local</th>
          </tr>
        </thead>
        <tbody>
          {entradan.map((mercadoria, index) => (
            <tr key={index}>
              <td>{mercadoria}</td>
              <td>{entradaq[index]}</td>
              <td>{entradadh[index]}</td>
              <td>{entradal[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
    </div>
  );
}

export default Entrada;
