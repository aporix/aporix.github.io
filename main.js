const root = document.documentElement;
const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (storedTheme) {
  root.dataset.theme = storedTheme;
} else if (prefersDark) {
  root.dataset.theme = "dark";
}

document.querySelector("[data-year]").textContent = new Date().getFullYear();

document.querySelector("[data-theme-toggle]").addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("theme", next);
});
