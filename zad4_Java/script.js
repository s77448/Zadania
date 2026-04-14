// Numer indeksu: s77448


function toggleTheme() {
    let themeLink = document.getElementById("theme-style");
    
    if (themeLink.getAttribute("href") === "green.css") {
        themeLink.setAttribute("href", "red.css");
    } else {
        themeLink.setAttribute("href", "green.css");
    }
}


function toggleSection() {
    let section = document.getElementById("skills-section");
    
    if (section.style.display === "none") {
        section.style.display = "block";
    } else {
        section.style.display = "none";
    }
}