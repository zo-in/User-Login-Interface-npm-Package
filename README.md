# ULI-Auth (User Login Interface)

A modular authentication system providing both **backend (Express, MongoDB)** and **frontend (React, Tailwind CSS)** authentication components.

## 📦 Packages

- 🛠 **Backend:** [uli-auth-backend](https://www.npmjs.com/package/uli-auth-backend)
- 🎨 **Frontend:** [uli-auth-frontend](https://www.npmjs.com/package/uli-auth-frontend)

## 🚀 Installation

```sh
npm install uli-auth-backend uli-auth-frontend
```

## 🛠 Usage Example

### Backend (Express)

```javascript
const express = require("express");
const createAuthApp = require("uli-auth-backend");

const app = express();
const authApp = createAuthApp({ mongoURI: "mongodb://localhost:27017/mydb", routePrefix: "/auth" });

app.use(authApp);
app.listen(3000, () => console.log("Server running on port 3000"));
```

### Frontend (React)

```javascript
import AuthApp from "uli-auth-frontend";

function App() {
  return <AuthApp apiUrl="https://your-backend.com/api" />;
}

export default App;
```

## 📜 API Endpoints

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | `/auth/register`   | Register new user   |
| POST   | `/auth/login`      | User login          |
| POST   | `/auth/verify-otp` | OTP verification    |
| GET    | `/users/profile`   | Fetch user profile  |
| DELETE | `/users/account`   | Delete user account |

## 📄 License

MIT
