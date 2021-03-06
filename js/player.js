class Player {
  constructor(player) {
    this.id = player
    this.wins = 0
    this.hand = []
  }

  playCard() {
    if (this.hand !== []) {
      return this.hand.shift();
    } else if (this.hand === []) {
      checkEmptyDeck(this.id)
    }

  }

  saveWinsToStorage() {
    localStorage.setItem(this.id, JSON.stringify(this.wins))
  }
}
