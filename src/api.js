import { delay } from "./utils.js";

const apiurl ="https://opentdb.com/api.php?amount=10"

async function GetSessionToken() {
    const response = await fetch("https://opentdb.com/api_token.php?command=request")
    const data = await response.json()
    if (data.response_code === 0)
    {
        return data.token;
    }
    else
    {
        console.log("there is an error that occured while fetching the token")
    }
}
async function ResetSessionToken(token)
{
    const response = await fetch("https://opentdb.com/api_token.php?command=reset&token={token}")
    const data = await response.json()

    if (data.response_code === 0)
    {
        console.log("reseted the token successfully")
    }
    else
    {
        console.log("faield reseting the token")
    }
}

async function Category(){
    const response = await fetch("https://opentdb.com/api_category.php")
    const data = await response.json()

    console.log(data)
}

async function FetchQuestions(token, amount = 10, category = 9, difficulty = "medium", type = "multiple", retries = 3)
{
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}&token=${token}`;
    const response = await fetch(url);
    const data = await response.json();
  
    if (data.response_code === 0) 
    {
        console.log(data.results)
        return data.results; // Return the questions
    } 
    else if (data.response_code === 4) 
    {
      console.log("resete session it is exhausted")
      await ResetSessionToken(token);
      return [];
    }
    else if (data.response_code === 5 && retries > 0)
    {
      console.log("Too many requests Chill my nigga")
      await delay(5000)
      return await FetchQuestions(token, retries = -1)

    }
    else
    {
      console.log(data.response_code)
      const errorMessage = 
      {
        1: "No results found for the given query.",
        2: "Invalid parameter passed to the API.",
        3: "Session token not found.",
      }
      [data.response_code] || "Unknown error occurred.";
      throw new Error(`Failed to fetch questions: ${errorMessage}`);
    }
  }
export {GetSessionToken, ResetSessionToken, FetchQuestions, Category}
