import { GetSessionToken, FetchQuestions } from "./api.js";
import { shuffleArray, errhandler, categoryId } from "./utils.js";
import { amount, category, difficulty } from './settings.js';

const token = await GetSessionToken();
const categoryIdnumber = categoryId(category);

console.log(category)
console.log(categoryIdnumber)
console.log(difficulty)

const questions = await FetchQuestions(token, amount, difficulty, categoryIdnumber);
let index = 0; // Current question index
let points = 0;

errhandler(questions.response_code); // Handle errors if any

// Initial rendering of the first question
renderQuestion(questions, index);

// Function to render a question
function renderQuestion(questionData, currentIndex) {
    const questionElement = document.getElementById('question');
    const answerContainer = document.getElementById('answer');
    const scoreContainer = document.getElementById('score');

    // Clear previous answers
    answerContainer.innerHTML = '';

    console.log('this is the data')
    console.log(questionData)
    // Set the question text
    questionElement.textContent = `${currentIndex + 1}, ${questionData.results[currentIndex].question}`;

    // Combine and shuffle the answers
    const allAnswers = [...questionData.results[currentIndex].incorrect_answers, questionData.results[currentIndex].correct_answer];
    shuffleArray(allAnswers);

    // Create and append answer buttons
    allAnswers.forEach((answer) => {
        const answerButton = document.createElement('button');
        answerButton.textContent = answer;

        // Add click listener to check correctness
        answerButton.addEventListener('click', () => {
            // Clear previously selected answers
            [...answerContainer.children].forEach((btn) => (btn.style.backgroundColor = ''));

            // Highlight the selected answer
            answerButton.style.backgroundColor = 'lightblue';

            if (answer === questionData.results[currentIndex].correct_answer) {
                if (!answerButton.classList.contains('correct')) {
                    points++;
                    answerButton.classList.add('correct'); // Prevent double points
                }
            }
        });

        scoreContainer.innerHTML = `Score: ${points}`;
        answerContainer.appendChild(answerButton);
    });
    
    // Save the updated points in localStorage
    localStorage.setItem('score', points);
    console.log(points);
    return points;
}

// Event listeners for navigation
const Next = document.getElementById('next-btn');
const Prev = document.getElementById('prev-btn');

Next.addEventListener('click', () => {
    if (index < questions.results.length - 1) {
        index++;
        renderQuestion(questions, index);
    } else if (index === questions.results.length - 1) {
        console.log('it came till here if it doesnt run here is the issue')
        console.log(Math.ceil(amount/2))
        console.log(Math.floor(amount/2))

        if(points >= Math.ceil(amount/2)) {
            window.location.href="excellent.html";
        } else if (points <= Math.floor(amount/2)) {
            window.location.href = "terrible.html";
        } else {
            window.location.href = "good.html";
        }
    }
});

Prev.addEventListener('click', () => {
    if (index > 0) {
        index--;
        renderQuestion(questions, index);
    }
});
