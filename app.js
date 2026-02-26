let videos = [];

// Vérifie si utilisateur connecté
const user = localStorage.getItem("loggedUser");

// Charge les vidéos
fetch("videos.json")
.then(res => res.json())
.then(data => {
    videos = data;
    displayVideos(videos);
});

function displayVideos(list) {
    const container = document.getElementById("videosContainer");
    container.innerHTML = "";

    list.forEach(v => {

        const card = document.createElement("div");
        card.className = "video-card";

        card.innerHTML = `
            <img src="${v.thumbnail}">
            <h3>${v.title}</h3>
            <button onclick="play('${v.url}')">
                ▶ Regarder
            </button>
        `;

        container.appendChild(card);
    });
}

function filterBy(category) {
    if(category === "All") {
        displayVideos(videos);
    } else {
        displayVideos(videos.filter(v => v.category === category));
    }
}

document.getElementById("searchInput").oninput = function() {
    const term = this.value.toLowerCase();

    displayVideos(
        videos.filter(v =>
            v.title.toLowerCase().includes(term)
        )
    );
};

function play(url) {
    // Si utilisateur connecté → ouvrir dans onglet premium
    if(user) {
        window.open(url, "_blank");
    } 
    else {
        // Utilisateur invité
        alert("Mode invité — Fonctionne normalement");
        window.open(url, "_blank");
    }
}

function logout() {
    localStorage.removeItem("loggedUser");
    location.reload();
}
