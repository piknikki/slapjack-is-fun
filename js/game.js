class Game {
  constructor(newGame) {
    this.player1 = new Player('player1')
    this.player2 = new Player('player2')
    this.wholeDeck = cardNames // this comes from the data file, still not sure about how to use this correctly
    this.centerPile = []
    this.turn = 'player1'
    this.winner = null
    this.turnCount = 1
    this.singleDeal = false
    this.singleDealer = ''
  }

  shuffleCards() {
    // todo shuffle any deck of cards, not just wholeDeck (or reset wholeDeck, then shuffle?)
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
    this.player1.hand = this.wholeDeck.splice(0, 26);
    this.player2.hand = this.wholeDeck.splice(0, 26);
  }

  alternateTurns() {
    if (this.singleDeal === true) {
      this.turn = this.singleDealer
    } else if (this.turnCount % 2 === 0) {
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
    if (this[player].hand.length > 0) {
      var topCard = this[player].playCard()
      this.centerPile.unshift(topCard);
    } else {
      checkEmptyDeck(player)
    }
  }

  slap(player) {
    // todo --> add to back end of their hand (use push)
    var cardOne = this.centerPile[0].split('-').pop()
    var cardTwo = this.centerPile[1] ? this.centerPile[1].split('-').pop() : null
    var cardThree = this.centerPile[2] ? this.centerPile[2].split('-').pop() : null

    if (cardOne === 'jack') {
      updateFeedback('jack', player)
      this.centerPile.forEach(card => this[player].hand.push(card))
      this.centerPile = []
    } else if (cardOne === cardTwo) {
      updateFeedback('double', player)
      this.centerPile.forEach(card => this[player].hand.push(card))
      this.centerPile = []
    } else if (cardOne === cardThree) {
      updateFeedback('sammich', player)
      this.centerPile.forEach(card => this[player].hand.push(card))
      this.centerPile = []
    } else {
      updateFeedback('bad', player)
      var badslap = this[player].playCard()
      if (this[player].id === 'player1') {
        this.player2.hand.push(badslap)
      } else if (this[player].id === 'player2') {
        this.player1.hand.push(badslap)
      }
    }
    this.determineWinner()
  }

  determineWinner() {
    if (this.player1.hand.length === 52 && this.player2.hand.length === 0) {
      this.winner = 'player1'
    } else if (this.player2.hand.length === 52 && this.player1.hand.length === 0) {
      this.winner = 'player2'
    }

    if (this.winner) {
      this.updateWinCount(this.winner)
      updateFeedback('winner', this.winner)
      this.reset()
    }
  }

  updateWinCount(winningPlayer) {
    // todo make sure this isn't wiping out the storage on reload something wonky here
    console.log("UPDATE WIN COUNT")
    this[winningPlayer].wins++
    this[winningPlayer].saveWinsToStorage()
  }

  reset() {
    // if game over, reset automagically
    // shuffle deck, split the deck, maybe have ready message on feedback??
    this.wholeDeck = cardNames;
    this.shuffleCards();
    this.dealDeckToPlayers();
  }

}
