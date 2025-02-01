// settings.js

/**
 * Manages quiz settings, including user selections for amount, category,
 * difficulty, and type. Saves preferences to localStorage and loads them on page load.
 */

// Declare variables to store user selections
let selectedAmount = '';
let selectedCategory = '';
let selectedDifficulty = '';
let selectedType = '';

/**
 * Loads saved settings from localStorage and applies them to the UI.
 */
function loadSettings() {
    const amountInput = document.getElementById("amountInput");
    const savedAmount = localStorage.getItem("amount");
    if (savedAmount) {
        selectedAmount = savedAmount;
    }

    const savedCategory = localStorage.getItem("category");
    if (savedCategory) {
        selectedCategory = savedCategory;
        const categoryRadio = document.getElementById(savedCategory);
        if (categoryRadio) categoryRadio.checked = true;
    }

    const savedDifficulty = localStorage.getItem("difficulty");
    if (savedDifficulty) {
        selectedDifficulty = savedDifficulty;
        const difficultyRadio = document.getElementById(savedDifficulty);
        if (difficultyRadio) difficultyRadio.checked = true;
    }

    const savedType = localStorage.getItem("type");
    if (savedType) {
        selectedType = savedType;
        const typeRadio = document.getElementById(savedType);
        if (typeRadio) typeRadio.checked = true;
    }
}

/**
 * Sets up event listeners for user input and updates localStorage accordingly.
 */
document.addEventListener("DOMContentLoaded", () => {
    const amountInput = document.getElementById("amountInput");
    const categoryRadios = document.querySelectorAll("input[name='category']");
    const difficultyRadios = document.querySelectorAll("input[name='difficulty']");
    const typeRadios = document.querySelectorAll("input[name='type']");

    loadSettings();

    if (amountInput) {
        amountInput.addEventListener("input", (event) => {
            selectedAmount = event.target.value;
            localStorage.setItem("amount", selectedAmount);
        });
    }

    categoryRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            if (radio.checked) {
                selectedCategory = radio.id;
                localStorage.setItem("category", selectedCategory);
            }
        });
    });

    difficultyRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            if (radio.checked) {
                selectedDifficulty = radio.id;
                localStorage.setItem("difficulty", selectedDifficulty);
            }
        });
    });

    typeRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            if (radio.checked) {
                selectedType = radio.id;
                localStorage.setItem("type", selectedType);
            }
        });
    });
});

/**
 * Displays the saved score from localStorage on the page.
 */
document.addEventListener("DOMContentLoaded", () => {
    const scoreContainer = document.getElementById("score");
    const savedScore = localStorage.getItem("score");

    if (savedScore !== null) {
        console.log("Rendering saved score");
        scoreContainer.innerHTML = `Score: ${savedScore}`;
        console.log(savedScore);
    } else {
        console.log("No score found in localStorage");
    }
});

// Export selected values for use in other modules
export { selectedAmount, selectedCategory, selectedDifficulty, selectedType };
