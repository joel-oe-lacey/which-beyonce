var player1Input = document.querySelector('.intro__input--player1');
var player2Input = document.querySelector('.intro__input--player2');
var playerSubmit = document.querySelector('.intro__button--play');
var nameIntro = document.querySelector('.intro');
var instructions = document.querySelector('.instructions');
var instructionHeader = document.querySelector('.instructions__header');
var instructionPlay = document.querySelector('.instructions__button--play');
var centerDiv = document.querySelector('.center');
var game = document.querySelector('.game');
var gamePlayer1Header = document.querySelector('.player1__h2');
var cardSection = document.querySelector('.cards');

playerSubmit.addEventListener('click', checkNameInput);
instructionPlay.addEventListener('click', showGame);
cardSection.addEventListener('click', function() {
  cardClickHandler(event);
});

function checkNameInput() {
  if (player1Input.validity.valueMissing) {
    //shows up while typing until next input, fix that my moving to the input itself?
    player1Input.setCustomValidity("Please enter a name");
    player1Input.reportValidity();
  } else {
    showInstructions();
  }
  // else if (player2Input.validity.valueMissing) {
  //   player2Input.setCustomValidity("Please enter a name");
  //   player2Input.reportValidity();
  // }
};

function showInstructions() {
  player1Name = player1Input.value;
  instructionHeader.innerText = `Welcome ${player1Name} and Player 2 Name!`;
  nameIntro.classList.add('hidden');
  instructions.classList.remove('hidden');
};

function showGame() {
  instructions.classList.add('hidden');
  centerDiv.classList.add('hidden');
  gamePlayer1Header.innerText = `${player1Name}`;
  game.classList.remove('hidden');
};

function cardClickHandler(event) {
  event.target.parentNode.classList.add('flip');
}
