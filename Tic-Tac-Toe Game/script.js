let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");
let newGameBtn = document.querySelector("#newgame-btn");

let turn = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations! ${winner} Wins`;
    msgContainer.classList.remove("hidden");
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                showWinner(pos1);
            }
        }
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        count++;
        if(turn){
            box.innerText = "X";
            box.style.color = "#b0413e";
            turn = false;
        }
        else{
            box.innerText = "O";
            box.style.color = "#101d7e";
            turn = true;
        }
        box.disabled = true;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
            msg.innerText = `Game Draw!`;
            msgContainer.classList.remove("hidden");
        }
    });
});
 
boxes.forEach((box) => {
    resetBtn.addEventListener("click", () => {
        box.innerText = "";
        box.disabled = false;
        count = 0;
    });
});

boxes.forEach((box) => {
    newGameBtn.addEventListener("click", () => {
        msgContainer.classList.add("hidden");
        box.innerText = "";
        box.disabled = false;
        count = 0;
    });
});