const username = document.querySelector(".username");
const calcCalory = document.querySelector(".calcCalory");
const caloryForm = document.querySelector(".calory-form");
const getCalory = document.querySelector(".get-calory");
const cancel = document.querySelector(".cancel");
const resultBody = document.querySelector("#result-body");
const result = document.querySelector(".table-wrapper");
const logout = document.querySelector("#logout");

const getName = localStorage.getItem("name");

if (!getName) {
    username.innerHTML = `Welcome to Calory App`;
    logout.style.display = "none";
} else {
    username.innerHTML = `Welcome to Calory App, ${getName}!`;
}
calcCalory.addEventListener("click", function () {
    caloryForm.style.display = "block";
})

cancel.addEventListener("click", function (event) {
    event.preventDefault();
    caloryForm.style.display = "none";
})

logout.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "./index.html";
})

const qty1 = document.getElementById("qty1");
const qty2 = document.getElementById("qty2");
const qty3 = document.getElementById("qty3");
const qty4 = document.getElementById("qty4");
const food1 = document.getElementById("food1");
const food2 = document.getElementById("food2");
const food3 = document.getElementById("food3");
const food4 = document.getElementById("food4");

function calculateCalory(event) {
    event.preventDefault();
    const query = `${qty1.value} ${food1.value} ${qty2.value} ${food2.value} ${qty3.value} ${food3.value} ${qty4.value} ${food4.value}`;

    fetch(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
        headers: {
            "content-type": "application/json",
            "X-Api-Key": "exToyoxKxK739I3AVKuUOw==2Iao7M8grlSM41Nr"
        }
    })
        .then(res => res.json())
        .then(resp => {
            result.style.display = "block";
            showResult(resp);
            let calories = 0;
            for (let i = 0; i < resp.items.length; i++) {
                calories += resp.items[i].calories;
            }
            document.getElementById("calories").innerText = calories.toFixed(1);
        })
}

function showResult(data) {
    data.items.forEach((d, i) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${d.name}</td>
            <td>${document.getElementById(`qty${i + 1}`).value}</td>
            <td>${d.carbohydrates_total_g}</td>
            <td>${d.fat_total_g}</td>
            <td>${d.fat_saturated_g}</td>
            <td>${d.protein_g}</td>
            <td>${d.sodium_mg}</td>
            <td>${d.sugar_g}</td>
            <td>${d.calories}</td>
        `;
        resultBody.appendChild(row)
    })
}

getCalory.addEventListener("click", calculateCalory)