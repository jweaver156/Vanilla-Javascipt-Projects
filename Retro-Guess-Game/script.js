'use strict';

// Create random number to be guessed
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 10;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// Implement guess button functionality
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // If no number is selected
  if (!guess) {
    displayMessage('⛔️ No Number!');
    // When correct number is selected
  } else if (guess === secretNumber) {
    document.querySelector('.number').textContent = secretNumber;
    displayMessage('💰 VICTORY IS YOURS!');
    document.querySelector('h1').textContent = 'YOU DID IT!';
    document.querySelector('h1').style.color = '#ffd700';

    document.querySelector('.score').textContent = score;
    document.querySelector('body').style.backgroundColor = '#32CD32';
    document.querySelector('.number').style.background = '#ffd700';
    document.querySelector('.number').style.width = '40rem';
    document.querySelector('header').style.borderBottomColor = '#ffd700';
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    // When guesses are wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too High!' : '📉 Too Low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.score').textContent = 'GooseEgg...';
      displayMessage('👎 You Lost.');
      document.querySelector('body').style.backgroundColor = '#505050';
      document.querySelector('header').style.borderBottomColor = '#505050';
      document.querySelector('.number').style.width = '30rem';
      document.querySelector('h1').textContent = 'Game Over';
    }
  }
});

// Implement again button functionality
document.querySelector('.again').addEventListener('click', function () {
  score = 10;
  secretNumber = Math.trunc(Math.random() * 10) + 1;
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('header').style.borderBottomColor = '#eee';
  document.querySelector('.number').style.background = '#eee';
  document.querySelector('h1').textContent = 'Guess My Number!';
  document.querySelector('.again').style.background = '#eee';
  document.querySelector('h1').style.color = '#eee';
});
