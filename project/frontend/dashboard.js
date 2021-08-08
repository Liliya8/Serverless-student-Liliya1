const username = document.querySelector(".username");
const calcCalory = document.querySelector(".calcCalory");
const caloryForm = document.querySelector(".calory-form");
const getCalory = document.querySelector(".get-calory");
const cancel = document.querySelector(".cancel");
const resultBody = document.querySelector("#result-body");
const result = document.querySelector(".table-wrapper");
const logout = document.querySelector("#logout");
const qty1 = document.getElementById("qty1");
const qty2 = document.getElementById("qty2");
const qty3 = document.getElementById("qty3");
const qty4 = document.getElementById("qty4");
const food1 = document.getElementById("food1");
const food2 = document.getElementById("food2");
const food3 = document.getElementById("food3");
const food4 = document.getElementById("food4");

const viewHistory = document.getElementById("view-history");

const getName = localStorage.getItem("name");

if (!getName) {
    username.innerHTML = `Welcome to Nutritrack`;
    logout.style.display = "none";
} else {
    username.innerHTML = `Hello ${getName}! Welcome to Nutritrack`;
}
calcCalory.addEventListener("click", function () {
    caloryForm.style.display = "block";
})

const inputs = [qty1, qty2, qty3, qty4, food1, food2, food3, food4]

cancel.addEventListener("click", function (event) {
    event.preventDefault();
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
    caloryForm.style.display = "none";
})

logout.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "./index.html";
})

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
            saveMeal(resp)
            let calories = 0;
            for (let i = 0; i < resp.items.length; i++) {
                calories += resp.items[i].calories;
            }
            document.getElementById("calories").innerText = calories.toFixed(1);

            for (let i = 0; i < inputs.length; i++) {
                inputs[i].value = "";
            }
        })
}

function showResult(data) {
    document.querySelectorAll('.data').forEach(e => e.remove());

    data.items.forEach((d, i) => {
        let row = document.createElement("tr");
        row.className = "data"
        row.innerHTML = `
            <td>${d.name}</td>
            <td>${d.serving_size_g}g</td>
            <td>${d.carbohydrates_total_g}g</td>
            <td>${d.fat_total_g}g</td>
            <td>${d.fat_saturated_g}g</td>
            <td>${d.protein_g}g</td>
            <td>${d.sodium_mg}mg</td>
            <td>${d.sugar_g}g</td>
            <td>${d.calories}</td>
        `;
        resultBody.appendChild(row)
    })
}

const userId = localStorage.getItem("id")

function saveMeal(resp) {
    const meal = resp.items.map(m => {
        return {
            name: m.name,
            size: m.serving_size_g,
            calories: m.calories
        }
    })

    fetch("http://localhost:9000/meal", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            userId, meal
        })
    })
        .then(res => res.json())
        .then(response => {
            if (response.success) {
                console.log("meal saved!")
            }
        })
}

if (!userId) {
    document.querySelector(".meal-history").style.display = "none";
}

function showHistory() {
    const mealData = document.querySelector(".meal-data");
    if (mealData.style.display === "block") {
        mealData.style.display = "none"
    } else {
        mealData.style.display = "block"
    }
    document.querySelectorAll('.history').forEach(e => e.remove());
    fetch(`http://localhost:9000/meal/${userId}`)
        .then(res => res.json())
        .then(resp => {
            resp.data.forEach((d) => {
                let table = document.createElement("table");
                table.className = "history";
                table.innerHTML = `
                <thead>
                        <tr>
                            <th>Name</th>
                            <th>Serving size</th>
                            <th>Calories</th>
                        </tr>
                </thead>` 
                let tbody = document.createElement("tbody");
                d.meal.forEach(m => {
                    let row = document.createElement("tr");
                    row.innerHTML = `
                <td>${m.name}</td>
                <td>${m.size}g</td>
                <td>${m.calories}</td>
            `;
                    tbody.appendChild(row)
                })

                const getDate = new Date(d.date);
                const date = document.createElement("h4")
                date.className = "history";

                date.innerHTML = `Date: ${getDate}`;

                table.appendChild(tbody)
                document.querySelector(".meal-data").appendChild(table)
                document.querySelector(".meal-data").appendChild(date)
            })
        })


}

getCalory.addEventListener("click", calculateCalory)
viewHistory.addEventListener("click", showHistory)