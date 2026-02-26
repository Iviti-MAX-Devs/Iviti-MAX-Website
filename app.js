let videos = [];

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
      <img src="${v.thumbnail}" alt="${v.title}">
      <h3>${v.title}</h3>
      <button onclick="play('${v.url}')">▶ Regarder</button>
    `;

    container.appendChild(card);
  });
}

function filterBy(category) {
  if (category === "All") {
    displayVideos(videos);
  } else {
    displayVideos(videos.filter(v => v.category === category));
  }
}

function play(url) {
  window.open(url, "_blank");
}

document.getElementById("searchInput").oninput = function () {
  const term = this.value.toLowerCase();
  displayVideos(
    videos.filter(v =>
      v.title.toLowerCase().includes(term)
    )
  );
};
