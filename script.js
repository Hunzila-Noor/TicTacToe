const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
const playerTurnInfo = document.getElementById('player-turn');
const winnerInfo = document.getElementById('winner');
const cells = [];

let currentPlayer = 'X';
let gameEnded = false;

// Create the cells and add click event listener
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', cellClickHandler);
    cells.push(cell);
    board.appendChild(cell);
}

// Function to handle cell clicks
function cellClickHandler() {
    if (gameEnded || this.textContent !== '') return;
    
    this.textContent = currentPlayer;
    
    if (checkWinner()) {
        showWinner(`${currentPlayer} wins!`);
        return;
    }
    
    if (checkDraw()) {
        showWinner("It's a draw!");
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerTurnInfo.textContent = `Current Turn: ${currentPlayer}`;
}

// Function to check for a winner
function checkWinner() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    return winningConditions.some((condition) => {
        const [a, b, c] = condition;
        return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
    });
}

// Function to check for a draw
function checkDraw() {
    return cells.every(cell => cell.textContent !== '');
}

// Show winner or draw
function showWinner(message) {
    winnerInfo.textContent = message;
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    const overlayContent = document.createElement('div');
    overlayContent.classList.add('overlay-content');
    overlayContent.innerHTML = `<h2>${message}</h2><button id="new-game">New Game</button>`;
    overlay.appendChild(overlayContent);
    document.body.appendChild(overlay);
    gameEnded = true;

    const newGameButton = document.getElementById('new-game');
    newGameButton.addEventListener('click', () => {
        resetGame();
        document.body.removeChild(overlay);
    });
}

// Reset the game
function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    playerTurnInfo.textContent = `Current Turn: ${currentPlayer}`;
    winnerInfo.textContent = '';
    gameEnded = false;
}

// Reset button click handler
resetButton.addEventListener('click', resetGame);
