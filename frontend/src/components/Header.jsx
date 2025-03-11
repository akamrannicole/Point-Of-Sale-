"use client"

import { useState } from "react"
import { Search, Settings } from "react-feather"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", searchQuery)
  }

  const handleLogout = () => {
    // Implement logout functionality here
    navigate("/")
  }

  return (
    <header className="header">
      <div className="header-left">
        <div className="profile-icon">
          <img src="/placeholder.svg" alt="Profile" className="profile-image" />
        </div>
        <span className="user-role">Pharmacist</span>
      </div>

      <div className="header-right">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <Search size={18} />
              Search
            </button>
          </div>
        </form>

        <button onClick={handleLogout} className="logout-button">
          Log out
        </button>

        <button className="settings-button">
          <Settings size={20} />
        </button>
      </div>

      <style>{`
        .header {
          background-color:#1f2937;
          height: 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          position: fixed;
          top: 0;
          right: 0;
          left: 250px; /* Width of sidebar */
          z-index: 100;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .profile-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #666;
          overflow: hidden;
        }

        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .user-role {
          color: white;
          font-size: 16px;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .search-form {
          margin-right: 8px;
        }

        .search-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .search-input {
          width: 300px;
          height: 36px;
          padding: 0 12px;
          border: none;
          border-radius: 4px;
          font-size: 14px;
        }

        .search-input:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(0, 181, 173, 0.2);
        }

        .search-button {
          height: 36px;
          padding: 0 16px;
          background-color: white;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.2s;
        }

        .search-button:hover {
          background-color: #f3f4f6;
        }

        .logout-button {
          height: 36px;
          padding: 0 16px;
          background-color: #00B5AD;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .logout-button:hover {
          background-color: #009c95;
        }

        .settings-button {
          width: 36px;
          height: 36px;
          padding: 0;
          background-color: #00B5AD;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }

        .settings-button:hover {
          background-color: #009c95;
        }
      `}</style>
    </header>
  )
}

export default Header

