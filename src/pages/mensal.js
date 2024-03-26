import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';
import './MensalTable.css';
import 'jspdf-autotable';

function MensalTable() {
  const [mensalData, setMensalData] = useState([]);

  useEffect(() => {
    fetchMensalData();
  }, []);

  const fetchMensalData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/mensal_data');
      setMensalData(response.data);
      createChart(response.data);
    } catch (error) {
      console.error('Failed to fetch mensal data:', error);
    }
  };

  const createChart = (data) => {
    const mesesAno = data.map(entry => entry.mes_ano);
    const entradas = data.map(entry => entry.quantidade_total_entradas);
    const saidas = data.map(entry => entry.quantidade_total_saidas);

    const ctx = document.getElementById('mensalChart').getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: mesesAno,
        datasets: [{
          label: 'Quantidade Total de Entradas',
          data: entradas,
          borderColor: '#030640',
          fill: false
        }, {
          label: 'Quantidade Total de Saídas',
          data: saidas,
          borderColor: '#C0091E',
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Mês/Ano',
              color: '#453831',
              fontSize: 16

            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Quantidade',
              color: '#453831',
              fontSize: 16
            },
            ticks: {
              stepSize: 100
            }
          }
        }
      }
    });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(25);
    doc.setTextColor(0, 0, 0);
    doc.text('MStar Supply', 10, 15);

    doc.setFontSize(16);
    doc.setTextColor(3,6,64);
    doc.text('Relatório - Quantidade de Entradas e Saídas Mensais de Mercadorias', 10, 45);


doc.autoTable({
  head: [['Ano/Mês', 'Quantidade Total de Entrada de Mercadorias', 'Quantidade Total de Saída de Mercadorias']],
  body: mensalData.map(data => [data.mes_ano, data.quantidade_total_entradas, data.quantidade_total_saidas]),
  startY: 60,
  headStyles: {
    fillColor: [3,6,64],
    textColor: [243,243,235],
  },
  bodyStyles: {
    fillColor: [255, 255, 255],
    textColor: [0, 0, 0],
  },
  styles: {
    font: 'helvetica',
    fontSize: 12,
    lineWidth: 0.1
  }
});


    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Análise Gráfica Mensal:', 15, doc.autoTable.previous.finalY + 25);

    // Adiciona o gráfico como imagem
    const canvas = document.getElementById('mensalChart');
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 10, doc.autoTable.previous.finalY + 30, 180, 100);

    // Salva o PDF
    doc.save('mensal_data.pdf');
};


return (
    <div className="mensal-container">
      <div className="mensal-table">
        <h2 id="title">Relatório Mensal</h2>
        <button onClick={downloadPDF}>Exportar PDF</button>
        <table>
          <thead>
            <tr>
              <th>Mês/Ano</th>
              <th id="entrada">Entrada Total de Mercadorias</th>
              <th id="saida">Saída Total de Mercadorias</th>
            </tr>
          </thead>
          <tbody>
            {mensalData.map((data, index) => (
              <tr key={index}>
                <td>{data.mes_ano}</td>
                <td>{data.quantidade_total_entradas}</td>
                <td>{data.quantidade_total_saidas}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <div>
        <canvas id="mensalChart"></canvas>
      </div>
    </div>
  );

}

export default MensalTable;
