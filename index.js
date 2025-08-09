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
