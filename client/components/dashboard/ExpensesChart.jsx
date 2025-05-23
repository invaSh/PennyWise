'use client';
import React, { useState, useEffect } from 'react';
import { getYearlyExpenses } from '@/app/actions/analyticsActions';

export default function ExpensesChart() {
  const [Chart, setChart] = useState(null);
  const [state, setState] = useState({
    series: [
      {
        name: 'Expenses',
        data: [],
      },
    ],
  });
  const [highestValue, setHighestValue] = useState(0);

  const [yearly, setYearly] = useState([]);
  const options = {
    legend: {
      show: true, 
      showForSingleSeries: true,
      position: 'top',
      horizontalAlign: 'center',
      labels: {
        style: {
          fontFamily: 'Red Hat Display, sans-serif', 
          fontSize: '14px',
          fontWeight: 400,
          colors: '#FDE047', 
        },
      },
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
      categories: state.categories, 
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
      max: highestValue,
      labels: {
        style: {
          colors: '#FDE047',
          fontSize: '12px',
          fontWeight: 400,
        },
      },
    },
  };

  useEffect(() => {
    const getYearly = async () => {
      try {
        const data = await getYearlyExpenses();
        
        const months = data.map(item => item.month); 
        const amounts = data.map(item => item.amount);
        setHighestValue(Math.max(...amounts));
        setState({
          series: [
            {
              name: 'Expenses',
              data: amounts,
            },
          ],
          categories: months,
        });

        options.xaxis.categories = months;
        
        setYearly(data);
      } catch (error) {
        console.error('Error fetching yearly expenses:', error);
      }
    };

    getYearly();
  }, []);

  useEffect(() => {
    import('react-apexcharts')
      .then((mod) => {
        setChart(() => mod.default);
      })
      .catch((error) => {
        console.error('Error loading react-apexcharts:', error);
      });
  }, []);

  if (!Chart) {
    return <div>Loading Chart...</div>;
  }

  return (
    <div>
      <Chart
        options={options}
        series={state.series}
        type="area"
        height={350}
        width={900}
      />
    </div>
  );
}
