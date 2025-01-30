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
// Updated setupClickListeners function with callback
function setupClickListeners(ids, callback) {
    ids.forEach(id => {
        let element = document.getElementById(id);
        if (element) {
            element.addEventListener("click", (event) => {
                event.preventDefault();
                let textContent = event.target.textContent;

                let selectedAmount;
                if (!isNaN(textContent)) {
                    selectedAmount = parseInt(textContent); // If it's a number, use it
                } else {
                    selectedAmount = textContent; // If not, treat it as a string (e.g., "five", "ten")
                }

                // Call the callback function with the selected amount
                callback(selectedAmount);
            });
        }
    });
}

function categoryId(category)
{
    let categoryIdnumber = 0;
    if (category === "general")
    {
        categoryIdnumber = 9;
    }
    else if (category === "science")
    {
        categoryIdnumber = 17;
    }
    else if (category === "history")
    {
        categoryIdnumber = 23;
    }

    return categoryIdnumber;
}


export {shuffleArray, errhandler, setupClickListeners, categoryId}

