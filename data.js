
// ================= JSONBIN CONFIG =================

// Stores the main JSONBin API URL
const JSONBIN_API_URL = "https://api.jsonbin.io/v3";

// Stores your JSONBin ID
const JSONBIN_ID = "6a02aec6adc21f119a88eb10";

// Stores your secret JSONBin master key
const MASTER_KEY = "$2a$10$ggwK4ypTz0jj9IhXe4T9PeMlYsjtpKiB17XWWgZofjWX7/QFdsLla";


// ================= TASKS =================

// use `let` so that we can re-assign later
// Creates empty tasks array
let tasks = [];


// ================= DELETE TASK =================

// Function used to delete a task
function deleteTask(tasks, idToDelete) {

    // Loop counter
    let i = 0;

    // Stores index of task to delete
    let wantedIndex = -1;

    // Loop through tasks
    while (i < tasks.length) {

        // Check if task ID matches
        if (tasks[i].id == idToDelete) {

            // Save matching index
            wantedIndex = i;

            // Stop loop
            break;
        }

        // Move to next task
        i = i + 1;
    }

    // If task exists
    if (wantedIndex != -1) {

        // Remove task from array
        tasks.splice(wantedIndex, 1);

        // save updated tasks
        saveTasks(tasks);
    }
}


// ================= UPDATE TASK =================

// Function used to update a task
function updateTask(tasks, idToUpdate, newName, newDateDue, newUrgency) {

    // Create updated task object
    let modifiedTask = {
        id: idToUpdate,
        name: newName,
        dateDue: newDateDue,
        urgency: newUrgency
    };

    // Stores index to update
    let indexToUpdate = -1;

    // Counter variable
    let i = 0;

    // Loop through tasks
    while (i < tasks.length) {

        // Check if IDs match
        if (tasks[i].id == idToUpdate) {

            // Save matching index
            indexToUpdate = i;

            // Stop loop
            break;
        }

        // Move to next task
        i = i + 1;
    }

    // If task exists
    if (indexToUpdate != -1) {

        // Replace old task with updated task
        tasks[indexToUpdate] = modifiedTask;

        // save updated tasks
        saveTasks(tasks);
    }
}


// ================= LOAD TASKS =================

// Async function to load tasks from JSONBin
async function loadTasks() {

    try {

        // Build JSONBin URL
        const url = `${JSONBIN_API_URL}/b/${JSONBIN_ID}/latest`;

        // Send GET request
        const response = await axios.get(url, {

            // Request headers
            headers: {

                // Authentication key
                "X-Master-Key": MASTER_KEY
            }
        });

        // Success message
        console.log("Loaded data:");

        // Show loaded data
        console.log(response.data.record);

        // Return loaded data
        return response.data.record;

    } catch (error) {

        // Error message
        console.log("LOAD ERROR:");

        // Show actual error
        console.log(error);

    }
}


// ================= SAVE TASKS =================

// Async function to save tasks/meals into JSONBin
async function saveTasks(tasks) {

    try {

        // Send PUT request
        const response = await axios.put(

            // JSONBin API endpoint
            `${JSONBIN_API_URL}/b/${JSONBIN_ID}`,

            // Data to save
            tasks,

            // Request settings
            {
                headers: {

                    // Tells server we are sending JSON
                    "Content-Type": "application/json",

                    // Authentication key
                    "X-Master-Key": MASTER_KEY
                }
            }
        );

        // Success message
        console.log("Saved successfully!");

        // Show response
        console.log(response.data);

        // Return response data
        return response.data;

    } catch (error) {

        // Error message
        console.log("SAVE ERROR:");

        // If server returned error
        if (error.response) {

            // Show server error
            console.log(error.response.data);

        } else {

            // Show general error
            console.log(error);
        }
    }
}


// ================= MEALS =================

// Empty array to store meals
let meals = [
   
];


// ================= ADD MEAL =================

// Async function to add meal
async function addMeal(meals, newMealName, newDate, newMealType, newCalories) {

    // Create new meal object
    let newMeal = {

        // Generate random ID
        id: Math.floor(Math.random() * 10000) + 1,

        // Meal name
        mealName: newMealName,

        // Meal date
        date: newDate,

        // Meal category
        mealType: newMealType,

        // Calories amount
        calories: newCalories
    };

    // Add meal into array
    meals.push(newMeal);

    // SAVE TO JSONBIN
    await saveTasks(meals);
}


// ================= DELETE MEAL =================

// Async function to delete meal
async function deleteMeal(meals, idToDelete) {

    // Stores index of meal to delete
    let wantedIndex = -1;

    // Loop through meals
    for (let i = 0; i < meals.length; i++) {

        // Check if IDs match
        if (meals[i].id == idToDelete) {

            // Save matching index
            wantedIndex = i;

            // Stop loop
            break;
        }
    }

    // If meal exists
    if (wantedIndex != -1) {

        // Remove meal from array
        meals.splice(wantedIndex, 1);

        // SAVE TO JSONBIN
        await saveTasks(meals);
    }
}


// ================= UPDATE MEAL =================

// Async function to update meal
async function updateMeal(
    meals,
    idToUpdate,
    newMealName,
    newDate,
    newMealType,
    newCalories
) {

    // Create updated meal object
    let modifiedMeal = {
        id: idToUpdate,
        mealName: newMealName,
        date: newDate,
        mealType: newMealType,
        calories: newCalories
    };

    // Stores index to update
    let indexToUpdate = -1;

    // Loop through meals
    for (let i = 0; i < meals.length; i++) {

        // Check if IDs match
        if (meals[i].id == idToUpdate) {

            // Save matching index
            indexToUpdate = i;

            // Stop loop
            break;
        }
    }

    // If meal exists
    if (indexToUpdate != -1) {

        // Replace old meal
        meals[indexToUpdate] = modifiedMeal;

        // SAVE TO JSONBIN
        await saveTasks(meals);
    }
}


