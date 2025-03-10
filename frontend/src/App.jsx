import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import AuthPage from "./pages/AuthPage"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={
              <>
                <Sidebar />
                <main className="main-content">
                  <Dashboard />
                </main>
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      <style>{`
        .app {
          display: flex;
        }

        .main-content {
          flex: 1;
          margin-left: 250px;
          padding: 20px;
          min-height: 100vh;
          background-color: #f9fafb;
        }

        /* Remove margin for AuthPage */
        .app > :first-child {
          margin-left: 0;
        }
      `}</style>
    </Router>
  )
}

export default App

