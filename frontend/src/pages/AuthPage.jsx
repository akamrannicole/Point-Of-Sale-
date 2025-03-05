"use client"

import { useState, useRef } from "react"

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const fileInputRef = useRef(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "pharmacist",
    rememberMe: false,
  })
  const [error, setError] = useState("")

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (isSignUp && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log(isSignUp ? "Sign Up:" : "Sign In:", formData)
      // Redirect to dashboard
      window.location.href = "/dashboard.html"
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp)
    setError("")
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #E5E7EB",
    borderRadius: "4px",
    fontSize: "14px",
    boxSizing: "border-box",
  }

  const passwordInputStyle = {
    ...inputStyle,
    paddingRight: "40px",
  }

  const toggleButtonStyle = {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    color: "#4A90E2",
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #4A90E2 0%, #1B2434 100%)",
        position: "relative",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      {/* Decorative background elements */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "120%",
          height: "120%",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 10%, transparent 10.5%)",
          backgroundSize: "15px 15px",
          transform: "rotate(15deg)",
          pointerEvents: "none",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "-50%",
          right: "-25%",
          width: "80%",
          height: "80%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,181,173,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      ></div>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          padding: "25px",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "320px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(8px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            color: "#4A90E2",
            marginBottom: "20px",
          }}
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>

        <div
          onClick={handleImageClick}
          style={{
            width: "80px",
            height: "80px",
            margin: "0 auto 20px",
            borderRadius: "50%",
            border: "2px solid #E5E7EB",
            overflow: "hidden",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <img
            src={profileImage || "https://via.placeholder.com/80"}
            alt="Profile"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>

        {isSignUp && (
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />
          </div>
        )}

        <div style={{ marginBottom: "15px" }}>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: "15px", position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Your Password"
            value={formData.password}
            onChange={handleInputChange}
            style={passwordInputStyle}
            required
          />
          <button type="button" onClick={togglePasswordVisibility} style={toggleButtonStyle}>
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {isSignUp && (
          <div style={{ marginBottom: "15px", position: "relative" }}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              style={passwordInputStyle}
              required
            />
            <button type="button" onClick={toggleConfirmPasswordVisibility} style={toggleButtonStyle}>
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>
        )}

        {isSignUp && (
          <div style={{ marginBottom: "15px" }}>
            <select name="role" value={formData.role} onChange={handleInputChange} style={inputStyle} required>
              <option value="pharmacist">Pharmacist</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}

        {!isSignUp && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
              fontSize: "12px",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                color: "#6B7280",
              }}
            >
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                style={{ marginRight: "6px" }}
              />
              Remember me
            </label>
            <a
              href="#forgot-password"
              style={{
                color: "#4A90E2",
                textDecoration: "none",
                fontSize: "12px",
              }}
            >
              Forgot Password?
            </a>
          </div>
        )}

        {error && (
          <div
            style={{
              color: "#EF4444",
              textAlign: "center",
              marginBottom: "15px",
              fontSize: "12px",
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#00B5AD",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "background-color 0.3s",
          }}
        >
          {isLoading ? (
            <div
              style={{
                width: "16px",
                height: "16px",
                border: "2px solid #ffffff",
                borderTop: "2px solid transparent",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            ></div>
          ) : isSignUp ? (
            "Sign Up"
          ) : (
            "Sign In"
          )}
        </button>

        <div
          style={{
            marginTop: "15px",
            textAlign: "center",
            fontSize: "13px",
          }}
        >
          <span style={{ color: "#6B7280" }}>{isSignUp ? "Already have an account?" : "Don't have an account?"} </span>
          <a
            href="#"
            onClick={toggleAuthMode}
            style={{
              color: "#4A90E2",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </a>
        </div>
      </form>

      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <span style={{ color: "#63B3ED" }}>ST</span>
          <span style={{ color: "#00B5AD" }}>yrel</span>
        </span>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default AuthPage

