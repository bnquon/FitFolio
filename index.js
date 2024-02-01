// JS FOR MAIN PAGE (index.html)

// Add multiple quotes and have a random selector for the quote
var i = 0;
var txt = `“Success is not final; failure is not fatal: It is the courage to continue that counts.” —Winston Churchill`;
var speed = 35;
setTimeout(typing, 500)
function typing() {
    if (i < txt.length) {
        document.getElementById("inspire").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typing, speed);
    }
}

