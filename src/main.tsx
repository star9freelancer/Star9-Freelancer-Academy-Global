// Initialize dark mode from localStorage before render
if (localStorage.getItem("star9-dark-mode") === "true") {
  document.documentElement.classList.add("dark");
}

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
