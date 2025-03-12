import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import AuthPage from "./pages/AuthPage"
import Dashboard from "./pages/Dashboard"
import Header from "./components/Header"

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/dashboard" element={<> <Sidebar /> <Header/>
                <main className="main-content">
                  <Dashboard />
                </main>
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

     
    </Router>
  )
}

export default App

