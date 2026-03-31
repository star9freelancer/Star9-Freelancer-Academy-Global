// Initialize dark mode from localStorage or system preference before render
const storedTheme = localStorage.getItem("star9-dark-mode");
if (storedTheme === "true" || (storedTheme === null && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
