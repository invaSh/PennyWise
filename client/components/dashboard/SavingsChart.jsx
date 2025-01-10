'use client';
import React, { useState, useEffect } from 'react';
import { getHalfYear } from '@/app/actions/analyticsActions';

const SavingsChart = () => {
  const [Chart, setChart] = useState(null);
  const [state, setState] = useState({
    series: [
      {
        name: 'Expenses',
        data: [],
      },
      {
        name: 'Income',
        data: [],
      },
    ],
  });
  const [maxVal, setMaxVal] = useState(0);
  
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
        fontFamily: 'Red Hat Display, sans-serif', 
        fontSize: '14px',
        fontWeight: 400,
        colors: ['#FDE047'], 
      },
    },
  },

  tooltip: {
    theme: 'dark',
    style: {
      fontFamily: 'Red Hat Display, sans-serif', 
      fontSize: '12px',
      fontWeight: 400,
    },
  },

  xaxis: {
    categories: state.categories,
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
    max: maxVal,
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
    const getHalfYearData = async () => {
      try {
        const { income, expense } = await getHalfYear();
        const months = income.map((m) => m.month);
        const incomeAmounts = income.map((a) => a.amount);
        const expenseAmounts = expense.map((a) => a.amount);
        setMaxVal(Math.max(...incomeAmounts));
        setState({
          series: [
          {
            name: 'Expenses',
            data: expenseAmounts,
          },
          {
            name: 'Income',
            data: incomeAmounts,
          },
        ],
        categories: months
      })

      } catch (e) {
        console.error('error =>', e);
      }
    };

    getHalfYearData();
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
        type="bar"
        height={350}
        width={400}
      />
    </div>
  );
};

export default SavingsChart;
