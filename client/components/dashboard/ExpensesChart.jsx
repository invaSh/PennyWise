'use client';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options = {
  legend: {
    show: false,
    position: 'top',
  },
  colors: ['#FFD700', '#FBBF24'],
  chart: {
    fontFamily: 'Red Hat Display, sans-serif',
    height: 335,
    width: 535,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#FFD70033',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'smooth',
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
        color: '#FDE047',
      },
    },
    yaxis: {
      lines: {
        show: true,
        color: '#FF5733',
      },
    },
    borderColor: 'transparent',
  },
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
  markers: {
    size: 4,
    colors: ['#000'],
    strokeColors: ['#FFD700', '#FBBF24'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
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

const ExpensesChart = () => {
  const [state, setState] = useState({
    series: [
      {
        name: 'Marketing',
        data: [23, 35, 30, 40, 35, 50, 60, 70, 65, 75, 80, 85],
      },
      {
        name: 'Operations',
        data: [40, 30, 45, 50, 55, 65, 70, 80, 90, 95, 100, 110],
      },
    ],
  });

  return (
    <ReactApexChart
      options={options}
      series={state.series}
      type="area"
      height={350}     
      width={900} 
    />
  );
};

export default ExpensesChart;
