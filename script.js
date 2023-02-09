const game = document.querySelector(".game");
game.style.display = "none";
const container = document.querySelector(".container");

//////////////// creating button elements//////////////
const StartBtn = document.createElement("button");
StartBtn.className = "StartBtn";
StartBtn.textContent = "Let's play Tic Tac Toe:)";
container.prepend(StartBtn);
StartBtn.style.display = "flex";

StartBtn.addEventListener("click", function () {
  game.style.display = "flex";
  StartBtn.style.display = "none";
});

const btn = document.createElement("button");
btn.className = "button";
btn.textContent = "Start new game";
game.appendChild(btn);
btn.style.visibility = "hidden";
//////////

let Xsvg = `<svg
xmlns="http://www.w3.org/2000/svg"
class="icon icon-tabler icon-tabler-letter-x"
width="80"
height="80"
viewBox="0 0 24 24"
stroke-width="1.5"
stroke="#2c3e50"
fill="none"
stroke-linecap="round"
stroke-linejoin="round"
>
<path stroke="none" d="M0 0h24v24H0z" fill="none" />
<line x1="7" y1="4" x2="17" y2="20" />
<line x1="17" y1="4" x2="7" y2="20" />
</svg>`;

let Osvg = `<svg
xmlns="http://www.w3.org/2000/svg"
class="icon icon-tabler icon-tabler-circle"
width="80"
height="80"
viewBox="0 0 24 24"
stroke-width="1.5"
stroke="#2c3e50"
fill="none"
stroke-linecap="round"
stroke-linejoin="round"
>
<path stroke="none" d="M0 0h24v24H0z" fill="none" />
<circle cx="12" cy="12" r="9" />
</svg>`;

let arr = [Xsvg, Osvg];
let activePlayer = 1;
let playing;

game.appendChild(createDiv("grid"));
const grid = document.querySelector(".grid");

game.appendChild(createDiv("info"));
game.appendChild(createDiv("infoRemis"));
document.querySelector(".info").textContent = "";
document.querySelector(".infoRemis").textContent = "";

////////////////MAKING A GRID /////////

for (i = 0; i < 3; i++) {
  for (s = 0; s < 3; s++) {
    const cellEl = createDiv("cell");
    cellEl.dataset.x = s;
    cellEl.dataset.y = i;
    grid.appendChild(cellEl);
  }
}

grid.style.gridTemplateColumns = "repeat(3, 1fr)";
grid.style.gridTemplateRows = "repeat(3, 1fr)";

////////////////// FUNCTIONS //////////////////

function createDiv(className) {
  const divEl = document.createElement("div");
  divEl.className = className;
  return divEl;
}

function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  return activePlayer;
}

function theEnd() {
  grid.removeEventListener("click", playGame);
  document.querySelector(
    ".info"
  ).innerHTML = `Game over! Player ${arr[activePlayer]} is a winner!`;
  btn.style.visibility = "visible";
  playing = false;
}

function checkWinner() {
  checkX(0);
  checkX(1);
  checkX(2);
  checkY(0);
  checkY(1);
  checkY(2);
  checkCross1();
  checkCross2();
}

function playGame(e) {
  if (e.target.textContent === "") {
    playing = true;
    e.target.innerHTML = arr[`${activePlayer}`];

    checkWinner();
    switchPlayer();
    if (playing) {
      document.querySelector(
        ".info"
      ).innerHTML = `Now player ${arr[activePlayer]} 's turn`;
    }
  }
  const cells = document.querySelectorAll(".cell");
  let count = 0;
  cells.forEach((cell) => {
    if (cell.textContent !== "") {
      count++;
    }
  });

  if (playing && count === 9) {
    document.querySelector(".infoRemis").textContent = "REMIS! Game over.";
    document.querySelector(".info").textContent = "";
    console.log("remis");
    btn.style.visibility = "visible";
  }
}

function checkX(e) {
  if (
    document.querySelector(`[data-x="0"][data-y="${e}"]`).textContent ===
      document.querySelector(`[data-x="1"][data-y="${e}"]`).textContent &&
    document.querySelector(`[data-x="1"][data-y="${e}"]`).textContent ===
      document.querySelector(`[data-x="2"][data-y="${e}"]`).textContent
  ) {
    if (
      document.querySelector(`[data-x="0"][data-y="${e}"]`).textContent !==
        "" &&
      document.querySelector(`[data-x="1"][data-y="${e}"]`).textContent !==
        "" &&
      document.querySelector(`[data-x="2"][data-y="${e}"]`).textContent !== ""
    ) {
      theEnd();
    }
  }
}

function checkY(e) {
  if (
    document.querySelector(`[data-x="${e}"][data-y="0"]`).textContent ===
      document.querySelector(`[data-x="${e}"][data-y="1"]`).textContent &&
    document.querySelector(`[data-x="${e}"][data-y="1"]`).textContent ===
      document.querySelector(`[data-x="${e}"][data-y="2"]`).textContent
  ) {
    if (
      document.querySelector(`[data-x="${e}"][data-y="0"]`).textContent !==
        "" &&
      document.querySelector(`[data-x="${e}"][data-y="1"]`).textContent !==
        "" &&
      document.querySelector(`[data-x="${e}"][data-y="2"]`).textContent !== ""
    ) {
      theEnd();
    }
  }
}

function checkCross1() {
  if (
    document.querySelector(`[data-x="0"][data-y="0"]`).textContent ===
      document.querySelector(`[data-x="1"][data-y="1"]`).textContent &&
    document.querySelector(`[data-x="1"][data-y="1"]`).textContent ===
      document.querySelector(`[data-x="2"][data-y="2"]`).textContent
  ) {
    if (
      document.querySelector(`[data-x="0"][data-y="0"]`).textContent !== "" &&
      document.querySelector(`[data-x="1"][data-y="1"]`).textContent !== "" &&
      document.querySelector(`[data-x="2"][data-y="2"]`).textContent !== ""
    ) {
      theEnd();
    }
  }
}

function checkCross2() {
  if (
    document.querySelector(`[data-x="0"][data-y="2"]`).textContent ===
      document.querySelector(`[data-x="1"][data-y="1"]`).textContent &&
    document.querySelector(`[data-x="1"][data-y="1"]`).textContent ===
      document.querySelector(`[data-x="2"][data-y="0"]`).textContent
  ) {
    if (
      document.querySelector(`[data-x="0"][data-y="2"]`).textContent !== "" &&
      document.querySelector(`[data-x="1"][data-y="1"]`).textContent !== "" &&
      document.querySelector(`[data-x="2"][data-y="0"]`).textContent !== ""
    ) {
      theEnd();
    }
  }
}

/////////////////////////////////////

grid.addEventListener("click", playGame);
btn.addEventListener("click", function () {
  playing = true;
  btn.style.visibility = "hidden";
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.textContent = "";
  });
  document.querySelector(".info").textContent = "";
  document.querySelector(".infoRemis").textContent = "";
  grid.addEventListener("click", playGame);
});
