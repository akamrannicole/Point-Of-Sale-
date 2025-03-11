"use client"

import { useState, useEffect } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 12,
    ordersAvailable: 4,
    verifiedOrders: 3,
    pickedUpOrders: 34,
  })

  const [expiringItems, setExpiringItems] = useState([
    { name: "Panadol", batchId: "123213N" },
    { name: "Citazin", batchId: "10298329N" },
    { name: "Metformin", batchId: "1298319N" },
    { name: "Chloroperi Hybanate", batchId: "8654654N" },
  ])

  const [outOfStock, setOutOfStock] = useState([
    { name: "Amoxillin", batchId: "547547654N" },
    { name: "Demo1", batchId: "109283231L" },
  ])

  const [lowStock, setLowStock] = useState([
    { name: "Citazin", batchId: "10298329N" },
    { name: "Ornithrazole", batchId: "86545465N" },
  ])

  // Sales data
  const salesData = {
    labels: ["Jan-2020", "Feb-2020", "Mar-2020", "Apr-2020", "May-2020", "Jun-2020", "Jul-2020"],
    datasets: [
      {
        label: "Amoxillin",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "#4A90E2",
      },
      {
        label: "Citazin",
        data: [45, 79, 50, 41, 86, 35, 80],
        backgroundColor: "#00B5AD",
      },
      {
        label: "Metformin",
        data: [35, 49, 60, 71, 46, 45, 30],
        backgroundColor: "#F6AD55",
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#fff",
        },
      },
      title: {
        display: true,
        text: "Sales with respective to each Drug",
        color: "#fff",
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
        },
      },
    },
  }

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update stats randomly
      setStats((prev) => ({
        ...prev,
        ordersAvailable: Math.floor(Math.random() * 10),
        verifiedOrders: Math.floor(Math.random() * 8),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const StatCard = ({ title, value }) => (
    <div className="stat-card">
      <h3>{title}</h3>
      <div className="stat-value">
        <span>{value}</span>
        <img src="/mongodb.png" alt="MongoDB" className="mongodb-logo" />
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
        <StatCard title="DOCTOR ODER STATS" value={stats.ordersAvailable} />
        <StatCard title="DOCTOR VERIFIED ODER STATS" value={stats.verifiedOrders} />
        <StatCard title="DOCTOR PICKEDUP ODER STATS" value={stats.pickedUpOrders} />
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
            <Bar
              data={{
                ...salesData,
                datasets: salesData.datasets.map((dataset) => ({
                  ...dataset,
                  data: dataset.data.map(() => Math.floor(Math.random() * 1000)),
                })),
              }}
              options={options}
            />
          </div>
        </div>

        <NotificationList
          title="About To Get Finished Notification"
          items={lowStock}
          viewMoreText="View Low Stock Notifications"
        />
      </div>

      <style jsx>{`
        .dashboard {
          min-height: 100vh;
          background: #f9fafb;
          padding: 80px;
        }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }

        .stat-card {
          background: #1f2937;
          padding: 20px;
          border-radius: 8px;
          color: white;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
          padding: 10px;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: bold;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .mongodb-logo {
          width: 24px;
          height: 24px;
          opacity: 0.5;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .notification-panel {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .notification-items {
          margin: 15px 0;
        }

        .notification-item {
          background: #f3f4f6;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 4px;
        }

        .view-more-btn {
          width: 100%;
          padding: 10px;
          background: #00b5ad;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .view-more-btn:hover {
          background: #009c95;
        }

        .sales-chart, .drug-chart {
          background: #1f2937;
          padding: 20px;
          border-radius: 8px;
          color: white;
        }

        .chart-container {
          height: 300px;
          position: relative;
        }

        h3 {
          margin: 0 0 15px 0;
          font-size: 1rem;
          color: #4a5568;
        }

        .sales-chart h3, .drug-chart h3 {
          color: white;
        }
      `}</style>
    </div>
  )
}

export default Dashboard

