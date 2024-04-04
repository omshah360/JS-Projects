const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScore = document.querySelector("#user-score");
const compScore = document.querySelector("#comp-score");

let userCount = 0;
let compCount = 0;

const genCompChoice = () => {
    const options = ["rock","paper","scissor"];
    const randIdx = Math.floor(Math.random()*3);
    return options[randIdx];
};

const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin){
        msg.innerText = `You win! your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
        userCount++;
        userScore.innerText = userCount;
    }
    else{
        msg.innerText = `You lost! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
        compCount++;
        compScore.innerText = compCount;
    }
}

const drawGame = () => {
    msg.innerText = "It's a Draw! Play again";
    msg.style.backgroundColor = "#081b31";
};

const playGame = (userChoice) => {
    //Generating Computer Choice
    const compChoice = genCompChoice();

    //Comparing User's Choice and Computer's Choice
    if(userChoice === compChoice){
        drawGame();
    }
    else{
        let userWin = true;
        if(userChoice === "rock"){
            //paper or scissor
            userWin = compChoice === "paper" ? false : true;
        }
        else if(userChoice === "paper"){
            //rock or scissor
            userWin = compChoice === "scissor" ? false : true;
        }
        else{
            //rock or paper
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});
