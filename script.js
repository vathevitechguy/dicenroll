'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const finalScore0 = document.getElementById('score--0');
const finalScore1 = document.getElementById('score--1');

let finalScore, currentScore, activePlayer, playing;

// Launching Conditions
const init = function() {
  currentScore = 0;
  finalScore = [0, 0];
  activePlayer = 0;
  finalScore0.textContent = 0;
  finalScore1.textContent = 0;
  playing = true;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner')
  player1El.classList.remove('player--winner')
  player0El.classList.add('player--active')
  player1El.classList.remove('player--active')
}
init()

/////////////////////////////////////////////////////////////////////////////////////
// Dice Generator
const diceRollGenerator = function() {
  if (playing) {
    let rollGen = Math.trunc(Math.random() * 6) + 1;
    console.log(rollGen);
    return rollGen;
  }
}
///////////////////////////////////////////////////////////////////////////////////
// Switch Player
const switchPlayer = function() {
  currentScore = 0;
  // currentScore0.textContent = currentScore;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  // Toogle will ensure that it is only on one element at once
}

////////////////////////////////////////////////////////////////////////////////////
//Roll Dice Function 
btnRoll.addEventListener('click', function() {
  if (playing) {
    let dice = diceRollGenerator();
    // Reveal Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 100) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }
    else {
      // Switch Player
      switchPlayer();
    }
  }

});



////////////////////////////////////////////////////////////////////////////////////
//Hold Dice Function 
btnHold.addEventListener('click', function() {
  if (playing) {
    finalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = finalScore[activePlayer];
    console.log(finalScore[activePlayer] + " Data Saved");

    if (finalScore[activePlayer] >= 1) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }
    else {
      // Switch Player
      switchPlayer();
    }
  }
  /*
  // activePlayer = activePlayer === 0 ? 1 : 0;
  if (activePlayer === 0){
    activePlayer = 1;
    finalScore[0] += currentScore;
    finalScore0.textContent = finalScore[0];
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  }
  else{
    activePlayer = 0;
    finalScore[1] += currentScore;
    finalScore1.textContent = finalScore[1];
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  }*/
});


// New Game
btnNew.addEventListener('click', function() {
  init();
});
