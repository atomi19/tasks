let theme = localStorage.getItem("theme"); // get current theme from local storage
const themeSwitch = document.getElementById("themeSwitch");
const darkThemeIcon = document.getElementById("darkTheme"); // get dark mode icon
const lightThemeIcon = document.getElementById("lightTheme"); // get light mode icon

const enableDarkmode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("theme", "dark");

    lightThemeIcon.style.display = "flex"; // show light mode icon
    darkThemeIcon.style.display = "none"; // hide dark mode icon

    document.querySelectorAll(".delete-icon-light").forEach(icon => {
        icon.style.display = "flex";
    })
    
    document.querySelectorAll(".delete-icon-dark").forEach(icon => {
        icon.style.display = "none";
    })
}

const enableLightMode = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("theme", "light");

    darkThemeIcon.style.display = "flex"; // show dark mode icon
    lightThemeIcon.style.display = "none"; // hide light mode icon

    document.querySelectorAll(".delete-icon-light").forEach(icon => {
        icon.style.display = "none";
    })
    
    document.querySelectorAll(".delete-icon-dark").forEach(icon => {
        icon.style.display = "flex";
    })
}

// on page load set the correct theme
if(theme === "dark") {
    enableDarkmode();
} else {
    enableLightMode();
}

themeSwitch.addEventListener("click", () => {
    theme = localStorage.getItem("theme");

    if(theme !== "dark") {
        enableDarkmode();
    } else {
        enableLightMode();
    }
})