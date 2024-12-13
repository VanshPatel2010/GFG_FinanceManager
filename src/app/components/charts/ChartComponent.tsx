import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  import { Bar } from 'react-chartjs-2';
  import { FC } from 'react';  // Importing React.FC for functional component typing
  import { ChartOptions } from 'chart.js';  // Importing ChartOptions
  
  // Register the components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  interface ChartData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  }
  
  const data: ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };
  
  // Correcting the type for options
  const options: Partial<ChartOptions<'bar'>> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Correct type for legend position
      },
      title: {
        display: true,
        text: 'Sales Chart',
      },
    },
  };
  
  const ChartComponent: FC = () => {
    return <Bar options={options} data={data} />;
  };
  
  export default ChartComponent;
  