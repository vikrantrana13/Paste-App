// src/utils/theme.js
function apply(mode) {
  document.documentElement.classList.toggle("dark", mode === "dark");
  localStorage.setItem("theme", mode);
}

export function initTheme() {
  const saved = localStorage.getItem("theme");
  apply(saved === "dark" ? "dark" : "light");
}

export function toggleTheme() {
  const isDark = document.documentElement.classList.contains("dark");
  const mode = isDark ? "light" : "dark";
  apply(mode);
  return mode; // "light" | "dark"
}

export function setTheme(mode) {
  apply(mode); // use this if you ever want a hard set
}
