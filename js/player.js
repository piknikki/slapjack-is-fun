class Player {
  constructor(player) {
    this.id = player
    this.wins = 0
    this.hand = []
  }

  playCard() {
    return this.hand.unshift(0,1) // take off top
    // put onto center pile
  }

  saveWinsToStorage() {

  }
}
