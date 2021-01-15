class Player {
  constructor(player) {
    this.id = player
    this.wins = 0
    this.hand = []
    this.wonCardsHand = []
  }

  playCard() {
    return this.hand.shift();
  }

  saveWinsToStorage() {

  }
}
