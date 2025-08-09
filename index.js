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

const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
