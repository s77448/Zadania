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

// --- ZADANIE 5 i 8: Walidacja formularza i wysyłanie na serwer (POST) ---

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

    // --- ZADANIE 8: Wysłanie danych metodą POST ---
    
    messageBox.style.color = "blue";
    messageBox.innerText = "Wysyłanie na serwer...";

   
    let formData = {
        imie: imie,
        nazwisko: nazwisko,
        email: email,
        wiadomosc: wiadomosc
    };

    // webhook.site
    let backendURL = "https://webhook.site/4c81c1fa-c4bb-48ad-a3db-b9d1a085d2ec";

   
    fetch(backendURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData) 
    })
    .then(response => {
        messageBox.style.color = "green";
        messageBox.innerText = "Sukces: Dane zostały wysłane na serwer!";
        document.getElementById("contact-form").reset(); 
    })
    .catch(error => {
        messageBox.style.color = "red";
        messageBox.innerText = "Błąd połączenia z serwerem.";
    });
});

// --- ZADANIE 6: Pobieranie danych JSON ---
function loadData() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            let skillsList = document.getElementById('skills-list');
            if(skillsList) {
                data.umiejetnosci.forEach(skill => {
                    let li = document.createElement('li');
                    li.innerText = skill;
                    skillsList.appendChild(li);
                });
            }

            let projectsList = document.getElementById('projects-list');
            if(projectsList) {
                data.projekty.forEach(project => {
                    let li = document.createElement('li');
                    li.innerText = project;
                    projectsList.appendChild(li);
                });
            }
        })
        .catch(error => console.error('Błąd:', error));
}
loadData();


// --- ZADANIE 7: Local Storage ---
function loadNotes() {
    let notesList = document.getElementById("notes-list");
    if(!notesList) return;
    notesList.innerHTML = ""; 
    
    let savedNotes = JSON.parse(localStorage.getItem("myNotes")) || [];
    
    savedNotes.forEach((note, index) => {
        let li = document.createElement("li");
        li.innerText = note + " ";
        
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Usuń";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.style.cursor = "pointer";
        
        deleteBtn.onclick = function() {
            deleteNote(index);
        };
        
        li.appendChild(deleteBtn);
        notesList.appendChild(li);
    });
}

function addNote() {
    let input = document.getElementById("note-input");
    let newNote = input.value.trim();
    
    if (newNote === "") return; 
    
    let savedNotes = JSON.parse(localStorage.getItem("myNotes")) || [];
    savedNotes.push(newNote); 
    
    localStorage.setItem("myNotes", JSON.stringify(savedNotes)); 
    
    input.value = ""; 
    loadNotes(); 
}

function deleteNote(index) {
    let savedNotes = JSON.parse(localStorage.getItem("myNotes")) || [];
    savedNotes.splice(index, 1); 
    
    localStorage.setItem("myNotes", JSON.stringify(savedNotes));
    loadNotes(); 
}

loadNotes();