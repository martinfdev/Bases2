import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const DiagnosticsChart = ({ data }) => {
  if (!Array.isArray(data)) {
    return <div className="text-red-500">Error: Los datos proporcionados no son válidos.</div>
  }

  const chartData = {
    labels: data.map(item => item.diagnostico),
    datasets: [
      {
        label: 'Frecuencia de Diagnósticos',
        data: data.map(item => item.frecuencia),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Frecuencia de Diagnósticos',
      },
    },
  }

  return (
    <div className="p-4 bg-gray-100 h-full">
      <h2 className="text-2xl font-bold mb-4">Gráfica de Diagnósticos</h2>
      <div className="bg-white p-4 shadow rounded">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}

DiagnosticsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      diagnostico: PropTypes.string.isRequired,
      frecuencia: PropTypes.number.isRequired,
    })
  ).isRequired,
}

export default DiagnosticsChart
