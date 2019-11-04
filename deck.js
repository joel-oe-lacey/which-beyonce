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
      this.moveToMatched();
      this.selectedCards = [];
      return true;
    } else {
      this.selectedCards = [];
      return false;
    }
  }

  moveToMatched() {

  }
}
