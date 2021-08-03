const register = document.getElementById("register");
const login = document.getElementById("login");
const registrationForm = document.getElementById("registration-form");
const loginForm = document.getElementById("login-form");

const fullName = document.getElementById("fullName")
const email = document.getElementById("email")
const password = document.getElementById("password")
const gender = document.getElementById("gender")
const age = document.getElementById("age")

const loginEmail = document.getElementById("login-email")
const loginPassword = document.getElementById("login-password")

const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");

register.addEventListener("click", function () {
    registrationForm.style.display = "block";
    loginForm.style.display = "none";
})

login.addEventListener("click", function () {
    registrationForm.style.display = "none";
    loginForm.style.display = "block";
})

const registerUser = (event) => {
    event.preventDefault();

    fetch("http://localhost:9000/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            fullName: fullName.value,
            email: email.value,
            password: password.value,
            gender: gender.value,
            age: age.value
        })
    })
        .then(res => res.json())
        .then(resp => {
            if (resp.success) {
                localStorage.setItem("name", resp.data.fullName)
                alert(`Welcome ${resp.data.fullName}, Your Account has been created Successfully!`)
                window.location.href = "./dashboard.html";
            }

            if (resp.keyValue.email === email.value) {
                alert("Email already in use!");
            }
        })
}

const loginUser = (event) => {
    event.preventDefault();

    fetch("http://localhost:9000/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            email: loginEmail.value,
            password: loginPassword.value
        })
    })
        .then(res => res.json())
        .then(resp => {
            if (resp.error) {
                alert(resp.error)
            } else if (resp.success) {
                localStorage.setItem("name", resp.data.fullName)
                alert("Logged in successfully!")
                window.location.href = "./dashboard.html";
            }
        })
}

registerBtn.addEventListener("click", registerUser)
loginBtn.addEventListener("click", loginUser)