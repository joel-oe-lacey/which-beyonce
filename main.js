var player1Input = document.querySelector('.intro__input--player1');
var player2Input = document.querySelector('.intro__input--player2');
var playerSubmit = document.querySelector('.intro__button--play');
var nameIntro = document.querySelector('.intro');

//shows up while typing until next input, fix that my moving to the input itself?
playerSubmit.addEventListener("click", checkNameInput);

function checkNameInput() {
  if (player1Input.validity.valueMissing) {
    player1Input.setCustomValidity("Please enter a name");
    player1Input.reportValidity();
  }
  // else if (player2Input.validity.valueMissing) {
  //   player2Input.setCustomValidity("Please enter a name");
  //   player2Input.reportValidity();
  // }
};
