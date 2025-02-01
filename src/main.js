import { getSessionToken, fetchQuestions } from "./api.js";
import { shuffleArray, errorHandler, getCategoryId, decodeHtmlEntities } from "./utils.js";
import { selectedAmount, selectedCategory,  selectedDifficulty } from "./settings.js";

// Retrieve session token and category ID
const token = await getSessionToken();
const categoryId = getCategoryId(selectedCategory);

console.log(selectedCategory);
console.log(categoryId);
console.log(selectedDifficulty);

// Fetch questions from API
const questions = await fetchQuestions(token, selectedAmount, selectedDifficulty, categoryId);
let index = 0; // Current question index
let points = 0;

// Handle API response errors
errorHandler(questions.response_code);

// Render the first question
renderQuestion(questions, index);

/**
 * Renders a trivia question and its answer options.
 * 
 * @param {Object} questionData - The fetched question data.
 * @param {number} currentIndex - The index of the current question.
 * @returns {number} - Updated points score.
 */

function renderQuestion(questionData, currentIndex) {
    const questionElement = document.getElementById("question");
    const answerContainer = document.getElementById("answer");
    const scoreContainer = document.getElementById("score");

    // Clear previous answers
    answerContainer.innerHTML = "";

    console.log("Question Data:", questionData);

    // Decode and set the question text
    questionElement.textContent = `${currentIndex + 1}. ${decodeHtmlEntities(questionData.results[currentIndex].question)}`;

    // Combine and shuffle the answers
    const allAnswers = [
        ...questionData.results[currentIndex].incorrect_answers.map(decodeHtmlEntities),
        decodeHtmlEntities(questionData.results[currentIndex].correct_answer)
    ];
    shuffleArray(allAnswers);

    // Create and append answer buttons
    allAnswers.forEach((answer) => {
        const answerButton = document.createElement("button");
        answerButton.textContent = answer;

        // Add click listener to check correctness
        answerButton.addEventListener("click", () => {
            // Reset background color for all answers
            [...answerContainer.children].forEach((btn) => (btn.style.backgroundColor = ""));
            
            // Highlight the selected answer
            answerButton.style.backgroundColor = "lightblue";

            if (answer === decodeHtmlEntities(questionData.results[currentIndex].correct_answer)) {
                if (!answerButton.classList.contains("correct")) {
                    points++;
                    answerButton.classList.add("correct"); // Prevent double counting
                }
            }
        });

        scoreContainer.innerHTML = `Score: ${points}/${selectedAmount}`;
        answerContainer.appendChild(answerButton);
    });

    // Save updated score in localStorage
    localStorage.setItem("score", points);
    console.log(points);
    return points;
}
// Event listeners for navigation buttons
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");

nextButton.addEventListener("click", () => {
    if (index < questions.results.length - 1) {
        index++;
        renderQuestion(questions, index);
    } else if (index === questions.results.length - 1) {
        console.log("Final question reached, evaluating results...");
        console.log("Ceiling division:", Math.ceil(selectedAmount / 2));
        console.log("Floor division:", Math.floor(selectedAmount / 2));

        if (points >= Math.ceil(selectedAmount / 2)) {
            window.location.href = "excellent.html";
        } else if (points <= Math.floor(selectedAmount / 2)) {
            window.location.href = "terrible.html";
        } else {
            window.location.href = "good.html";
        }
    }
});

prevButton.addEventListener("click", () => {
    if (index > 0) {
        index--;
        renderQuestion(questions, index);
    }
});
