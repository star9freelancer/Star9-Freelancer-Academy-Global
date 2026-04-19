/**
 * Star9 Theme Utility
 * Centralized dark/light mode management that works across all pages.
 */

const STORAGE_KEY = "star9-dark-mode";

export const getStoredTheme = (): boolean => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored !== null) return stored === "true";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export const applyTheme = (isDark: boolean) => {
  document.documentElement.classList.toggle("dark", isDark);
  localStorage.setItem(STORAGE_KEY, String(isDark));
};

export const toggleTheme = (): boolean => {
  const current = document.documentElement.classList.contains("dark");
  const next = !current;
  applyTheme(next);
  return next;
};

export const isDark = (): boolean =>
  document.documentElement.classList.contains("dark");
