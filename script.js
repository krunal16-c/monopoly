const board = [['', '', ''], ['', '', ''], ['', '', '']];
let currentPlayer = 'X';
let otherPlayer = 'O';
let entanglements = {};
let swapUsed = false;

function createBoard() {
    const boardContainer = document.getElementById('board-container');

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const button = document.createElement('button');
            button.className = 'board-button';
            button.addEventListener('click', () => onButtonClick(i, j));
            boardContainer.appendChild(button);
        }
    }
}

function updateBoard() {
    const buttons = document.getElementsByClassName('board-button');

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            buttons[index].textContent = board[i][j];
        }
    }
}

function onButtonClick(row, col) {
    if (!swapUsed) {
        if (board[row][col] === '' && !areEntangled(row, col)) {
            entanglements[`${row}-${col}`] = getAvailablePosition();
            entanglements[getAvailablePosition()] = `${row}-${col}`;
            board[row][col] = currentPlayer;

            collapseAndResolve(row, col);
            updateBoard();
            switchPlayer();
        }
    } else {
        console.log("Quantum Swap is currently in progress. Please wait for it to complete.");
    }
}

function areEntangled(row, col) {
    return `${row}-${col}` in entanglements;
}

function collapseAndResolve(row, col) {
    const entangledPositions = new Set();
    const visited = new Set();
    const queue = [[row, col]];
    visited.add(`${row}-${col}`);

    while (queue.length > 0) {
        const [currentRow, currentCol] = queue.shift();
        entangledPositions.add(`${currentRow}-${currentCol}`);

        const entangledPosition = entanglements[`${currentRow}-${currentCol}`];
        if (entangledPosition && !visited.has(entangledPosition)) {
            const [nextRow, nextCol] = entangledPosition.split('-').map(Number);
            queue.push([nextRow, nextCol]);
            visited.add(entangledPosition);
        }
    }

    for (const position of entangledPositions) {
        const [r, c] = position.split('-').map(Number);
        board[r][c] = currentPlayer;
    }

    switchPlayer();
}

function switchPlayer() {
    [currentPlayer, otherPlayer] = [otherPlayer, currentPlayer];
    document.getElementById('player-label').textContent = `Player: ${currentPlayer}`;
}

function getAvailablePosition() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return `${i}-${j}`;
            }
        }
    }
}

function performQuantumSwap() {
    if (!swapUsed) {
        swapUsed = true;
        document.getElementById('player-label').textContent = 'Player: Select 2 positions for Quantum Swap';
        disableButtons();

        const buttons = document.getElementsByClassName('board-button');
        for (const button of buttons) {
            button.addEventListener('click', onSwapSelection);
        }
    } else {
        console.log("Quantum Swap has already been used. Please continue with the game.");
    }
}

function onSwapSelection(event) {
    const [row, col] = event.target.textContent.split('-').map(Number);

    if (board[row][col] === currentPlayer) {
        if (!window.swapMarkers) {
            window.swapMarkers = [row, col];
            document.getElementById('player-label').textContent = 'Player: Select 1 more position for Quantum Swap';
        } else if (!window.swapMarker2 && (row !== window.swapMarker1[0] || col !== window.swapMarker1[1])) {
            window.swapMarker2 = [row, col];
            swapMarkers();
        }
    } else {
        console.log(`Please select a position with your marker (${currentPlayer}) for Quantum Swap.`);
    }
}

function swapMarkers() {
    const [row1, col1] = window.swapMarkers;
    const [row2, col2] = window.swapMarkers;

    [board[row1][col1], board[row2][col2]] = [board[row2][col2], board[row1][col1]];

    updateBoard();

    // Reset Quantum Swap state
    swapUsed = false;
    document.getElementById('player-label').textContent = `Player: ${currentPlayer}`;
    enableButtons();
    delete window.swapMarker1;
    delete window.swapMarker2;
}

function disableButtons() {
    const buttons = document.getElementsByClassName('board-button');
    for (const button of buttons) {
        button.disabled = true;
    }
}

function enableButtons() {
    const buttons = document.getElementsByClassName('board-button');
    for (const button of buttons) {
        button.disabled = false;
    }
}

// Initialize the board when the page loads
window.onload = function () {
    createBoard();
    updateBoard();
};
