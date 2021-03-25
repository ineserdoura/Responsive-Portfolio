// dark mode

// dark mode based on system preferences
const body = document.querySelector("body");
const darkModeButton = document.querySelector("#dark-mode");
const darkModeIcon = document.querySelector("#dark-mode > i");

//verify if the browser supports matchMedia and verify if the condition of the color scheme dark matches

const userPrefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
const userPrefersLight =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches;

if (userPrefersDark) {
  darkMode();
} else if (userPrefersLight) {
  lightMode();
}

// dark mode button

const currentBodyClass = body.classList;
// add event listener to button
darkModeButton.addEventListener("click", () => {
  if (currentBodyClass == "light-theme") {
    darkMode();
  } else if (currentBodyClass == "dark-theme") {
    lightMode();
  }
});

function darkMode() {
  body.classList.remove("light-theme");
  body.classList.add("dark-theme");
  darkModeIcon.classList.remove(`fa-moon`);
  darkModeIcon.classList.add(`fa-sun`);
}

function lightMode() {
  body.classList.remove("dark-theme");
  body.classList.add("light-theme");
  darkModeIcon.classList.remove(`fa-sun`);
  darkModeIcon.classList.add(`fa-moon`);
}
