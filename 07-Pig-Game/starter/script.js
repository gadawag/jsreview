'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, isOver;
// Starting conditions
const init = function () {
    // DATA
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    isOver = false;

    // UI
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();

const switchPlayer = function () {
    // FOR UI
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    document.querySelector(`.player--${activePlayer ? 0 : 1}`).classList.add('player--active');
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    // For Data
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
}

const checkWinner = function () {
    scores[activePlayer] += currentScore; // Add the current score to player score
    activePlayer ? score1El.textContent = scores[activePlayer] : score0El.textContent = scores[activePlayer]; // Display the total score of the current player

    if (scores[activePlayer] >= 100) {
        isOver = true;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    } else {
        switchPlayer();
    }
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (isOver) return; 

    // 1. Generating random roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
        // Add dice to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        // Switch to next player
        switchPlayer();
    }
});

btnHold.addEventListener('click', function () {
    if (isOver) return; 
    checkWinner(); 
});

btnNew.addEventListener('click', init);
