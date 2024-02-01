// JS FOR MAIN PAGE (index.html)

// Add multiple quotes and have a random selector for the quote
var i = 0;
var txt = `“Success is not final; failure is not fatal: It is the courage to continue that counts.” —Winston Churchill`;;
var speed = 35;
setTimeout(typing, 500)
function typing() {
    if (i < txt.length) {
        document.getElementById("inspire").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typing, speed);
    }
}

const cardioBtn = document.getElementById("cardio");
const weightliftingBtn = document.getElementById("weightlifting");
const cardioVid = document.getElementById("cardioVid");
const weightVid = document.getElementById("weightVid");

cardioBtn.addEventListener("mouseover", function() {
    buttonHoverEvent(cardioVid, "block");
});

cardioBtn.addEventListener("mouseout", function() {
    buttonHoverEvent(cardioVid, "none");
});

weightliftingBtn.addEventListener("mouseover", function() {
    buttonHoverEvent(weightVid, "block");
});

weightliftingBtn.addEventListener("mouseout", function() {
    buttonHoverEvent(weightVid, "none");
});

function buttonHoverEvent(videoName, displayValue) {
    videoName.style.display = displayValue;
}