// JS FOR MAIN PAGE (index.html)
var i = 0;
var txt = `“Success is not final; failure is not fatal: It is the courage to continue that counts.” —Winston Churchill`;;
var speed = 75;
setTimeout(typing, 1000)
function typing() {
    if (i < txt.length) {
        document.getElementById("inspire").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typing, speed);
    }
}