const meals = [
    {
        id: 1,
        mealName: "Egg Sandwich",
        date: "2026-05-07",
        mealType: "Breakfast",
        calories: 350
    },
    {
        id: 2,
        mealName: "Chicken Rice",
        date: "2026-05-07",
        mealType: "Lunch",
        calories: 700
    },
    {
        id: 3,
        mealName: "Steak",
        date: "2026-05-07",
        mealType: "Dinner",
        calories: 850
    }
];

function addMeal(meals, newMealName, newDate, newMealType, newCalories) {

    let newMeal = {
        id: Math.floor(Math.random() * 10000) + 1,
        mealName: newMealName,
        date: newDate,
        mealType: newMealType,
        calories: newCalories
    };

    meals.push(newMeal);
}

function deleteMeal(meals, idToDelete) {

    let wantedIndex = -1;

    for (let i = 0; i < meals.length; i++) {

        if (meals[i].id == idToDelete) {
            wantedIndex = i;
            break;
        }
    }

    if (wantedIndex != -1) {
        meals.splice(wantedIndex, 1);
    }
}

function updateMeal(meals, idToUpdate, newMealName, newDate, newMealType, newCalories) {

    let modifiedMeal = {
        id: idToUpdate,
        mealName: newMealName,
        date: newDate,
        mealType: newMealType,
        calories: newCalories
    };

    let indexToUpdate = -1;

    for (let i = 0; i < meals.length; i++) {

        if (meals[i].id == idToUpdate) {
            indexToUpdate = i;
            break;
        }
    }

    if (indexToUpdate != -1) {
        meals[indexToUpdate] = modifiedMeal;
    }
}