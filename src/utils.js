function shuffleArray(array)
{
    array.sort(() => Math.random() - 0.5);
}

function errhandler(errcode)
{
    switch (errcode)
    {
    case 1:
        console.log("The API doesn't have enough questions for your query");
    case 2:
        console.log("Contains an invalid parameter. Arguements passed in aren't valid.");
    case 3:
        console.log("Token Not Found Session Token does not exist.");
    case 4:
        console.log(`Token has returned all possible questions for the specified query. 
            Resetting the Token is necessary.`)
        token = ResetSessionToken(token);
        console.log(token)
    case 5:
        console.log("Too many requests")
    }
}
export {shuffleArray, errhandler}

