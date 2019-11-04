class Card {
  constructor(cardNum, pairID) {
    this.cardNum = cardNum;
    this.pairID = pairID;
    this.matched = false;
    this.cardBackground = "";
  }

  match(isMatched) {
    this.matched = isMatched;
  }
};
