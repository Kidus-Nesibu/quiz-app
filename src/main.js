import { GetSessionToken, ResetSessionToken, FetchQuestions, Getcategory } from "./api.js";
import { shuffleArray, errhandler} from "./utils.js";

const token = await GetSessionToken();
const questions = await FetchQuestions(token);
let index = 0;

errhandler(questions.response_code);

function renderQuestion(questionData, index) {
    // Select the necessary DOM elements
    const questionElement = document.getElementById('question');
    const answerContainer = document.getElementById('answer');
    
    // Clear previous answers
    answerContainer.innerHTML = '';

    // Set the question text
    questionElement.textContent = questionData.results[index].question;

    // Combine and shuffle the answers
    const allAnswers = [...questionData.results[index].incorrect_answers, questionData.results[index].correct_answer];
    shuffleArray(allAnswers);

    const answerButtons = [];
    let selectedButton = null;

    // Create and append answer buttons
    allAnswers.forEach(answer => {
        const answerButton = document.createElement('button');
        answerButton.textContent = answer; // Set button text to the answer
        answerButton.classList.add('answer-btn'); // Optional: Add a class for styling
        answerContainer.appendChild(answerButton);


        answerButtons.push(answerButton);

        // Add click listener to check correctness
        answerButton.addEventListener('click', () => {
            if (selectedButton)
            {
                selectedButton.style.backgroundColor ='';
            }

            answerButton.style.backgroundColor = 'lightblue';

            selectedButton = answerButton;

            if (answer === questionData.results[index].correct_answer)
            {
                console.log('Correct answer!');
                //answerButton.style.backgroundColor = 'green';

            } 
            else 
            {
                console.log('Wrong answer!');
                //answerButton.style.backgroundColor = 'red';
            }
    });
});
}
const Next = document.getElementById('next-btn');
const Prev = document.getElementById('prev-btn');

Next.addEventListener('click', () => {
    if (index < questions.results.length - 1) {
        index++; // Increment the index to show the next question
        renderQuestion(questions, index);
    }
});

// Prev button click handler
Prev.addEventListener('click', () => {
    if (index > 0) {
        index--; // Decrement the index to show the previous question
        renderQuestion(questions, index);
    }
});

renderQuestion(questions, index);
