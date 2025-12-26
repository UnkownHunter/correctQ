import { create } from "zustand";

export const cqStore = create((set) => ({
  theme: "default",

  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
    document.documentElement.setAttribute("data-theme", theme);
  },

  loadTheme: () => {
    const saved = localStorage.getItem("theme") || "default";
    set({ theme: saved });
    document.documentElement.setAttribute("data-theme", saved);
  },
}));
export default cqStore;
