class Game {
  constructor(newGame) {
    this.player1 = new Player('player1')
    this.player2 = new Player('player2')
    this.wholeDeck = cardNames // this comes from the data file, still not sure about how to use this correctly
    this.centerPile = []
    this.turn = null
    this.winsPlayer1 = this.player1.wins
    this.winsPlayer2 = this.player2.wins
    this.turnCount = 1
  }

  shuffleCards() {
    // currentIndex is length of array (decrements each iteration)
    //   plus declaration of other vars
    var currentIndex = this.wholeDeck.length, temp, rand;
    while (currentIndex !== 0) {
      rand = Math.floor(Math.random() * currentIndex); // changes every cycle, based on number of array spots that haven't been shuffled yet
      currentIndex -= 1;

      temp = this.wholeDeck[currentIndex]; // put current in temp
      this.wholeDeck[currentIndex] = this.wholeDeck[rand]; // put rand at current
      this.wholeDeck[rand] = temp; // put temp at rand
    }
    return this.wholeDeck;
  }

  dealDeckToPlayers() {
    // splits deck of 52 cards -- 1/2 to each player's hand, randomized
    this.player1.hand.push(this.wholeDeck.splice(0, 26));
    this.player2.hand.push(this.wholeDeck.splice(0, 26));
  }

  switchTurns() {
    // if odd player1, if even player2
    if (this.turnCount % 2 === 0) {
      this.turn = this.player2
    } else {
      this.turn = this.player1
    }
    this.turnCount++
  }

  // todo function to keep track of central pile (player deals into it, slaps take out
  adjustMiddlePile() {
    // when shuffle and deal are done, this will be 0
    // this.playerDealsCard() puts cards into this.centerPile array
    // keep track of order --> probably use unshift to put on top, index 0
    // keep track of indexes 0-2 and look for doubles and sandwiches
  }

  playerDealsCard() {
    // puts card in middle pile
  }

  slap() {
    // if Jack --> player gets centerPile array added to back end of their hand (use push)
    // if double --> player gets centerPile array added to back end of their hand (use push)
    // if sandwich --> player gets centerPile array added to back end of their hand (use push)
    // else badslap --> first card in player's hand (use shift to remove) gets put on back of
    // other player's hand (use push)
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
