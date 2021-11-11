const gameStatus = document.querySelector('.game-status');
let gameActive = true;
let currentPlayer = 'X';
let gameBoard = ["", "", "", "", "", "", "", "", ""];
const winMessage = () => `Player ${currentPlayer} Has Won!`;
const drawMessage = () => `Game Ended in a Draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s Turn`;
gameStatus.innerHTML = currentPlayerTurn();

const game = (()=>{
    function cellPlayed(clickedCell, clickedCellIndex){
        gameBoard[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
    }
    
    function playerChange(){
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.innerHTML = currentPlayerTurn();
    }
    
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
    
    function resultValidation(){
        let roundWon = false;
        for(let i = 0; i<=7; i++){
            const winCondition =winningConditions[i];
            let a = gameBoard[winCondition[0]];
            let b = gameBoard[winCondition[1]];
            let c = gameBoard[winCondition[2]];
            if(a === '' || b === '' || c === ''){
                continue;
            }
            if(a === b && b === c){
                roundWon = true;
                break;
            } 
        }
        if(roundWon){
            gameStatus.innerHTML = winMessage();
            gameActive = false;
            return;
        }
        let roundDraw = !gameBoard.includes('');
        if(roundDraw){
            gameStatus.innerHTML = drawMessage();
            return;
        }
        playerChange();
    }
    
    function cellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
        if(gameBoard[clickedCellIndex] !== '' || !gameActive){return};
        cellPlayed(clickedCell, clickedCellIndex);
        resultValidation();
    }
    
    function restartGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        gameStatus.innerHTML = currentPlayerTurn();
        document.querySelectorAll('.cell').forEach(cell => cell.innerHTML ='');
    }
    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick));
    document.querySelector('.game-restart').addEventListener('click', restartGame);
})();


