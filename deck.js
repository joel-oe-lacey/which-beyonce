class Deck {
  constructor() {
    this.cards = [];
    this.matchedCards = [];
    this.selectedCards = [];
    this.matches = 0;
  }

  shuffle() {
    var cards = this.cards, temporaryValue, randomIndex;
    for(var i = 9; i > 0; i--) {
      randomIndex = Math.floor(Math.random() * i);
      temporaryValue = cards[i];
      cards[i] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }
    this.cards = cards;
  };

  checkSelectedCards() {
    if (this.selectedCards[0].pairID === this.selectedCards[1].pairID) {
      this.moveToMatched(this.selectedCards[0], this.selectedCards[1]);
      return true;
    } else {
      this.selectedCards = [];
      return false;
    }
  };

  addToSelected(cardClicked, clickedPairID) {
   for (var i = 0; i < this.cards.length; i++) {
     if(this.cards[i].cardNum === cardClicked) {
       this.selectedCards.push(this.cards[i]);
     }
   }
 };

  moveToMatched(card1, card2) {
    this.matchedCards.push(card1, card2);
    this.removeFromDeck(this.selectedCards[0]);
    this.removeFromDeck(this.selectedCards[1]);
    this.selectedCards = [];
    this.matches++;
  };

  removeFromDeck(removedCard) {
    for (var i = 0; i < this.cards.length; i++) {
      if(this.cards[i].cardNum === removedCard.cardNum) {
        this.cards[i].match(true);
      }
    }
  };
}
