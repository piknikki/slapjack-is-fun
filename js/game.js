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
    // shuffle any deck of cards
    var currentIndex = this.wholeDeck.length, temp, rand;
    while (currentIndex !== 0) {
      rand = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temp = this.wholeDeck[currentIndex];
      this.wholeDeck[currentIndex] = this.wholeDeck[rand];
      this.wholeDeck[rand] = temp;
    }
    return this.wholeDeck
  }

  dealDeckToPlayers() {
    // splits deck of 52 cards -- 1/2 to each player's hand, randomized
    this.player1.hand = this.wholeDeck.splice(0, 26);
    this.player2.hand = this.wholeDeck.splice(0, 26);
  }

  alternateTurns() {
    // if odd player1, if even player2
    if (this.turnCount % 2 === 0) {
      this.turn = 'player2'
    } else {
      this.turn = 'player1'
    }
    toggleHighlighting(this.turn)
    return this.turn
  }

  // todo -- function to keep track of central pile
  adjustMiddlePile() {
    // when shuffle and deal are done, this will be 0
    // this.playerDealsCard() puts cards into this.centerPile array
    // keep track of order --> probably use unshift to put on top, index 0
    // keep track of indexes 0-2 and look for doubles and sandwiches
  }

  playerDealsCard(player) {
    // puts card in middle pile
    // todo try flipping if/else and try checking length instead of empty
    if (this[player].hand !== []) {
      var topCard = this[player].playCard()
      this.centerPile.unshift(topCard);
    } else {
      alert('Your hand is empty but you can still continue.')
    }
    checkEmptyDeck(player)
  }

  slap(player) {
    // if Jack --> player gets centerPile array
    // todo --> add to back end of their hand (use push)
    var cardOne = this.centerPile[0].split('-').pop()
    var cardTwo = this.centerPile[1] ? this.centerPile[1].split('-').pop() : null
    var cardThree = this.centerPile[2] ? this.centerPile[2].split('-').pop() : null
    // console.log(cardOne, cardTwo, cardThree)

    if (cardOne === 'jack') {
      // jack message
      updateFeedback('jack', player)
      this.centerPile.forEach(card => this[player].hand.push(card))
      this.centerPile = []
      centerDeck.innerHTML = '';
    } else if (cardOne === cardTwo) {
      // double message
      updateFeedback('double', player)
      this.centerPile.forEach(card => this[player].hand.push(card))
      this.centerPile = []
      centerDeck.innerHTML = '';
    } else if (cardOne === cardThree) {
      // sandwich message
      updateFeedback('sammich', player)
      this.centerPile.forEach(card => this[player].hand.push(card))
      this.centerPile = []
      centerDeck.innerHTML = '';
    } else {
      // badslap
      updateFeedback('bad', player)
      var badslap = this[player].playCard()
      if (this[player].id === 'player1') {
        this.player2.hand.push(badslap)
      } else if (this[player].id === 'player2') {
        this.player1.hand.push(badslap)
      }
    this.determineWinner()
    }
  }

  determineWinner() {
    // if player has all cards in their hand, they win
    // hand dealing is different from hand won -- make a diff array for these

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
