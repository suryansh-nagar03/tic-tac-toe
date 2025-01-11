const startButton = document.getElementById('start');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const player1Name = document.getElementById('player-1-name');
const player2Name = document.getElementById('player-2-name');
const overlay = document.querySelector('.overlay');
const cells = document.querySelectorAll('.cell'); // Added this line to select all cells
overlay.classList.add('overlay-hidden');

startButton.addEventListener('click', ()=>
{   
    const infoArea = document.querySelector('.info-area');
    infoArea.classList.toggle('hidden');

    if(player1.value!=='' && player2.value!==''){
        player1Name.textContent = player1.value;
        player2Name.textContent = player2.value;
    }
    else{   
        player1Name.textContent = 'Player 1';
        player2Name.textContent = 'Player 2';
    }
    player1Name.classList.add('highlight-player');
});

let chance = true;

let count = 1;
let array = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
const game = (()=> {
    function checkWinner(){
        // check rows
        for(let i=0;i<3;i++){
            let crossCnt = 0;
            let zeroCnt = 0;

            for(let j=0;j<3;j++){
                if(array[i][j] === 1){
                    crossCnt++;
                }
                else if(array[i][j] === 0){
                    zeroCnt++;
                }
                else{
                    break;
                }
            }
            if(crossCnt === 3){
                return 1;
            }
            else if(zeroCnt === 3){
                return 0;
            }
        }
        // check columns
        for(let i=0;i<3;i++){
            let crossCnt = 0;
            let zeroCnt = 0;

            for(let j=0;j<3;j++){
                if(array[j][i] === 1){
                    crossCnt++;
                }
                else if(array[j][i] === 0){
                    zeroCnt++;
                }
                else{
                    break;
                }
            }
            if(crossCnt === 3){
                return 1;
            }
            else if(zeroCnt === 3){
                return 0;
            }
        }
        // check diagonals
        if(array[0][0] === 1 && array[1][1] === 1 && array[2][2] === 1){
            return 1;
        }
        else if(array[0][0] === 0 && array[1][1] === 0 && array[2][2] === 0){
            return 0;
        }
        if(array[0][2] === 1 && array[1][1] === 1 && array[2][0] === 1){
            return 1;
        }
        else if(array[0][2] === 0 && array[1][1] === 0 && array[2][0] === 0){
            return 0;
        }
        // No winner
        return -1;
    }

    function restartGame(){
        array = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
        chance = true;
        count = 1;
        player1Name.classList.add('highlight-player');
        player2Name.classList.remove('highlight-player');
        cells.forEach(cell => {
            cell.textContent = '';
        });
        const winner = document.getElementById('winner-box');
        winner.textContent = '';
        overlay.classList.toggle('overlay-hidden');
    }

    function displayWinner(result){
        const winner = document.getElementById('winner-box');
        if(result === 1){
            winner.textContent = player1Name.textContent + ' is the winner!';
        }
        else if(result === 0){
            winner.textContent = player2Name.textContent + ' is the winner!';
        }
        else{
            winner.textContent = 'It is a draw!';
        }
        overlay.classList.toggle('overlay-hidden');
    }
    function updateGame(e){
        const row = e.target.id.charAt(0);
        const col = e.target.id.charAt(1);
        if(array[row-1][col-1] === -1){
            if(chance){
                e.target.textContent = 'X';
                array[row-1][col-1] = 1;
            }
            else{
                e.target.textContent = 'O';
                array[row-1][col-1] = 0;
            }
            count++;
            chance = !chance;
            changePlayer();
        }
        if(count>5){
            const result = checkWinner();
            if(result === 1 || result === 0){
                displayWinner(result);
            }
            else if(count === 10){
                displayWinner(-1);
            }
        }
    }

    function changePlayer(){
        player1Name.classList.toggle('highlight-player');
        player2Name.classList.toggle('highlight-player');
    }

    return {array,updateGame,restartGame};
})();

const restart = document.getElementById('restart');
restart.addEventListener('click', e => {
    game.restartGame();
});

cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
        game.updateGame(e);
    });
});