// TemperatureChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';



const TemperatureChart = ({ data,lable }) => {

  const convertTimestampToTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  };
    var val = ""
    var col = ""
    if (lable === 1) {
        val= "Temperature"
        col = "rgb(238, 119, 37)"
    }
    else if (lable === 2) {
        val= "Humidity"
        col = "hsl(188, 73%, 50%)"
    }
    else if (lable === 3) {
        val = "Air Quality"
        col = "rgb(59, 219, 90)"
    }

  const chartData = {
    labels: data.map((entry) => ((entry.ts))), // Convert seconds to milliseconds
    datasets: [
      {
        label: val,
        data: data.map((entry) => entry.value),
        fill: false,
        borderColor: col,
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default TemperatureChart;
