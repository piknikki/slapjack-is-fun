class Game {
  constructor(newGame) {
    this.player1 = new Player('player1')
    this.player2 = new Player('player2')
    this.wholeDeck = cardNames // this comes from the data file, still not sure about how to use this correctly
    this.centerPile = []
    this.turn = 'player1'
    this.winner = null
    this.winsPlayer1 = this.player1.wins
    this.winsPlayer2 = this.player2.wins
    this.turnCount = 1
  }

  shuffleCards() {
    var currentIndex = this.wholeDeck.length, temp, rand;
    while (currentIndex !== 0) {
      rand = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temp = this.wholeDeck[currentIndex];
      this.wholeDeck[currentIndex] = this.wholeDeck[rand];
      this.wholeDeck[rand] = temp;
    }

    return this.wholeDeck;
  }

  dealDeckToPlayers() {
    // splits deck of 52 cards -- 1/2 to each player's hand, randomized
    this.player1.hand = this.wholeDeck.splice(0, 26);
    this.player2.hand = this.wholeDeck.splice(0, 26);
  }

  alternateTurns() {
    // if odd player1, if even player2
    // this.turnCount++
    if (this.turnCount % 2 === 0) {
      this.turn = 'player2'
    } else {
      this.turn = 'player1'
    }

  }

  // todo function to keep track of central pile (player deals into it, slaps take out
  adjustMiddlePile() {
    // when shuffle and deal are done, this will be 0
    // this.playerDealsCard() puts cards into this.centerPile array
    // keep track of order --> probably use unshift to put on top, index 0
    // keep track of indexes 0-2 and look for doubles and sandwiches
  }

  playerDealsCard(player) {
    // puts card in middle pile
    var topCard = this[player].hand.shift()
    this.centerPile.unshift(topCard);
  }

  slap(player) {
    // if Jack --> player gets centerPile array added to back end of their hand (use push)
    var cardOne = this.centerPile[0].split('-')[1]
    var cardTwo = this.centerPile[1].split('-')[1]
    var cardThree = this.centerPile[2].split('-')[1]
    console.log(player)

    if (cardOne === 'jack') {
      // jack message
      this.centerPile.forEach(card => this[player].hand.push(card))
      this.centerPile = []
      centerDeck.innerHTML = '';
    } else if (cardOne === cardTwo) {
      // double message
      this.centerPile.forEach(card => this[player].hand.push(card))
      this.centerPile = []
      centerDeck.innerHTML = '';
    } else if (cardOne === cardThree) {
      // sandwich message
      this.centerPile.forEach(card => this[player].hand.push(card))
      this.centerPile = []
      centerDeck.innerHTML = '';
    } else {
      // badslap
      var badslap = this[player].hand.slice(0, 1)
      if (this[player] === 'player1') {
        this.player2.hand.push(badslap)
      } else if (this[player] === 'player2') {
        this.player2.hand.push(badslap)
      }

    this.determineWinner()
    }
    // if double --> player gets centerPile array added to back end of their hand (use push)
    // if sandwich --> player gets centerPile array added to back end of their hand (use push)
    // else badslap --> first card in player's hand (use shift to remove) gets put on back of
    // other player's hand (use push)
  }

  determineWinner() {
    // if player has all cards in their hand, they win
    console.log(this.player1.hand)
    console.log(this.player2.hand)
    if (this.player1.hand.length === 52) {
      this.winner = 'player1'
      this.updateWinCount(this.winner)
    } else if (this.player2.hand.length === 52) {
      this.winner = 'player2'
      this.updateWinCount(this.winner)
    }
  }

  updateWinCount(player) {
    // player passed in, increase their count
    this[player].wins++
  }

  reset() {
    // if game over, reset automagically
    // shuffle deck, split the deck, maybe have ready message on feedback??
  }

}
