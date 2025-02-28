# uli-auth-frontend

A reusable **React authentication component** that provides **sign-in, sign-up, and OTP verification UI**, built with **React.js and Tailwind CSS**.

## 🚀 Features

- **Prebuilt UI for authentication**
- **Handles login, registration, and OTP verification**
- **Customizable API endpoint for backend**
- **Styled with Tailwind CSS**
- **Easy plug-and-play component**

## 📦 Installation

```sh
npm install uli-auth-frontend
```

## 🛠 Usage

```javascript
import AuthApp from "uli-auth-frontend";

function App() {
  return <AuthApp apiUrl="https://your-backend.com/api" />;
}

export default App;
```

## ⚙️ Customization

You can pass a custom API URL dynamically:

```javascript
<AuthApp apiUrl="https://custom-backend.com/api" />
```
