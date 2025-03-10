import { Link, useLocation } from "react-router-dom"
import {
  BarChart2,
  Users,
  Plus,
  Truck,
  TrendingUp,
  PieChart,
  Package,
  AlertTriangle,
  AlertOctagon,
} from "react-feather"

const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    { path: "/dashboard", icon: BarChart2, label: "Dashboard" },
    { path: "/doctor-orders", icon: Users, label: "Doctor Orders" },
    { path: "/pos", icon: Plus, label: "PoS" },
    { path: "/suppliers", icon: Truck, label: "Suppliers" },
    { path: "/prediction-report", icon: TrendingUp, label: "Prediction Report" },
    { path: "/sales-report", icon: PieChart, label: "Sales Report" },
    { path: "/inventory", icon: Package, label: "Inventory" },
    { path: "/expired", icon: AlertOctagon, label: "Expired" },
    { path: "/out-of-stock", icon: AlertTriangle, label: "Out of Stock" },
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">pharmacare</h1>
        <p className="subtitle">PHARMACY MANAGEMENT SYSTEM</p>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <style>{`
        .sidebar {
          width: 250px;
          height: 100vh;
          background-color: #333333;
          position: fixed;
          left: 0;
          top: 0;
          color: white;
          padding: 20px 0;
          display: flex;
          flex-direction: column;
          z-index: 1000;
        }

        .sidebar-header {
          padding: 0 20px;
          margin-bottom: 30px;
        }

        .logo {
          color: #3B82F6;
          font-size: 24px;
          margin: 0;
          font-weight: 500;
        }

        .subtitle {
          color: #9CA3AF;
          font-size: 12px;
          margin: 5px 0 0 0;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          color: white;
          text-decoration: none;
          transition: background-color 0.2s;
          gap: 12px;
        }

        .nav-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .nav-item.active {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .nav-item svg {
          min-width: 20px;
        }

        .nav-item span {
          font-size: 14px;
        }
      `}</style>
    </div>
  )
}

export default Sidebar

