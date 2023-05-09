'use strict';

const player1 = document.querySelector('.player--1'); 
const player2 = document.querySelector('.player--2'); 
const dice = document.querySelector('.dice'); 

const newBtn = document.querySelector('.btn--new'); 
const rollBtn = document.querySelector('.btn--roll'); 
const holdBtn = document.querySelector('.btn--hold'); 
const popupBtn = document.querySelector('.btn--popup'); 
const closeBtn = document.querySelector('.close-modal'); 

const switchPlayer = function () {
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');     
}


const overlay = document.querySelector('.overlay'); 
const modal = document.querySelector('.modal'); 

let playing = true; 
let currentScore = 0; 
let totalScore = 0; 


rollBtn.addEventListener('click', function () {
  // Check If The Player Aleardy Win The Game
  // +document.querySelector('.player--active .total-score').textContent < 100
  if (playing) {
    const currentPlayerScore = document.querySelector('.player--active .current-score'); 
    let randomNumber = Math.floor(Math.random() * 6) + 1; 
    dice.src = `dice-${randomNumber}.png`; 
    dice.classList.remove('hidden'); 
    // If The Dice Is 1 Switch The Player And Set The Current Score To Zero
    if (randomNumber === 1) {
      currentScore = 0; 
      switchPlayer(); 
    // If The Dice Is Not 1 Add The randomNumber To The Current Score
    } else {
      currentScore += randomNumber; 
    }
    // Read The Value Of The Current Score After Reassigning
    currentPlayerScore.textContent = currentScore; 
  }
}); 

holdBtn.addEventListener('click', function () {
  if (playing) {
      // Select The Active Player, Current Score And His Total
  let activePlayer = document.querySelector('.player--active');  
  let currentPlayerScore = document.querySelector('.player--active .current-score'); 
  const currentTotal = document.querySelector('.player--active .total-score'); 

  // Add The Current Score To The Total
  totalScore = +currentTotal.textContent; 
  totalScore += +currentPlayerScore.textContent;
  currentTotal.textContent = totalScore; 
  currentPlayerScore.textContent = 0; 
  currentScore = 0; 
  
  // Check If The Player Win
  if (totalScore >= 100) {
    playing = false; 
    activePlayer.classList.add('player--winner'); 
    dice.classList.add('hidden'); 
    currentPlayerScore.textContet = 0; 
  } else {
    switchPlayer(); 
  }
  totalScore = 0; 
  }
}); 

// Reset All The Scores To Play Again
newBtn.addEventListener('click', function () {
  const activePlayer = document.querySelector('.player--active'); 
  const allPlayersScore = document.querySelectorAll('.player .total-score'); 
  const allPlayersCurrentScore = document.querySelectorAll('.player .current-score'); 
  for (let i = 0; i < allPlayersScore.length; i++) {
    allPlayersScore[i].textContent = 0; 
    allPlayersCurrentScore[i].textContent = 0; 
  }
  activePlayer.classList.remove('player--winner'); 
  dice.classList.add('hidden'); 
  switchPlayer(); 
  playing = true; 
}); 

// How The Game Works Popup

const openModal = function () {
  modal.classList.remove('hidden') ;
  overlay.classList.remove('hidden');  
}
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

// Open The Popup
popupBtn.addEventListener('click', openModal); 

// Close The Popup
overlay.addEventListener('click', closeModal); 
closeBtn.addEventListener('click', closeModal); 
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal(); 
}); 