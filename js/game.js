class Game {
  constructor(newGame) {
    this.player1 = new Player('player1')
    this.player2 = new Player('player2')
    this.wholeDeck = []
    this.centerPile = []
    this.turn = null
    this.winsPlayer1 = this.player1.wins
    this.winsPlayer2 = this.player2.wins
    this.turnCount = 1
  }

  shuffleCards() {

  }

  // todo function to keep track of central pile (player deals into it, slaps take out

  dealDeckToPlayers() {
    // splits deck of 52 cards -- 1/2 to each player's hand, randomized
  }

  switchTurns() {
    // if odd player1, if even player2

  }

  playerDealsCard() {
    // puts card in middle pile
  }

  slap() {
    // if Jack
    // if double
    // if sandwich
    // else badslap
  }

  determineWinner() {
    // if player has all cards in their hand, they win
  }

  updateWinCount(player) {
    // player passed in, increase their count
  }

  reset() {
    // if game over, reset automagically
    // shuffle deck, split the deck, maybe have ready message on feedback??
  }

}
