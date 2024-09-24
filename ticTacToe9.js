let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let msgContainer = document.querySelector(".msg-container");
let mssg = document.querySelector(".msg");
let NewGame = document.querySelector(".newGame");
let turnO = true;
let clickCount = 0;

const winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = ()=>{
    turnO = true;
    enableBtn();
    msgContainer.classList.add("hide");
    location.reload();
}

const enableBtn = ()=>{
    for (box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const disableBtn = ()=>{
    for (box of boxes){
        box.disabled = true;
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (turnO) {
        box.innerText = "X";
        box.style.color = "#373E40";
        turnO = false;
      } else {
        box.innerText = "O";
        box.style.color = "B0413E";
        turnO = true;
      }
      box.disabled = true;
      clickCount++;

      let isWinner = checkWinner();
  
      if (clickCount === 9 && !isWinner) {
        gameDraw();
      }
    });
  });

const gameDraw = () => {
  mssg.innerText = `Game Draw.`;
  msgContainer.classList.remove("hide");
  disableBtn();
};

const showWinner = (winner)=>{
    mssg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBtn();
}


const checkWinner = () => {
    for (patterns of winPattern){
        let pos1Val = boxes[patterns[0]].innerText;
        let pos2Val = boxes[patterns[1]].innerText;
        let pos3Val = boxes[patterns[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if (pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner",pos1Val);
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

NewGame.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
    