const register = document.getElementById("register");
const login = document.getElementById("login");
const registrationForm = document.getElementById("registration-form");
const loginForm = document.getElementById("login-form");

const fullName = document.getElementById("fullName")
const email = document.getElementById("email")
const password = document.getElementById("password")
const gender = document.getElementById("gender")
const age = document.getElementById("age")

const registerBtn = document.getElementById("registerBtn");

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
            ge: age.value
        })
    })
        .then(res => res.json())
        .then(resp => {
            console.log("resp", resp)
            if (resp.success) {
                alert(`Welcome ${resp.data.fullName}, Your Account has been created Successfully!`)
            }
        })
}

registerBtn.addEventListener("click", registerUser)