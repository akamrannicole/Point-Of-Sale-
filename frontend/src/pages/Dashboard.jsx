"use client"

import { useState, useEffect } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    ordersAvailable: 0,
    verifiedOrders: 0,
    pickedUpOrders: 0,
  })

  const [expiringItems, setExpiringItems] = useState([])
  const [outOfStock, setOutOfStock] = useState([])
  const [lowStock, setLowStock] = useState([])
  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: [],
  })

  const fetchData = async () => {
    try {
      // Replace these with actual API calls
      const statsResponse = await fetch("/api/stats")
      const statsData = await statsResponse.json()
      setStats(statsData)

      const expiringResponse = await fetch("/api/expiring-items")
      const expiringData = await expiringResponse.json()
      setExpiringItems(expiringData)

      const outOfStockResponse = await fetch("/api/out-of-stock")
      const outOfStockData = await outOfStockResponse.json()
      setOutOfStock(outOfStockData)

      const lowStockResponse = await fetch("/api/low-stock")
      const lowStockData = await lowStockResponse.json()
      setLowStock(lowStockData)

      const salesResponse = await fetch("/api/sales")
      const salesData = await salesResponse.json()
      setSalesData(salesData)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 5000) // Update every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
          font: { size: 10 },
        },
      },
      title: {
        display: true,
        text: "Sales per Drug",
        color: "#fff",
        font: { size: 14 },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: { color: "#fff", font: { size: 10 } },
      },
      y: {
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: { color: "#fff", font: { size: 10 } },
      },
    },
  }

  const StatCard = ({ title, value }) => (
    <div className="stat-card">
      <h3>{title}</h3>
      <div className="stat-value">
        <span>{value}</span>
      </div>
    </div>
  )

  const NotificationList = ({ title, items, viewMoreText }) => (
    <div className="notification-panel">
      <h3>{title}</h3>
      <div className="notification-items">
        {items.map((item, index) => (
          <div key={index} className="notification-item">
            <div>Name: {item.name}</div>
            <div>Batch Id: {item.batchId}</div>
          </div>
        ))}
      </div>
      <button className="view-more-btn">{viewMoreText}</button>
    </div>
  )

  return (
    <div className="dashboard">
      <div className="stats-container">
        <StatCard title="DOCTOR USER STATS" value={stats.totalDoctors} />
        <StatCard title="DOCTOR ORDER STATS" value={stats.ordersAvailable} />
        <StatCard title="DOCTOR VERIFIED ORDER STATS" value={stats.verifiedOrders} />
        <StatCard title="DOCTOR PICKEDUP ORDER STATS" value={stats.pickedUpOrders} />
      </div>

      <div className="dashboard-grid">
        <NotificationList
          title="Expire Date Notification"
          items={expiringItems}
          viewMoreText="View Expire Date Notifications"
        />

        <div className="sales-chart">
          <h3>Sales Information Chart</h3>
          <div className="chart-container">
            <Bar data={salesData} options={options} />
          </div>
        </div>

        <NotificationList
          title="Out of Stock Notification"
          items={outOfStock}
          viewMoreText="View Out of Stock Notifications"
        />
      </div>

      <div className="dashboard-grid">
        <div className="drug-chart">
          <h3>Drug Quantity Chart</h3>
          <div className="chart-container">
            <Bar data={salesData} options={options} />
          </div>
        </div>

        <NotificationList
          title="About To Get Finished Notification"
          items={lowStock}
          viewMoreText="View Low Stock Notifications"
        />
      </div>

      <style>{`
        .dashboard {
           min-height: 100vh; 
           background: #f9fafb; 
           padding: 70px; 
           max-width: 700px; 
           margin: 0 auto; 
       }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(155px, 0.5fr));
          gap: 15px;
          margin-bottom: 15px;
        }

        .stat-card {
          background: #1f2937;
          padding: 15px;
          border-radius: 8px;
          color: white;
          position: relative;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #a8e6cf;
          z-index: -1;
          padding: 5px;
        }

        .stat-value {
          font-size: 1.8rem;
          font-weight: bold;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          gap: 15px;
          margin-bottom: 15px;
        }

        .notification-panel {
          background: white;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .notification-items {
          margin: 10px 0;
        }

        .notification-item {
          background: #f3f4f6;
          padding: 8px;
          margin-bottom: 8px;
          border-radius: 4px;
          font-size: 0.9rem;
        }

        .view-more-btn {
          width: 100%;
          padding: 8px;
          background: #00b5ad;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
          font-size: 0.9rem;
        }

        .view-more-btn:hover {
          background: #009c95;
        }

        .sales-chart, .drug-chart {
          background: #1f2937;
          padding: 15px;
          border-radius: 8px;
          color: white;
        }

        .chart-container {
          height: 250px;
          position: relative;
        }

        h3 {
          margin: 0 0 10px 0;
          font-size: 1rem;
          color: #4a5568;
        }

        .sales-chart h3, .drug-chart h3 {
          color: white;
        }

        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default Dashboard

