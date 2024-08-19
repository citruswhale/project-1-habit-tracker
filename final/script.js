const habits = document.querySelectorAll('#daily-task input[type="checkbox"]');
const plant = document.getElementById('plant');

// Load saved habit state
document.addEventListener('DOMContentLoaded', () => {
    const savedState = JSON.parse(localStorage.getItem('habitState')) || [];
    habits.forEach((habit, index) => {
        habit.checked = savedState[index] || false;
    });
    updatePlant();
});

habits.forEach((habit, index) => {
    habit.addEventListener('change', () => {
        saveHabitState();
        updatePlant();
    });
});

function updatePlant() {
    const completed = document.querySelectorAll('#daily-task input[type="checkbox"]:checked').length;
    const total = habits.length;
    
    if (completed === total) {
        plant.style.backgroundColor = "lightgreen"; // Happy, fully grown
        plant.style.height = "200px"; // Taller
        plant.style.borderRadius = "50px 50px 20px 20px"; // Rounded bottom
        plant.style.backgroundColor = "#4CAF50"; // Greener
        plant.style.transition = "all 0.3s ease";
        plant.querySelector('::before').style.backgroundColor = "#4CAF50";
    } else if (completed > 0) {
        plant.style.backgroundColor = "yellowgreen"; // Somewhat grown
        plant.style.height = "150px"; // Standard height
        plant.style.borderRadius = "50px 50px 0 0"; // Regular shape
        plant.style.transition = "all 0.3s ease";
        plant.querySelector('::before').style.backgroundColor = "yellowgreen";
    } else {
        plant.style.backgroundColor = "brown"; // Wilted
        plant.style.height = "100px"; // Shorter
        plant.style.transition = "all 0.3s ease";
    }
}

function saveHabitState() {
    const habitState = Array.from(habits).map(habit => habit.checked);
    localStorage.setItem('habitState', JSON.stringify(habitState));
}

// Save habit state in local storage
function updateTable() {
    habits.forEach((habit, index) => {
        const currentDay = new Date().getDay();
        const day = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const element = document.getElementById(`${day[currentDay]}${index + 1}`);
        
        if (habit.checked) {
            element.textContent = '✔️';
            element.classList.add('completed');
            element.classList.remove('not-completed');
        } else {
            element.textContent = '✖️';
            element.classList.add('not-completed');
            element.classList.remove('completed');
        }
    });
}

habits.forEach((habit) => {
    habit.addEventListener('change', updateTable);
});

// Ensure the table is updated when the page loads
window.addEventListener('load', updateTable);
