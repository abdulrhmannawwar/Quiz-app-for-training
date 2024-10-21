// Handling the login process
let loginPage = document.querySelector(".login");
let loginBtn = document.getElementById("loginBtn");

async function HandleLogin() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let usernameError = document.getElementById("usernameError");
    let passwordError = document.getElementById("passwordError");

    // for checking if username is not empty
    if (username === "") {
        usernameError.textContent = "Please enter a username";
    } else if (username.includes(" ") || username.includes("_")) {
        usernameError.textContent =
            "Username can't contain spaces or underscores";
    }
    // for checking if password has at least 8 characters and has one special character and a capital letter and no spaces
    else if (
        password.length < 8 ||
        !["@", "#", "$", "%", "!", "&", "*"].some((char) =>
            password.includes(char)
        ) ||
        password.toLowerCase() === password ||
        password.includes(" ")
    ) {
        usernameError.textContent = "";
        passwordError.textContent =
            "Password must be at least 8 characters and include a special character and a capital letter and no spaces";
    } else {
        usernameError.textContent = "";
        passwordError.textContent = "";
        try {
            let response = await fetch("./signInPage/DB.json");
            let data = await response.json();

            let userFound = false;
            let passwordFound = false;
            data.forEach((user) => {
                if (user.username === username) {
                    userFound = true;
                }
                if (user.password === password) {
                    passwordFound = true;
                }
            });
            if (userFound && passwordFound) {
                console.log("Login successful");
                window.location.href = "QuizPage/quiz.html";
            } else if (userFound && !passwordFound) {
                usernameError.textContent = "";
                passwordError.textContent = "Invalid password";
            } else {
                usernameError.textContent = "Invalid username";
                passwordError.textContent = "";
            }
        } catch (e) {
            console.error(e);
        }
    }
}

loginBtn.addEventListener("click", HandleLogin);

