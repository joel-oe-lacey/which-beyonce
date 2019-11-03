class Card {
  constructor(cardNum) {
    this.cardNum = cardNum;
    this.pairID = (this.cardNum/2).ceil();
    this.matched = false;
    this.cardBackground = "";
  }

  match(isMatched) {
    this.matched = isMatched;
  }
};
