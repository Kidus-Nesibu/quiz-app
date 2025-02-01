// Import game difficulty settings from external settings file
//import { difficulty } from "./settings";

// API Base URL for Open Trivia Database (OpenTDB)
const API_BASE_URL = "https://opentdb.com";

/**
 * Retrieves a new session token from the OpenTDB API.
 * The token helps prevent duplicate questions during a quiz session.
 * 
 * @returns {Promise<string | null>} - Returns a session token if successful, otherwise logs an error.
 */
async function getSessionToken() {
  try {
    const response = await fetch(`${API_BASE_URL}/api_token.php?command=request`);
    const data = await response.json();

    if (data.response_code === 0) {
      return data.token;
    } else {
      console.error(`Error occurred while fetching token: ${data.response_code}`);
      return null;
    }
  } catch (error) {
    console.error("Network or API error:", error);
    return null;
  }
}

/**
 * Resets an existing session token.
 * Useful if the token expires or if you want to refresh the session.
 * 
 * @param {string} token - The session token to be reset.
 * @returns {Promise<string | boolean>} - Returns a new token if successful, false otherwise.
 */
async function resetSessionToken(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/api_token.php?command=reset&token=${token}`);
    const data = await response.json();

    if (data.response_code === 0) {
      return data.token;
    } else {
      console.error(`Error occurred while resetting token: ${data.response_code}`);
      return false;
    }
  } catch (error) {
    console.error("Network or API error:", error);
    return false;
  }
}

/**
 * Fetches the list of trivia categories available in OpenTDB.
 * 
 * @returns {Promise<Object | null>} - Returns the categories data if successful, null otherwise.
 */
async function getCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/api_category.php`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network or API error:", error);
    return null;
  }
}

/**
 * Fetches trivia questions from OpenTDB based on provided parameters.
 * 
 * @param {string} token - Session token to prevent duplicate questions.
 * @param {number} amount - Number of questions to retrieve.
 * @param {string} difficulty - Difficulty level (easy, medium, or hard).
 * @param {number} category - Category ID for the questions.
 * @returns {Promise<Object | number>} - Returns question data if successful, otherwise returns error code.
 */
async function fetchQuestions(token, amount, difficulty, category) {
  try {
    const type = "multiple";
    const url = `${API_BASE_URL}/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}&token=${token}&category=${category}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.response_code === 0) {
      return data;
    } else {
      console.error(`Error occurred while fetching questions: ${data.response_code}`);
      return data.response_code;
    }
  } catch (error) {
    console.error("Network or API error:", error);
    return -1; // Custom error code for network failure
  }
}

// Export functions for use in other modules
export { getSessionToken, resetSessionToken, fetchQuestions, getCategories };
