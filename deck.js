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
  }

  moveToMatched(card1, card2) {
    this.matchedCards.push(card1, card2);
    this.selectedCards = [];
  }

  refreshCardDeck() {
    //filter out matched cards from cards array, would keep card array in alignment
    // is this even necessary if the DOM element is removed so a user couldn't click on the card anyway?
  }
}
