// LOGIN PAGE
const overlay = document.getElementById("overlay");
const login = document.getElementById("login-form");
const signup = document.getElementById("signup-form");
const switchBtn = document.getElementById("switchBtn");

const signupMsg = document.getElementById("signupMsg");
const loginMsg = document.getElementById("loginMsg");

switchBtn.onclick = function () {
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
    }
};

login.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('usernameLogin').value;
    const password = document.getElementById('passwordLogin').value; 
    const serverURL = "http://localhost:3000";

    fetch(`${serverURL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: username, // Send 'name' instead of 'username'
            password: password,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        if (data.loginSuccessful) {
            login.action = "index.html";
            // Submit the form
            login.submit();
        }
    })
    .catch(error => {
        console.error('Login failed: ', error);
    });
});
