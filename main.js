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
var player1Matches = document.querySelector('.player1__matches');
var results = document.querySelector('.results');
var resultsHeader = document.querySelector('.results__header');
var resultsTime = document.querySelector('.results__time');
var newGameBtn = document.querySelector('.results__button--newgame');
var deck = new Deck();

playerSubmit.addEventListener('click', checkNameInput);
instructionPlay.addEventListener('click', showGame);
newGameBtn.addEventListener('click', restartGame);
cardSection.addEventListener('click', function() {
  cardClickHandler(event);
});
window.onload = pageLoadHandler;

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
  if(checkNamePersistence()) {
    player1Name = localStorage.getItem('player1Name');
  } else {
    player1Name = player1Input.value;
    var jsonObject = JSON.stringify(player1Name);
    localStorage.setItem('player1Name', jsonObject);
  }
  instructionHeader.innerText = `Welcome ${player1Name} and Player 2 Name!`;
  nameIntro.classList.add('hidden');
  instructions.classList.remove('hidden');
};

function storeItem(item) {
  var jsonObject = JSON.stringify(item);
  localStorage.setItem(this.id, jsonObject);
}

function showGame() {
  gameStartTime = Date.now();
  instructions.classList.add('hidden');
  centerDiv.classList.add('hidden');
  gamePlayer1Header.innerText = `${player1Name}`;
  game.classList.remove('hidden');
};

function showResult() {
  resultsTime.innerText = calculateGameTime();
  resultsHeader.innerText = `Congratulations, ${player1Name} wins!`;
  game.classList.add('hidden');
  centerDiv.classList.remove('hidden');
  results.classList.remove('hidden');
}

function restartGame() {
  deck = new Deck();
  cardSection.innerHTML = '';
  player1Matches.innerText = 0;
  initialCardLoad();
  initialCardDisplay();
  gameStartTime = Date.now();
  results.classList.add('hidden');
  centerDiv.classList.add('hidden');
  game.classList.remove('hidden');
}

function calculateGameTime() {
  var gameEndTime = Date.now();
  var totalGameTime = Math.floor((gameEndTime - gameStartTime) / 1000);

  var minutes = Math.floor(totalGameTime / 60);
  var seconds = totalGameTime % 60;

  return `It took you ${minutes} minutes and ${seconds} seconds.`;
}

function cardClickHandler(event) {
  if (event.target.parentNode.parentNode.classList.contains('card')) {
    var cardClicked = parseInt(event.target.parentNode.parentNode.dataset.cardnum);
    var clickedPairID = parseInt(event.target.parentNode.parentNode.dataset.pairid);

    if (deck.selectedCards.length === 1 && (cardClicked !== deck.selectedCards[0].cardNum)) {
      event.target.parentNode.classList.add('flip');
      deck.addToSelected(cardClicked, clickedPairID);
      //need to add a set timeout so the card doesn't remove immediately, have a 2 second pause
      var matchResult = deck.checkSelectedCards();
      //this is refreshing page before second card gets chosen. need to rework.
      if(matchResult) {
        if(deck.matches === 5) {
        showResult();
        } else {
        cardRefresh();
        }
      } else {
        setTimeout(function() {
          resetCards(event)
        }, 1000);
      }

    } else if (deck.selectedCards.length === 0) {
      deck.addToSelected(cardClicked, clickedPairID);
      event.target.parentNode.classList.add('flip');
    }
  }
}

function checkNamePersistence() {
  if(localStorage.getItem('player1Name')) {
    return true;
  } else {
    return false;
  }
}

function resetCards(event) {
  //target whole card section
  //iterate through cards (childreNode)
  var presentCards = cardSection.children;
  for (var i = 0; i < presentCards.length; i++) {
    if (presentCards[i].childNodes[1].classList.contains('flip')) {
      presentCards[i].childNodes[1].classList.remove('flip');
    }
  }
  // event.target.parentNode.classList.add('flip-back');
}

function pickRandomNum(range) {
  return Math.ceil(Math.random() * range);
}

function generateCardIds(card, cardNum) {
  // var randNum = pickRandomNum(10);
  //this is creating a 0 and 5, not two 5s
  card.cardNum = cardNum;
  card.pairID = Math.ceil((cardNum+1)/2);
}

function pageLoadHandler() {
  if(checkNamePersistence()) {
    showInstructions();
  }
  player1Matches.innerText = 0;
  initialCardLoad();
  initialCardDisplay();
}

function initialCardLoad() {
  for(var i = 0; i < 10; i++) {
    var card = new Card();
    generateCardIds(card, i);
    deck.cards.push(card);
  }
  deck.shuffle();
}

function initialCardDisplay() {
  for(var i = 0; i < 10; i++) {
    var card = deck.cards[i];
    addCard(card, i);
  }
}

function cardRefresh() {
  player1Matches.innerText = deck.matches;
  cardSection.innerHTML = "";
  for(var i = 0; i < deck.cards.length; i++) {
    if(deck.cards[i].matched) {
      addHiddenCard(deck.cards[i], i);
    } else {
      addCard(deck.cards[i], i);
    }
  }
}

function addCard(card, index) {
  return cardSection.innerHTML +=
        `<div class="card card-${index}" data-cardnum=${card.cardNum} data-pairid=${card.pairID}>
          <div class="card-inner">
            <div class="card-front">
            <p>${card.cardNum}</p>
            <p>${card.pairID}</p>
            </div>
            <div class="card-back">
            </div>
          </div>
        </div>`
};

function addHiddenCard(card, index) {
  return cardSection.innerHTML +=
        `<div class="card card-${index} no-display" data-cardNum=${card.cardNum} data-pairId=${card.pairID}>
          <div class="card-inner">
            <div class="card-front">
            <p>${card.cardNum}</p>
            <p>${card.pairID}</p>
            </div>
            <div class="card-back">
            </div>
          </div>
        </div>`
};
