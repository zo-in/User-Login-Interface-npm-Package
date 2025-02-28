import React, { useState } from "react";
import { AlertCircle, User, Mail, Building, Calendar } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";

const AuthApp = ({ apiUrl }) => {
  const [view, setView] = useState("auth");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    companyName: "",
    dateOfBirth: "",
    profileImage: null,
    otp: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "profileImage" && files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = isLogin ? "login" : "register";
      const url = `${apiUrl}/auth/${endpoint}`;
      const options = isLogin
        ? {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          }
        : {
            method: "POST",
            body: new FormData(
              Object.entries(formData).reduce((fd, [key, val]) => {
                if (val !== null) fd.append(key, val);
                return fd;
              }, new FormData())
            ),
          };

      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);
      isLogin ? setOtpSent(true) : setIsLogin(true);
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Sign in" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
          required
        />
        <button type="submit">{isLogin ? "Sign In" : "Register"}</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AuthApp;
