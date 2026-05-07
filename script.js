document.addEventListener("DOMContentLoaded", function () {

    displayMeals(meals);

    const addMealButton = document.querySelector("#addMealBtn");

    addMealButton.addEventListener("click", function () {

        const mealName = document.querySelector("#mealName").value;
        const mealDate = document.querySelector("#mealDate").value;
        const mealType = document.querySelector("#mealType").value;
        const calories = document.querySelector("#calories").value;

        addMeal(meals, mealName, mealDate, mealType, calories);

        displayMeals(meals);

        // Clear inputs
        document.querySelector("#mealName").value = "";
        document.querySelector("#mealDate").value = "";
        document.querySelector("#mealType").value = "Breakfast";
        document.querySelector("#calories").value = "";
    });

});

function displayMeals(meals) {

    const mealListUl = document.querySelector("#mealList");

    // Clear existing meals
    mealListUl.innerHTML = "";

    for (let m of meals) {

        const liElement = document.createElement("li");

        liElement.classList.add(
            "list-group-item",
            "mb-3",
            "rounded",
            "shadow-sm"
        );

        // Bootstrap colors based on meal type
        if (m.mealType == "Breakfast") {

            liElement.classList.add("bg-primary", "text-white");

        } else if (m.mealType == "Lunch") {

            liElement.classList.add("bg-danger", "text-white");

        } else if (m.mealType == "Dinner") {

            liElement.classList.add("bg-warning");

        } else {

            liElement.classList.add("bg-info", "text-white");
        }

        liElement.innerHTML = `

        <div class="row align-items-center">

            <div class="col-md-3">
                <strong>${m.mealName}</strong>
            </div>

            <div class="col-md-2">
                ${m.date}
            </div>

            <div class="col-md-2">
                ${m.mealType}
            </div>

            <div class="col-md-2">
                ${m.calories} cal
            </div>

            <div class="col-md-3 text-md-end mt-2 mt-md-0">

                <button class="btn btn-danger btn-sm delete-btn">
                    Delete
                </button>

                <button class="btn btn-success btn-sm update-btn">
                    Update
                </button>

            </div>

        </div>
        `;

        // DELETE BUTTON
        const deleteBtn = liElement.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", function () {

            deleteMeal(meals, m.id);

            displayMeals(meals);

        });

        // UPDATE BUTTON
        const updateBtn = liElement.querySelector(".update-btn");

        updateBtn.addEventListener("click", function () {

            Swal.fire({

                title: `Update Meal: ${m.mealName}`,

                html: `

                <div class="mb-3">
                    <label>Meal Name</label>

                    <input type="text"
                        id="newMealName"
                        class="form-control"
                        value="${m.mealName}">
                </div>

                <div class="mb-3">
                    <label>Date</label>

                    <input type="date"
                        id="newMealDate"
                        class="form-control"
                        value="${m.date}">
                </div>

                <div class="mb-3">
                    <label>Meal Type</label>

                    <select id="newMealType" class="form-control">

                        <option value="Breakfast"
                        ${m.mealType == "Breakfast" ? "selected" : ""}>
                        Breakfast
                        </option>

                        <option value="Lunch"
                        ${m.mealType == "Lunch" ? "selected" : ""}>
                        Lunch
                        </option>

                        <option value="Dinner"
                        ${m.mealType == "Dinner" ? "selected" : ""}>
                        Dinner
                        </option>

                        <option value="Snack"
                        ${m.mealType == "Snack" ? "selected" : ""}>
                        Snack
                        </option>

                    </select>
                </div>

                <div class="mb-3">
                    <label>Calories</label>

                    <input type="number"
                        id="newCalories"
                        class="form-control"
                        value="${m.calories}">
                </div>
                `,

                showCancelButton: true,
                showCloseButton: true,

                preConfirm: function () {

                    const newMealName =
                        document.querySelector("#newMealName").value;

                    const newMealDate =
                        document.querySelector("#newMealDate").value;

                    const newMealType =
                        document.querySelector("#newMealType").value;

                    const newCalories =
                        document.querySelector("#newCalories").value;

                    updateMeal(
                        meals,
                        m.id,
                        newMealName,
                        newMealDate,
                        newMealType,
                        newCalories
                    );

                    displayMeals(meals);
                }

            });

        });

        mealListUl.appendChild(liElement);
    }
}