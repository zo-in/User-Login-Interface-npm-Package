# uli-auth-backend

A plug-and-play authentication backend built with **Node.js, Express, MongoDB**, supporting **JWT-based authentication, OTP verification, password hashing (Bcrypt.js), and session management**.

## 🚀 Features

- **JWT authentication** for secure login & registration.
- **OTP verification** using Nodemailer.
- **Password hashing** with Bcrypt.js.
- **RESTful API structure** for easy integration.
- **Modular setup** to plug into any Express app.

---

## 📦 Installation

```sh
npm install uli-auth-backend

```

## 🛠 Usage

```javascript
const express = require("express");
const createAuthApp = require("uli-auth-backend");

const app = express();
const authApp = createAuthApp({
  mongoURI: "mongodb://localhost:27017/mydb",
  routePrefix: "/auth",
});

app.use(authApp);
app.listen(3000, () => console.log("Server running on port 3000"));
```

## 📜 API Endpoints

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | `/auth/register`   | Register new user   |
| POST   | `/auth/login`      | User login          |
| POST   | `/auth/verify-otp` | OTP verification    |
| GET    | `/users/profile`   | Fetch user profile  |
| DELETE | `/users/account`   | Delete user account |
