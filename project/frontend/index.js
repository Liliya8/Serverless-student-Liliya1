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
    //show register and hide login on click
    registrationForm.style.display = "block";
    loginForm.style.display = "none";
})

login.addEventListener("click", function () {
    //show login and hide register on click
    registrationForm.style.display = "none";
    loginForm.style.display = "block";
})

//user resgistration
const registerUser = (event) => {
    //event.preventDefault prevents the page from reloading on submission
    event.preventDefault();
    
    //making a fetch request to the pre-defined backend endpoint so as to create a new user 
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
    //converting response to json format
        .then(res => res.json())
        .then(resp => {
            //if registration is successful
            if (resp.success) {
                //storing name and id into browser local storage
                localStorage.setItem("name", resp.data.fullName);
                localStorage.setItem("id", resp.data._id);
                alert(`Welcome ${resp.data.fullName}, Your Account has been created Successfully!`)
                //redirecting to dashboard page after succesful user registration
                window.location.href = "./dashboard.html";
            }
            //if registration email already exists, the registration won't be succesful
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
                //if user login details is incorrect or doesn't exist
                alert("User information incorrect!")
            } else if (resp.success) {
                localStorage.setItem("name", resp.data.fullName)
                localStorage.setItem("id", resp.data._id);
                alert("Logged in successfully!")
                window.location.href = "./dashboard.html";
            }
        })
}

registerBtn.addEventListener("click", registerUser)
loginBtn.addEventListener("click", loginUser)