const overlay = document.getElementById("overlay")
const switchBtn = document.getElementById("switchBtn");
const overlayMsg = document.getElementById("overlayMsg");

switchBtn.onclick = function () {
    // if (overlayMsg.textContent === "Hello") {
    //     overlayMsg.textContent = "Bye";
    // };

    overlay.classList.toggle("show");
}