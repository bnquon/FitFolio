// JS FOR MAIN PAGE (index.html)
const addressUser = sessionStorage.getItem('username');
document.getElementById('username').textContent = "Logged in as: " + addressUser;
// Add multiple quotes and have a random selector for the quote
var i = 0;
var txt = `“Success is not final; failure is not fatal: It is the courage to continue that counts.” -Winston Churchill`;
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
const cardioPic = document.getElementById("cardioBg");
const weightPic = document.getElementById("weightBg");

weightliftingBtn.addEventListener("mouseover", function() {
    weightPic.style.display = "block";
    cardioPic.style.display = "none";
})

cardioBtn.addEventListener("mouseover", function() {
    weightPic.style.display = "none";
    cardioPic.style.display = "block";
})
