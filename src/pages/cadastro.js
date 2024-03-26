// Cadastro.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cadastro.css'; // Importa o arquivo CSS

function Cadastro() {
    const [nome, setNome] = useState('');
    const [fabricante, setFabricante] = useState('');
    const [numeroRegistro, setNumeroRegistro] = useState('');
    const [tipo, setTipo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [message, setMessage] = useState('');
    const [somaQuantidadeEntradas, setSomaQuantidadeEntradas] = useState('');
    const [somaQuantidadeSaidas, setSomaQuantidadeSaidas] = useState('');
    const [diferenca, setDiferenca] = useState('');
    const [quantidadeVariedadeItens, setQuantidadeVariedadeItens] = useState(0);

    useEffect(() => {
        fetchQuantidadeVariedadeItens();
        fetchSomaQuantidadeEntradas();
        fetchSomaQuantidadeSaidas();
        fetchDiferenca();
    }, []);

    const fetchDiferenca = async () => {
      try {
          const response = await axios.get('http://localhost:5000/diferenca_entradas_saidas');
          setDiferenca(response.data.diferenca);
      } catch (error) {
          console.error('Failed to fetch diferenca:', error);
      }
  };

    const fetchSomaQuantidadeEntradas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/soma_quantidade_entradas');
            setSomaQuantidadeEntradas(response.data.soma_quantidade);
        } catch (error) {
            console.error('Failed to fetch soma quantidade entradas:', error);
        }
    };

    const fetchSomaQuantidadeSaidas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/soma_quantidade_entradasaida');
            setSomaQuantidadeSaidas(response.data.soma_quantidade);
        } catch (error) {
            console.error('Failed to fetch soma quantidade saidas:', error);
        }
    };
    const fetchQuantidadeVariedadeItens = async () => {
        try {
            const response = await axios.get('http://localhost:5000/quantidade_variedade_itens');
            setQuantidadeVariedadeItens(response.data.quantidade_variedade_itens);
        } catch (error) {
            console.error('Failed to fetch quantidade variedade itens:', error);
        }
    };
    const handleAddMercadoria = async () => {
      try {
          // Verificar se o número de registro já existe
          const checkResponse = await axios.post('http://localhost:5000/check_numero_registro', {
              numero_registro: numeroRegistro
          });

          if (checkResponse.status === 200) {
              // Número de registro disponível, prosseguir com a adição da mercadoria
              const addResponse = await axios.post('http://localhost:5000/add_mercadoria', {
                  nome: nome,
                  fabricante: fabricante,
                  numero_registro: numeroRegistro,
                  tipo: tipo,
                  descricao: descricao
              });

              setMessage(addResponse.data.message);
          } else {
              // Número de registro já existe
              setMessage(checkResponse.data.message);
          }
      } catch (error) {
          setMessage('Falha ao adicionar mercadoria');
          console.error('Falha ao adicionar mercadoria:', error);
      }
  };


    return (
        <div>
            <div className="form-container1">
                <div className="form">
                    <h1 id='title'>Cadastro de Mercadoria</h1>
                    <br></br><label>Nome:</label>
                    <br></br><input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required/>
                    <br></br><label>Fabricante:</label>
                    <br></br><input type="text" placeholder="Fabricante" value={fabricante} onChange={(e) => setFabricante(e.target.value)} required/>
                    <br></br><label>Número de Registro:</label>
                    <br></br><input type="text" placeholder="Número de Registro" value={numeroRegistro} onChange={(e) => setNumeroRegistro(e.target.value)} required/>
                    <br></br><label>Tipo:</label>
                    <br></br><input type="text" placeholder="Tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} required/>
                    <br></br><label>Descrição:</label>
                    <br></br><input type="text" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} required/>
                    <button onClick={handleAddMercadoria}>Adicionar Mercadoria</button>
                    {message && <p>{message}</p>}
                </div>
                <div className="sums">
                   <div className='caixae'>
                   <h2>Entradas Totais: {somaQuantidadeEntradas}</h2>
                   </div>
                    <div  className='caixas'>
                    <h2>Saídas Totais: {somaQuantidadeSaidas}</h2>
                    </div>
                    <div className="diferenca">
                   <h2>Estoque Total: {diferenca}</h2>
                   </div>
                   <div className="quantidade-variedade-itens">
                        <h2>Variedade de Itens: {quantidadeVariedadeItens}</h2>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Cadastro;
