// settings.js
// Declare variables to store user selections
let amount = '';
let category = '';
let difficulty = '';
let type = '';

// Event listener to load settings when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    const amountInput = document.getElementById("amountInput");
    const categoryRadios = document.querySelectorAll("input[name='category']");
    const difficultyRadios = document.querySelectorAll("input[name='difficulty']");
    const typeRadios = document.querySelectorAll("input[name='type']");

    // Load stored preferences from localStorage
    loadSettings();

    // Event listeners to track changes in each input
    if (amountInput) {
        amountInput.addEventListener("input", (event) => {
            amount = event.target.value; // Save the amount to the variable
            localStorage.setItem("amount", amount); // Store it in localStorage
        });
    }

    categoryRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            if (radio.checked) {
                category = radio.id; // Save the category to the variable
                localStorage.setItem("category", category); // Store it in localStorage
            }
        });
    });

    difficultyRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            if (radio.checked) {
                difficulty = radio.id; // Save the difficulty to the variable
                localStorage.setItem("difficulty", difficulty); // Store it in localStorage
            }
        });
    });

    typeRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            if (radio.checked) {
                type = radio.id; // Save the type to the variable
                localStorage.setItem("type", type); // Store it in localStorage
            }
        });
    });

    // Function to load saved settings from localStorage
    function loadSettings() {
        // Check and set the saved amount
        const savedAmount = localStorage.getItem("amount");
        if (savedAmount) {
            amount = savedAmount;
            //amountInput.value = savedAmount;
        }

        // Check and set the saved category
        const savedCategory = localStorage.getItem("category");
        if (savedCategory) {
            category = savedCategory;
            const categoryRadio = document.getElementById(savedCategory);
            if (categoryRadio) {
                categoryRadio.checked = true;
            }
        }

        // Check and set the saved difficulty
        const savedDifficulty = localStorage.getItem("difficulty");
        if (savedDifficulty) {
            difficulty = savedDifficulty;
            const difficultyRadio = document.getElementById(savedDifficulty);
            if (difficultyRadio) {
                difficultyRadio.checked = true;
            }
        }

        // Check and set the saved type
        const savedType = localStorage.getItem("type");
        if (savedType) {
            type = savedType;
            const typeRadio = document.getElementById(savedType);
            if (typeRadio) {
                typeRadio.checked = true;
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const scoreContainer = document.getElementById('score');
    const score = localStorage.getItem('score');

    if (score !== null) {
        console.log('Trying to render the score');
        scoreContainer.innerHTML = `Score: ${score}`;
        console.log(score);
    } else {
        console.log('No score found in localStorage');
    }
});


// Export the variables to be used in other files
export { amount, category, difficulty, type };
