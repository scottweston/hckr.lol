const root = document.documentElement;
const picker = document.querySelector("[data-palette-picker]");
const systemPreference = matchMedia("(prefers-color-scheme: dark)");

if (picker) {
  const options = [...picker.querySelectorAll("[data-theme-option]")];
  const autoOption = picker.querySelector("[data-theme-auto]");
  const currentLabel = picker.querySelector("[data-theme-current]");

  const readSavedTheme = () => {
    try {
      const saved = localStorage.getItem("hckr-theme");
      return options.some((option) => option.dataset.themeOption === saved) ? saved : null;
    } catch {
      return null;
    }
  };

  const systemTheme = () => {
    const preferredMode = systemPreference.matches ? "dark" : "light";
    return options.find((option) => option.dataset.themeMode === preferredMode).dataset.themeOption;
  };

  const applyTheme = (themeId, persist = false) => {
    const selected = options.find((option) => option.dataset.themeOption === themeId) || options[0];
    root.dataset.theme = selected.dataset.themeOption;
    currentLabel.textContent = selected.dataset.themeName;
    document.querySelector('meta[name="theme-color"]').content = selected.dataset.themePaper;

    for (const option of options) {
      option.setAttribute("aria-pressed", String(option === selected));
    }

    if (persist) {
      try { localStorage.setItem("hckr-theme", selected.dataset.themeOption); } catch {}
    }

    autoOption.setAttribute("aria-pressed", String(!readSavedTheme()));
  };

  const closePicker = () => {
    picker.open = false;
    picker.querySelector("summary").focus();
  };

  for (const option of options) {
    option.addEventListener("click", () => {
      applyTheme(option.dataset.themeOption, true);
      autoOption.setAttribute("aria-pressed", "false");
      closePicker();
    });
  }

  autoOption.addEventListener("click", () => {
    try { localStorage.removeItem("hckr-theme"); } catch {}
    applyTheme(systemTheme());
    autoOption.setAttribute("aria-pressed", "true");
    closePicker();
  });

  systemPreference.addEventListener("change", () => {
    if (!readSavedTheme()) applyTheme(systemTheme());
  });

  document.addEventListener("click", (event) => {
    if (picker.open && !picker.contains(event.target)) picker.open = false;
  });

  picker.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePicker();
  });

  applyTheme(readSavedTheme() || systemTheme());
}
