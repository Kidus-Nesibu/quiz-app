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
async function ResetSessionToken()
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

async function FetchQuestions(token, amount = 10, category = 9, difficulty = "medium", type = "multiple")
{
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}&token=${token}`;
    const response = await fetch(url);
    const data = await response.json();
  
    if (data.response_code === 0) 
    {
        console.log(data.results)
      return data.results; // Return the questions
    } else if (data.response_code === 4) {
      console.warn("You've exhausted the questions for this token. Resetting token...");
      await resetToken(token);
      return [];
    } else {
      throw new Error("Failed to fetch questions: " + data.response_message);
    }
  }
const token =await GetSessionToken()
console.log(token)
FetchQuestions(token)

export {GetSessionToken, ResetSessionToken, FetchQuestions, Category}
