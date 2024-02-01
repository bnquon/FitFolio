// LOGIN PAGE
const overlay = document.getElementById("overlay");
const login = document.getElementById("login-form");
const signup = document.getElementById("signup-form")
const switchBtn = document.getElementById("switchBtn");

const signupMsg = document.getElementById("signupMsg");
const loginMsg = document.getElementById("loginMsg");

switchBtn.onclick = function () {
    // if (overlayMsg.textContent === "Hello") {
    //     overlayMsg.textContent = "Bye";
    // };
    overlay.classList.toggle("show");
    signup.classList.toggle("show");
    login.classList.toggle("show");


    if (loginMsg.classList.contains('hidden')) {
        loginMsg.classList.remove('hidden');
        signupMsg.classList.add('hidden');
        switchBtn.textContent = "Login";
    } else {
        signupMsg.classList.remove('hidden');
        loginMsg.classList.add('hidden');
        switchBtn.textContent = "Sign Up";
    };

};
