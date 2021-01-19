class Game {
  constructor() {
    this.player1 = new Player('player1');
    this.player2 = new Player('player2');
    this.wholeDeck = cardNames.slice();
    this.centerPile = [];
    this.turn = 'player1';
    this.winner = null;
    this.loser = null;
    this.turnCount = 1;
    this.singleDeal = false;
    this.singleDealer = null;
    this.feedback = '';
    this.feedbackPlayer = '';
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
    this.player1.hand = this.wholeDeck.slice(0, 26);
    this.player2.hand = this.wholeDeck.slice(26);
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

    if (this.singleDeal === true && this[player].hand.length === 0 && cardOne === 'jack') { // empty hand gets back in game
      this.adjustMiddlePile(player)
      this.singleDeal = false
      this.singleDealer = null
      this.alternateTurns()
      this.slapUpdateFeedback('jack back', player)

    } else if (this.singleDeal === true && this[player].hand.length > 0 && cardOne === 'jack') { // non empty hand wins
      this.adjustMiddlePile(player)
      this.slapUpdateFeedback('winner', player)

    } else if (cardOne === cardTwo && this.singleDeal === false) {
      this.adjustMiddlePile(player)
      this.slapUpdateFeedback('double', player)

    } else if (cardOne === cardThree && this.singleDeal === false) {
      this.adjustMiddlePile(player)
      this.slapUpdateFeedback('sammich', player)

    } else if (cardOne === 'jack') {
      this.adjustMiddlePile(player)
      this.slapUpdateFeedback('jack', player)

    } else {
      this.slapUpdateFeedback('bad slap', player)
      var badslap = this[player].playCard()
      if (this[player].id === 'player1') {
        this.player2.hand.push(badslap)
      } else if (this[player].id === 'player2') {
        this.player1.hand.push(badslap)
      }
    }
    this.determineWinner()
  }

  slapUpdateFeedback(response, player) {
    this.feedback = response;
    this.feedbackPlayer = player
  }

  determineWinner() {
    if (this.player1.hand.length === 52 && this.player2.hand.length === 0) {
      this.winner = 'player1'
      this.slapUpdateFeedback('winner', this.winner)
    } else if (this.player2.hand.length === 52 && this.player1.hand.length === 0) {
      this.winner = 'player2'
      this.slapUpdateFeedback('winner', this.winner)
    }

    if (this.winner) {
      this.updateWinCount(this.winner)
      checkLocalStorage();
      this.reset()
    }
  }

  updateWinCount(winningPlayer) {
    this[winningPlayer].wins++
    this[winningPlayer].saveWinsToStorage()
  }

  reset() {
    this.player1.hand = []
    this.player2.hand = []
    this.centerPile = []
  }
}
