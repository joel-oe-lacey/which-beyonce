class Deck {
  constructor() {
    this.cards = [];
    this.matchedCards = [];
    this.selectedCards = [];
    this.matches = 0;
  }

  shuffle() {

  }

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
    //add class so it doesn't break card alignment, but then they can still target these cards?

    //instead of doing this just remove card from card array and refresh whole DOM
    this.removeFromDeck(this.selectedCards[0]);
    this.removeFromDeck(this.selectedCards[1]);
    this.selectedCards = [];
    this.matches++;
  };

  removeFromDeck(removedCard) {
    //instead of removing them totally, set their matched property to true, and then if the card.matched is true add but hide and set pointer events to none, so it cant be clicked on
    for (var i = 0; i < this.cards.length; i++) {
      if(this.cards[i].cardNum === removedCard.cardNum) {
        this.cards[i].match(true);
      }
    }
  };
}
