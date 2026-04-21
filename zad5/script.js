// Numer indeksu: s77448

// --- ZADANIE 4: Zmiana motywu i ukrywanie sekcji ---

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

// --- ZADANIE 5: Walidacja formularza kontaktowego ---

document.getElementById("contact-form").addEventListener("submit", function(event) {
    
    event.preventDefault(); 

    let imie = document.getElementById("imie").value.trim();
    let nazwisko = document.getElementById("nazwisko").value.trim();
    let email = document.getElementById("email").value.trim();
    let wiadomosc = document.getElementById("wiadomosc").value.trim();
    
    let messageBox = document.getElementById("form-message");
    messageBox.style.color = "red"; 

    if (imie === "" || nazwisko === "" || email === "" || wiadomosc === "") {
        messageBox.innerText = "Błąd: Wszystkie pola są wymagane!";
        return; 
    }

    let hasNumbers = /\d/;
    if (hasNumbers.test(imie) || hasNumbers.test(nazwisko)) {
        messageBox.innerText = "Błąd: Imię i nazwisko nie mogą zawierać cyfr!";
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        messageBox.innerText = "Błąd: Podaj poprawny adres e-mail!";
        return;
    }

    messageBox.style.color = "green";
    messageBox.innerText = "Sukces: Formularz został wypełniony poprawnie!";
});