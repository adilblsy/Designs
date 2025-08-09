// ======= CONFIG =======
const totalImages = 60; // Total number of images available
const imagesPerLoad = 15;
let loadedCount = 0;
let isLoading = false;

const gallery = document.getElementById("gallery");
const topLoader = document.getElementById("topLoader");
const bottomLoader = document.getElementById("bottomLoader");
const backToTopBtn = document.getElementById("backToTop");

// Create wave loader bars dynamically
function createWaveLoader(container) {
    container.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        const bar = document.createElement("div");
        container.appendChild(bar);
    }
}

// Show loader
function showLoader(loader) {
    loader.style.display = "flex";
    createWaveLoader(loader);
}

// Hide loader
function hideLoader(loader) {
    loader.style.display = "none";
}

// Load images function
function loadImages(count) {
    return new Promise(resolve => {
        setTimeout(() => { // Simulate loading delay
            for (let i = 0; i < count && loadedCount < totalImages; i++) {
                const img = document.createElement("img");
                img.src = `https://picsum.photos/300/200?random=${loadedCount + 1}`;
                gallery.appendChild(img);
                loadedCount++;
            }
            resolve();
        }, 1000);
    });
}

// First load
async function initialLoad() {
    showLoader(topLoader);
    await loadImages(imagesPerLoad);
    hideLoader(topLoader);
}

// Load more images when scrolling
async function loadMore() {
    if (isLoading || loadedCount >= totalImages) return;
    isLoading = true;
    showLoader(bottomLoader);
    await loadImages(imagesPerLoad);
    hideLoader(bottomLoader);
    isLoading = false;
}

// Infinite scroll listener
window.addEventListener("scroll", () => {
    // Show "Back to Top" button
    if (window.scrollY > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }

    // Load more images when near bottom
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadMore();
    }
});

// Back to Top click
backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Start the gallery
initialLoad();
