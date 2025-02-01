/**
 * Utility functions for quiz application.
 * Provides functions for shuffling arrays, handling errors,
 * setting up event listeners, and mapping category names to IDs.
 */

/**
 * Shuffles an array in place using Fisher-Yates algorithm.
 * @param {Array} array - The array to shuffle.
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Handles API response errors.
 * @param {number} errCode - The error code returned from the API.
 */
async function errorHandler(errCode) {
    switch (errCode) {
        case 1:
            console.error("The API doesn't have enough questions for your query.");
            break;
        case 2:
            console.error("Invalid parameter: Arguments passed are not valid.");
            break;
        case 3:
            console.error("Session token not found: The token does not exist.");
            break;
        case 4:
            console.warn("Token exhausted: Resetting token.");
            token = await resetSessionToken(token);
            console.log("New Token:", token);
            break;
        case 5:
            console.error("Too many requests: Slow down your requests.");
            break;
        default:
            console.log(errCode)
            //console.error("Unknown error occurred.");
    }
}

/**
 * Sets up click event listeners for multiple elements and triggers a callback.
 * @param {string[]} elementIds - Array of element IDs.
 * @param {Function} callback - Function to execute on click.
 */
function setupClickListeners(elementIds, callback) {
    elementIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener("click", (event) => {
                event.preventDefault();
                const textContent = event.target.textContent;
                const selectedValue = isNaN(textContent) ? textContent : parseInt(textContent);
                callback(selectedValue);
            });
        }
    });
}

/**
 * Maps category names to Open Trivia Database category IDs.
 * @param {string} category - The category name.
 * @returns {number} - The corresponding category ID.
 */
function getCategoryId(category) {
    const categoryMap = {
        general: 9,
        science: 17,
        history: 23
    };
    return categoryMap[category] || 0; // Default to 0 if category not found.
}

function decodeHtmlEntities(text) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
}

export { shuffleArray, errorHandler, setupClickListeners, getCategoryId, decodeHtmlEntities };
