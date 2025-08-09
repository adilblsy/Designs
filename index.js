document.getElementById("toggleButton").addEventListener("click", function() {
    let floatingBar = document.getElementById("floatingBar");
    floatingBar.style.display = (floatingBar.style.display === "block") ? "none" : "block";
});

document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js")
            .then(() => console.log("Service Worker Registered"))
            .catch((error) => console.log("Service Worker Registration Failed:", error));
    });
}

// ------------------ Gallery Lazy Loading ------------------
const imagePaths = [
    "16.webp","17.webp","18.webp","265.webp","266.webp","267.webp","268.webp","269.webp","270.webp",
    "238.webp","239.webp","240.webp","241.webp","242.webp","243.webp",
    // Add ALL your image paths here in order
];
const gallery = document.getElementById("gallery");
const loader = document.getElementById("loader");
const bottomLoader = document.getElementById("bottomLoader");

let batchSize = 15;
let currentIndex = 0;

function loadBatch() {
    let end = Math.min(currentIndex + batchSize, imagePaths.length);
    for (let i = currentIndex; i < end; i++) {
        let img = document.createElement("img");
        img.src = imagePaths[i];
        img.alt = "Design " + imagePaths[i].split(".")[0];
        gallery.appendChild(img);
    }
    currentIndex = end;
}

function loadInitial() {
    // Load first 15 with main loader
    setTimeout(() => {
        loader.style.display = "none";
        loadBatch();
    }, 1000); // Simulated load delay
}

function loadNextBatch() {
    if (currentIndex >= imagePaths.length) return;
    bottomLoader.style.display = "flex";
    setTimeout(() => {
        loadBatch();
        bottomLoader.style.display = "none";
    }, 1000); // Simulated load delay
}

// Initial load
window.addEventListener("load", loadInitial);

// Load next batch on scroll
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        loadNextBatch();
    }
});
