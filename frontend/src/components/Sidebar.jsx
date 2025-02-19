"use client"

import { useState } from "react"
import {
  LayoutGrid,
  ClipboardList,
  ShoppingCart,
  Box,
  BarChart3,
  PieChart,
  Package,
  AlertTriangle,
  Settings,
} from "lucide-react"

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  topHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#2D3748",
    color: "white",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    height: "64px",
  },
  branding: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    color: "#4FD1C5",
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
    padding: 0,
    letterSpacing: "1px",
  },
  subtitle: {
    color: "#A0AEC0",
    fontSize: "12px",
    margin: "5px 0 0 0",
    padding: 0,
    letterSpacing: "0.5px",
  },
  middleSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#4A5568",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#CBD5E0",
  },
  pharmacistText: {
    marginLeft: "8px",
    color: "#CBD5E0",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  searchInput: {
    padding: "8px 12px",
    borderRadius: "4px",
    border: "1px solid #4A5568",
    backgroundColor: "white",
    color: "#2D3748",
    width: "200px",
  },
  searchButton: {
    padding: "8px 16px",
    borderRadius: "4px",
    border: "1px solid #4A5568",
    backgroundColor: "white",
    color: "#2D3748",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  logoutButton: {
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#00B5AD",
    color: "white",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  settingsButton: {
    padding: "8px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#00B5AD",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    display: "flex",
    height: "calc(100vh - 64px)",
  },
  sidebar: {
    width: "250px",
    height: "100%",
    backgroundColor: "#1B2434",
    color: "#ffffff",
    borderRight: "1px solid rgba(255,255,255,0.1)",
  },
  nav: {
    listStyle: "none",
    padding: "20px 0",
    margin: 0,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px 20px",
    color: "#ffffff",
    textDecoration: "none",
    transition: "background-color 0.2s",
    cursor: "pointer",
  },
  navItemHover: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  icon: {
    width: "20px",
    height: "20px",
    marginRight: "15px",
  },
  navText: {
    fontSize: "16px",
    fontWeight: "400",
  },
  mainContent: {
    flex: 1,
    backgroundColor: "white",
  },
}

const navItems = [
  { title: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
  { title: "Doctor Orders", icon: ClipboardList, path: "/orders" },
  { title: "PoS", icon: ShoppingCart, path: "/pos" },
  { title: "Suppliers", icon: Package, path: "/suppliers" },
  { title: "Prediction Report", icon: BarChart3, path: "/prediction" },
  { title: "Sales Report", icon: PieChart, path: "/sales" },
  { title: "Inventory", icon: Box, path: "/inventory" },
  { title: "Expired", icon: AlertTriangle, path: "/expired" },
]

function Sidebar() {
  const [hoveredItem, setHoveredItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const handleClick = (path) => {
    // Handle navigation here
    console.log(`Navigating to: ${path}`)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    console.log("Searching for:", searchTerm)
    // Implement search functionality here
  }

  const handleLogout = () => {
    console.log("Logging out...")
    // Implement logout functionality here
  }

  const handleSettings = () => {
    console.log("Opening settings...")
    // Implement settings functionality here
  }

  return (
    <div style={styles.container}>
      {/* Top Header */}
      <header style={styles.topHeader}>
        <div style={styles.branding}>
          <h1 style={styles.title}>pharmacare</h1>
          <p style={styles.subtitle}>PHARMACY MANAGEMENT SYSTEM</p>
        </div>

        <div style={styles.middleSection}>
          <div style={styles.avatar}>
            <span>P</span>
          </div>
          <span style={styles.pharmacistText}>Pharmacist</span>
        </div>

        <div style={styles.rightSection}>
          <form style={styles.searchContainer} onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search"
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" style={styles.searchButton}>
              Search
            </button>
          </form>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Log out
          </button>
          <button style={styles.settingsButton} onClick={handleSettings}>
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Main Container with Sidebar and Content */}
      <div style={styles.mainContainer}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <nav style={styles.nav}>
            {navItems.map((item, index) => (
              <a
                key={index}
                onClick={() => handleClick(item.path)}
                style={{
                  ...styles.navItem,
                  ...(hoveredItem === index ? styles.navItemHover : {}),
                }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <item.icon style={styles.icon} />
                <span style={styles.navText}>{item.title}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Main Content - Empty White Background */}
        <div style={styles.mainContent}></div>
      </div>
    </div>
  )
}

export default Sidebar

