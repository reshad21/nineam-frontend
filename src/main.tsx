import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { Toaster } from "react-hot-toast"

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
      <Toaster position="top-right" />
    </React.StrictMode>,
  );
} else {
  throw new Error('Root element with id "root" not found');
}
