'use strict';

// Selecting elements
const player0Ele = document.querySelector('.player--0');
const player1Ele = document.querySelector('.player--1');
const score0Ele = document.getElementById('score--0');
const score1Ele = document.getElementById('score--1');
const current0Ele = document.getElementById('current--0');
const current1Ele = document.getElementById('current--1');
const diceEle = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Ele.textContent = 0;
  score1Ele.textContent = 0;
  current0Ele.textContent = 0;
  current1Ele.textContent = 0;
  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';

  diceEle.classList.add('hidden');
  player0Ele.classList.remove('player--winner');
  player1Ele.classList.remove('player--winner');
  player0Ele.classList.add('player--active');
  player1Ele.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  // Switch to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Ele.classList.toggle('player--active');
  player1Ele.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    diceEle.classList.remove('hidden');
    diceEle.src = `dice-${dice}.png`;

    // Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active (global) player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 10) {
      playing = false;
      diceEle.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`name--${activePlayer}`).textContent = 'WINNER!';
    } else {
      // 3. Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
