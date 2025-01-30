import { difficulty } from "./settings";

const apiurl ="https://opentdb.com/api.php?amount=10";

async function GetSessionToken()
{    
  const response = await fetch("https://opentdb.com/api_token.php?command=request")
  const data = await response.json()
  if (data.response_code === 0)
    {
      return data.token;
    }
    else 
    {
      console.log(`Error occured: ${data.response_code}`)
    }
}

/**checking for errors 
const token = await GetSessionToken()
console.log(token)
*/


async function ResetSessionToken(token)
{
    const response = await fetch(`https://opentdb.com/api_token.php?command=reset&token=${token}`)  ;
    const data = await response.json();

    if (data.response_code === 0)
    {
        return data.token;
    }
    else
    {
        console.log(`Error occured: ${data.response_code}`);
        return false;
    }
}

/**checking for errors 
const value = await ResetSessionToken(token);
console.log(value);
*/

async function Getcategory()
{
    const response = await fetch("https://opentdb.com/api_category.php");
    const data = await response.json();
    return data;
    
}

/**checking for errors  
const gener = await Getcategory();
console.log(gener)
*/

async function FetchQuestions(token, amount, difficulty, category)
{
  const type = "multiple";
  const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}&token=${token}&category=${category}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.response_code === 0)
  {
    return data;
  }
  else 
  {
    console.log(`Error ocurring ${data.response_code}`)
    return data.response_code;
  }
}


/**checking for errors 
const Questions = await FetchQuestions(token)
console.log(Questions)
*/


export {GetSessionToken, ResetSessionToken, FetchQuestions, Getcategory}
