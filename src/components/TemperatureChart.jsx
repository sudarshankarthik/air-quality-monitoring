// TemperatureChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';



const TemperatureChart = ({ data,lable }) => {
    var val = ""
    var col = ""
    if (lable === 1) {
        val= "temperature"
        col = "rgb(238, 119, 37)"
    }
    else if (lable === 2) {
        val= "humidity"
        col = "hsl(188, 73%, 50%)"
    }
    else if (lable === 3) {
        val = "airQuality"
        col = "rgb(59, 219, 90)"
    }

  const chartData = {
    labels: data.map((entry) => ((entry.timestamp.seconds))), // Convert seconds to milliseconds
    datasets: [
      {
        label: val,
        data: data.map((entry) => entry[val]),
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
