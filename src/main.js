import { GetSessionToken, ResetSessionToken, FetchQuestions, Category } from "./api.js";

//const Container = document.getElementById("container")
//const Choices = document.getElementById("Choices")

const token = await GetSessionToken()
const questions = await FetchQuestions(token)

console.log(token)
console.log(questions)


