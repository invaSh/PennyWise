'use client';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options = {
  colors: ['#FDE047', '#7d7d7d'],
  chart: {
    fontFamily: 'Red Hat Display, sans-serif',
    type: 'bar',
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: '25%',
          },
        },
      },
    },
  ],
  
  dataLabels: {
    enabled: false,
  },

  legend: {
    show: true,
    position: 'top',
    labels: {
      style: {
        fontFamily: 'Red Hat Display, sans-serif', // Apply the font to the legend
        fontSize: '14px',
        fontWeight: 400,
        colors: ['#FDE047'], // Set the font color for the legend labels
      },
    },
  },

  tooltip: {
    theme: 'dark',
    style: {
      fontFamily: 'Red Hat Display, sans-serif', // Apply the font to the tooltip
      fontSize: '12px',
      fontWeight: 400,
    },
  },

  xaxis: {
    categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    labels: {
      style: {
        colors: '#FDE047',
        fontSize: '12px',
        fontFamily: 'Red Hat Display, sans-serif',
        fontWeight: 400,
      },
    },
  },

  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 100,
    labels: {
      style: {
        colors: '#FDE047',
        fontSize: '12px',
        fontWeight: 400,
      },
    },
  },
};



const SavingsChart = () => {
  const [state, setState] = useState({
    series: [
      {
        name: 'Savings',
        data: [40, 70, 80, 60, 90, 50, 75],
      },
      {
        name: 'Investments',
        data: [30, 50, 40, 60, 70, 65, 80],
      },
    ],
  });

  return (
    <ReactApexChart
      options={options}
      series={state.series}
      type="bar"
      height={350}
      width={400}
    />
  );
};

export default SavingsChart;
