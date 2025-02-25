import { Settings } from "lucide-react"

function Header() {
  const handleLogout = () => {
    console.log("Logging out...")
    // Implement logout functionality here
  }

  const handleSettings = () => {
    console.log("Opening settings...")
    // Implement settings functionality here
  }

  return (
    <header className="header">
      <div className="branding">
        <h1 className="title">pharmacare</h1>
        <p className="subtitle">PHARMACY MANAGEMENT SYSTEM</p>
      </div>
      <div className="header-actions">
        <button className="btn btn-primary" onClick={handleLogout}>
          Log out
        </button>
        <button className="btn btn-icon" onClick={handleSettings}>
          <Settings size={20} />
        </button>
      </div>
    </header>
  )
}

export default Header

