/**
 * Theme utilities for managing light/dark mode
 */

type Theme = "light" | "dark";
type StoredTheme = Theme | "system";

/**
 * Get the theme value stored in localStorage
 * Returns "system" if no explicit preference is set
 */
export function getStoredTheme(): StoredTheme {
  if ("theme" in localStorage) {
    return localStorage.theme as Theme;
  }
  return "system";
}

/**
 * Check if the user's system prefers dark mode
 */
function systemPrefersDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/**
 * Determine if dark mode should be active based on stored preference and system settings
 */
function shouldUseDarkMode(): boolean {
  const storedTheme = localStorage.theme;

  // User explicitly chose dark mode
  if (storedTheme === "dark") {
    return true;
  }

  // User explicitly chose light mode
  if (storedTheme === "light") {
    return false;
  }

  // No preference stored - follow system preference
  return systemPrefersDark();
}

/**
 * Apply the appropriate theme to the document
 */
function applyTheme(): void {
  const isDark = shouldUseDarkMode();
  const theme: Theme = isDark ? "dark" : "light";
  document.documentElement.dataset.theme = theme;
}

/**
 * Set the theme preference in localStorage
 * Pass "system" to remove the stored preference and follow system settings
 */
export function setThemePreference(theme: StoredTheme): void {
  if (theme === "system") {
    localStorage.removeItem("theme");
  } else {
    localStorage.theme = theme;
  }
  applyTheme();
}

/**
 * Listen for system theme changes and apply when in "system" mode
 */
export function listenForSystemThemeChanges(): void {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const hasExplicitPreference = "theme" in localStorage;
      if (!hasExplicitPreference) {
        applyTheme();
      }
    });
}
