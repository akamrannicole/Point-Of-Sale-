"use client"

import { useState } from "react"

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const navbarStyle = {
    backgroundColor: "#008080",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  }

  const logoStyle = {
    fontSize: "24px",
    fontWeight: "bold",
  }

  const navItemsStyle = {
    display: "flex",
    gap: "20px",
  }

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  }

  const dropdownStyle = {
    position: "relative",
    display: "inline-block",
  }

  const dropdownContentStyle = {
    display: isDropdownOpen ? "block" : "none",
    position: "absolute",
    backgroundColor: "white",
    minWidth: "160px",
    boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
    zIndex: 1,
    right: 0,
    borderRadius: "5px",
  }

  const dropdownItemStyle = {
    color: "#008080",
    padding: "12px 16px",
    textDecoration: "none",
    display: "block",
  }

  return (
    <nav style={navbarStyle}>
      <div style={logoStyle}>
        <a href="/" style={linkStyle}>
          POS Pharmacy
        </a>
      </div>
      <div style={navItemsStyle}>
        <a href="/" style={linkStyle}>
          Dashboard
        </a>
        <a href="/inventory" style={linkStyle}>
          Inventory
        </a>
        <a href="/billing" style={linkStyle}>
          Billing & Invoices
        </a>
        <a href="/notifications" style={linkStyle}>
          🔔
        </a>
        <div style={dropdownStyle}>
          <button onClick={toggleDropdown} style={linkStyle}>
            Profile ▼
          </button>
          <div style={dropdownContentStyle}>
            <a href="/profile" style={dropdownItemStyle}>
              Profile
            </a>
            <a href="/settings" style={dropdownItemStyle}>
              Settings
            </a>
            <a href="/logout" style={dropdownItemStyle}>
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

