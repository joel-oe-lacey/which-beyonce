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
var deck = new Deck();

playerSubmit.addEventListener('click', checkNameInput);
instructionPlay.addEventListener('click', showGame);
cardSection.addEventListener('click', function() {
  cardClickHandler(event);
});
window.onload = loadCards;

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
  if (event.target.parentNode.parentNode.classList.contains('card') ) {
    if (deck.selectedCards.length === 1) {
      var cardClicked = parseInt(event.target.parentNode.parentNode.dataset.cardnum);
      var clickedPairID = parseInt(event.target.parentNode.parentNode.dataset.pairid);
      addToSelected(cardClicked, clickedPairID);
      deck.checkSelectedCards();
      event.target.parentNode.classList.add('flip');
    } else if (deck.selectedCards.length === 0) {
      var cardClicked = parseInt(event.target.parentNode.parentNode.dataset.cardnum);
      var clickedPairID = parseInt(event.target.parentNode.parentNode.dataset.pairid);
      addToSelected(cardClicked, clickedPairID);
      event.target.parentNode.classList.add('flip');
    }
  }
}

function addToSelected(cardClicked, clickedPairID) {
  for (var i = 0; i < deck.cards.length; i++) {
    if(deck.cards[i].cardNum === cardClicked) {
      deck.selectedCards.push(deck.cards[i]);
    }
  }
}

function pickRandomNum(range) {
  return Math.ceil(Math.random() * range);
}

function generateCardIds(card, cardNum) {
  // var randNum = pickRandomNum(10);

  card.cardNum = cardNum;
  card.pairID = Math.ceil(cardNum/2);
}

function loadCards() {
  for(var i = 0; i < 10; i++) {
    var card = new Card();
    generateCardIds(card, i);
    deck.cards.push(card);
    addCards(card);
  }
}

function addCards(card) {
  return cardSection.innerHTML +=
        `<div class="card card-${card.cardNum}" data-cardNum=${card.cardNum} data-pairId=${card.pairID}>
          <div class="card-inner">
            <div class="card-front">
            </div>
            <div class="card-back">
            </div>
          </div>
        </div>`
};
