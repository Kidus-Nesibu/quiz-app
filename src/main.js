import { GetSessionToken, ResetSessionToken, FetchQuestions, Getcategory } from "./api.js";
import { shuffleArray, errhandler } from "./utils.js";

const token = await GetSessionToken();
const questions = await FetchQuestions(token);
let index = 0; // Current question index
let points = 0;

errhandler(questions.response_code); // Handle errors if any

// Initial rendering of the first question// 
renderQuestion(questions, index);

// Function to render a question
function renderQuestion(questionData, currentIndex) {
    const questionElement = document.getElementById('question');
    const answerContainer = document.getElementById('answer');
    const scoreContainer = document.getElementById('score');

    // Clear previous answers
    answerContainer.innerHTML = '';

    // Set the question text
    questionElement.textContent = questionData.results[currentIndex].question;

    // Combine and shuffle the answers
    const allAnswers = [...questionData.results[currentIndex].incorrect_answers, questionData.results[currentIndex].correct_answer];
    shuffleArray(allAnswers);

    // Create and append answer buttons
    
    allAnswers.forEach((answer) => {
        const answerButton = document.createElement('button');
        answerButton.textContent = answer;
        //answerButton.classList.add('answer-btn'); // Optional: Add a class for styling

        // Add click listener to check correctness
        answerButton.addEventListener('click', () => {
            // Clear previously selected answers
            [...answerContainer.children].forEach((btn) => (btn.style.backgroundColor = ''));

            // Highlight the selected answer
            answerButton.style.backgroundColor = 'lightblue';

            if (answer === questionData.results[currentIndex].correct_answer) {
                if (!answerButton.classList.contains('correct')) 
                    {
                    points++;
                    answerButton.classList.add('correct'); // Prevent double points
                    }
            }
        });

        scoreContainer.innerHTML = `Score: ${points}`;
        answerContainer.appendChild(answerButton);
    });
    return points;
}

// Event listeners for navigation
const Next = document.getElementById('next-btn');
const Prev = document.getElementById('prev-btn');

Next.addEventListener('click', () => {
    if (index < questions.results.length - 1) 
    {
        index++;
        renderQuestion(questions, index);
        
    }
    else if (index === questions.results.length - 1)
    {
        if(points > 5)
        {
            window.location.href="excellent.html";
        }
        else if (points === 5)
        {
            window.location.href="good.html"
        }
        else
        {
            window.location.href ="terrible.html";
        }

    }
});

Prev.addEventListener('click', () => {
    if (index > 0)
    {
        index--;
        renderQuestion(questions, index);
    }
});