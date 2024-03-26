import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './saida.css'

const fetchQuantidadeDisponivel = async (nomeMercadoria, setQuantidadeDisponivel) => {
  try {
    const response = await axios.get(`http://localhost:5000/quantidade_disponivel?nome_mercadoria=${nomeMercadoria}`);
    setQuantidadeDisponivel(response.data.quantidade_disponivel);
  } catch (error) {
    console.error('Failed to fetch quantidade disponivel:', error);
  }
};

function Saida() {
  const [nomeMercadoria, setNomeMercadoria] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [local, setLocal] = useState('');
  const [mercadorias, setMercadorias] = useState([]);
  const [saidaq, setSaidaq] = useState([]);
  const [saidan, setSaidan] = useState([]);
  const [saidadh, setSaidadh] = useState([]);
  const [saidal, setSaidal] = useState([]);
  const [message, setMessage] = useState('');
  const [quantidadeDisponivel, setQuantidadeDisponivel] = useState('');

  useEffect(() => {
    fetchMercadorias();
    fetchSaidan();
    fetchSaidaq();
    fetchSaidadh();
    fetchSaidal();
  }, []);

  useEffect(() => {
    if (nomeMercadoria) {
      fetchQuantidadeDisponivel(nomeMercadoria, setQuantidadeDisponivel);
    }
  }, [nomeMercadoria]);

  const fetchMercadorias = async () => {
    try {
      const response = await axios.get('http://localhost:5000/mercadorias');
      setMercadorias(response.data);
    } catch (error) {
      console.error('Failed to fetch mercadorias:', error);
    }
  };

  const fetchSaidan = async () => {
    try {
      const response = await axios.get('http://localhost:5000/saidan');
      setSaidan(response.data);
    } catch (error) {
      console.error('Failed to fetch saidan:', error);
    }
  };

  const fetchSaidaq = async () => {
    try {
      const response = await axios.get('http://localhost:5000/saidaq');
      setSaidaq(response.data);
    } catch (error) {
      console.error('Failed to fetch saidaq:', error);
    }
  };

  const fetchSaidadh = async () => {
    try {
      const response = await axios.get('http://localhost:5000/saidadh');
      setSaidadh(response.data);
    } catch (error) {
      console.error('Failed to fetch saidadh:', error);
    }
  };

  const fetchSaidal = async () => {
    try {
      const response = await axios.get('http://localhost:5000/saidal');
      setSaidal(response.data);
    } catch (error) {
      console.error('Failed to fetch saidal:', error);
    }
  };


  const handleAddSaida = async () => {
    try {
      
      if (quantidade > quantidadeDisponivel) {
        setMessage('A quantidade de saída não pode ser maior do que a disponibilidade');
        return;
      }

      const response = await axios.post('http://localhost:5000/add_saida', {
        nome_mercadoria: nomeMercadoria,
        quantidade: quantidade,
        data_hora: new Date(dataHora).toISOString(),
        local: local
      });

      setMessage(response.data.message);

      fetchQuantidadeDisponivel(nomeMercadoria, setQuantidadeDisponivel);
    } catch (error) {
      setMessage('Falha ao adicionar saída');
      console.error('Falha ao adicionar saída:', error.response.data.error);
    }
  };

  return (
    <div id="principal" >
      <h1 id='title'>Registro de Saída</h1>
    <div className='container'>
    <div className='form-container'>
    <div className='form'>
      <p className='titulo'>Registre os dados da operação de saída:</p>
      <select value={nomeMercadoria} onChange={(e) => setNomeMercadoria(e.target.value)}>
        <option value="">Selecione a Mercadoria</option>
        {mercadorias.map((mercadoria, index) => (
          <option key={index} value={mercadoria}>{mercadoria}</option>
        ))}
      </select>

      {quantidadeDisponivel !== '' && (
        <h4>Quantidade Disponível: {quantidadeDisponivel}</h4>
      )}
      <br></br><label>Quantidade:</label>
      <br></br><input type="text" placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required/>
      <br></br><label>Data/Hora:</label>
      <br></br><input type="datetime-local" placeholder="Data e Hora" value={dataHora} onChange={(e) => setDataHora(e.target.value)} required/>
      <br></br><label>Local:</label>
      <br></br><input type="text" placeholder="Local" value={local} onChange={(e) => setLocal(e.target.value)} required/>
      <br></br><button className='buttonsaida' onClick={handleAddSaida}>Confirmar saída</button>
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
        {saidan.map((mercadoria, index) => (
          <tr key={index}>
            <td>{mercadoria}</td>
            <td>{saidaq[index]}</td>
            <td>{saidadh[index]}</td>
            <td>{saidal[index]}</td>
          </tr>
        ))}
      </tbody>
      </table>

    </div>
    </div>
  );
}

export default Saida;
