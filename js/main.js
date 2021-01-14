// need to detect keystrokes here
// need start functionality -- some way to start when players are ready
// maybe instructions???

// event listener on keys for slap
// event listener on keys for deal

var game;

var startGameButton = document.querySelector('.center-pile__startbtn');
var player1DeckSelector = document.querySelector('.player1__img');
var player2DeckSelector = document.querySelector('.player2__img');
var centerDeck = document.querySelector('.center-pile__deck');

startGameButton.addEventListener('click', runNewGame);
document.addEventListener('keyup', function(event) {
  centerDeck.classList.remove('hidden');
  switch (event.key) {
    case 'q':
      // player1 deal -- take top card and put it on center pile -- if it's your turn
      if (game.turn === 'player1') {
        game.playerDealsCard('player1')
        centerDeck.innerHTML = `
        <img class="center-pile__img ${game.player1.id}__img--highlight" src="assets/${game.centerPile[0]}.png" alt="player card">
      `
      } else {
        alert(`It's the other player's turn.`)
      }
      game.turnCount++
      game.alternateTurns();
      break;
    case 'f':
      // player1 slap
      break;
    case 'p':
      // player2 deal take top card and put it on center pile
      if (game.turn === 'player2') {
        game.playerDealsCard('player2')
        centerDeck.innerHTML = `
        <img class="center-pile__img ${game.player2.id}__img--highlight" src="assets/${game.centerPile[0]}.png" alt="player card">
      `
      } else {
        alert(`It's the other player's turn.`)
      }
      game.turnCount++
      game.alternateTurns()
      break;
    case 'j':
      // player2 slap
      break;
    default:
      alert(`Player 1 controls: 'q' to deal and 'f' to slap.\nPlayer 2 controls: 'p' to deal and 'j' to slap.\nOnly valid keys accepted.`)
  }

});

function runNewGame() {
  startGameButton.classList.add('hidden');
  player1DeckSelector.classList.add('player1__img--highlight'); // add to player1 but leave off player2

  // game instantiation goes here
  game = new Game();
  game.shuffleCards();
  game.dealDeckToPlayers();
  console.log(game)
}
