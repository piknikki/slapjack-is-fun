class Game {
  constructor() {
    this.player1 = new Player('player1');
    this.player2 = new Player('player2');
    this.wholeDeck = cardNames;
    this.centerPile = [];
    this.turn = 'player1';
    this.winner = null;
    this.turnCount = 1;
    this.singleDeal = false;
    this.singleDealer = null;
  }

  shuffleCards(deck) {
    var currentIndex = deck.length, temp, rand;

    while (currentIndex !== 0) {
      rand = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temp = deck[currentIndex];
      deck[currentIndex] = deck[rand];
      deck[rand] = temp;
    }
    return deck
  }

  dealDeckToPlayers() {
    this.player1.hand = this.wholeDeck.splice(0, 26);
    this.player2.hand = this.wholeDeck.splice(0, 26);
  }

  alternateTurns() {
    if (this.singleDeal === true) {
      this.turn = this.singleDealer
    } else if (this.turnCount % 2 === 0 && this.singleDeal === false) {
      this.turn = 'player2'
    } else if (this.turnCount % 2 !== 0 && this.singleDeal === false){
      this.turn = 'player1'
    }
    return this.turn
  }

  adjustMiddlePile(player) {
    this.centerPile.forEach(card => this[player].hand.push(card))
    this.shuffleCards(this[player].hand)
    this.centerPile = []
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
    var cardOne = this.centerPile[0].split('-').pop()
    var cardTwo = this.centerPile[1] ? this.centerPile[1].split('-').pop() : null
    var cardThree = this.centerPile[2] ? this.centerPile[2].split('-').pop() : null

    if (this.singleDeal === true && this[player].hand.length === 0 && cardOne === 'jack') {
      this.adjustMiddlePile(player)
      this.singleDeal = false
      this.singleDealer = null
      this.alternateTurns()
      updateFeedback('jack back', player)

    } else if (cardOne === cardTwo && this.singleDeal === false) {
      this.adjustMiddlePile(player)
      updateFeedback('double', player)

    } else if (cardOne === cardThree && this.singleDeal === false) {
      this.adjustMiddlePile(player)
      updateFeedback('sammich', player)

    } else if (cardOne === 'jack') {
      this.adjustMiddlePile(player)
      updateFeedback('jack', player)
    } else {
      updateFeedback('bad slap', player)
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
      this[this.winner].hand.forEach(card => this.wholeDeck.push(card))
    }
  }

  updateWinCount(winningPlayer) {
    this[winningPlayer].wins++
    this[winningPlayer].saveWinsToStorage()
  }

  resetWholeDeck() {
    this[this.winner].hand.forEach(card => this.wholeDeck.push(card))
  }

}
