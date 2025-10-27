const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitGuess');
const feedback = document.getElementById('feedback');
const remainingText = document.getElementById('remaining');
const restartBtn = document.getElementById('restartBtn');
const difficultySelect = document.getElementById('difficulty');

let secretNumber, attemptsLeft, maxAttempts;

function setDifficulty(level) {
  if (level === 'easy') maxAttempts = 15;
  else if (level === 'hard') maxAttempts = 5;
  else maxAttempts = 10;
  attemptsLeft = maxAttempts;
  remainingText.textContent = attemptsLeft;
}

function startGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  setDifficulty(difficultySelect.value);
  feedback.textContent = '';
  guessInput.value = '';
  restartBtn.classList.add('hidden');
  submitBtn.disabled = false;
  guessInput.disabled = false;
}

submitBtn.addEventListener('click', () => {
  const guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < 1 || guess > 100) {
    feedback.textContent = '⚠️ Please enter a number between 1 and 100!';
    feedback.style.color = '#ffcc00';
    return;
  }

  attemptsLeft--;
  remainingText.textContent = attemptsLeft;

  if (guess === secretNumber) {
    feedback.textContent = `🎉 Correct! The number was ${secretNumber}!`;
    feedback.style.color = '#4caf50';
    endGame();
  } else if (guess > secretNumber) {
    feedback.textContent = '📉 Too high! Try again.';
    feedback.style.color = '#ff9800';
  } else {
    feedback.textContent = '📈 Too low! Try again.';
    feedback.style.color = '#03a9f4';
  }

  if (attemptsLeft <= 0 && guess !== secretNumber) {
    feedback.textContent = `💀 Game Over! The number was ${secretNumber}.`;
    feedback.style.color = '#f44336';
    endGame();
  }
});

function endGame() {
  submitBtn.disabled = true;
  guessInput.disabled = true;
  restartBtn.classList.remove('hidden');
}

restartBtn.addEventListener('click', startGame);
difficultySelect.addEventListener('change', () => setDifficulty(difficultySelect.value));

startGame();