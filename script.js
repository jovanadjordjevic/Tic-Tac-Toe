const main = document.querySelector('.main');
const players = document.querySelector('.players');
const playerX = document.querySelector('#playerX');
const playerY = document.querySelector('#playerY');
const startGame = document.querySelector('.start-game');
const display = document.querySelector('.display');
const field = document.querySelectorAll('#field');
const restart = document.querySelector('.restart');
const winner = document.querySelector('.winner');

const game = {
  xTurn: true,
  timesClicked: 0,
  xState: [],
  oState: [],
  winningStates: [
    //Diagonal
    ['0', '4', '8'],
    ['2', '4', '6'],

    //Rows
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],

    //Columns
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
  ],
};

field.forEach(field => {
  field.addEventListener('click', e => {
    e.preventDefault();
    game.timesClicked++;
    if (playerX.classList.contains('active')) {
      if (field.textContent === 'X' || field.textContent === 'O') return;
      field.textContent = 'X';
      field.classList.add('disable');
      game.xState.push(e.target.getAttribute('data'));
      startGame.textContent = "It's O's turn";
      playerX.classList.remove('active');
      playerY.classList.add('active');
    } else if (playerY.classList.contains('active')) {
      if (field.textContent === 'X' || field.textContent === 'O') return;
      field.textContent = 'O';
      field.classList.add('disable');
      game.oState.push(e.target.getAttribute('data'));
      startGame.textContent = "It's X's turn";
      playerY.classList.remove('active');
      playerX.classList.add('active');
    }
    game.winningStates.forEach(winningStates => {
      const xWins = winningStates.every(state => game.xState.includes(state));
      const oWins = winningStates.every(state => game.oState.includes(state));
      if (xWins) {
        winner.textContent = 'X won!';
        startGame.textContent = 'The game is over!';
        display.classList.add('disable');
      }
      if (oWins) {
        winner.textContent = 'O won!';
        startGame.textContent = 'The game is over!';
        display.classList.add('disable');
      }
      if (xWins === false && oWins === false && game.timesClicked === 9) {
        winner.textContent = 'DRAW!';
        startGame.textContent = 'The game is over!';
      }
    });
  });
});

restart.addEventListener('click', e => {
  e.preventDefault();
  field.forEach(field => {
    field.textContent = '';
    field.classList.remove('disable');
  });
  playerX.classList.add('active');
  playerY.classList.remove('active');
  winner.textContent = '';
  startGame.textContent = 'X starts the game';
  game.xState = [];
  game.oState = [];
  display.classList.remove('disable');
  game.timesClicked = 0;
});
