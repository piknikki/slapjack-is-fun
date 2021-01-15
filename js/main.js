var game;

var startGameButton = document.querySelector('.center-pile__startbtn');
var player1DeckSelector = document.querySelector('.player1__img');
var player2DeckSelector = document.querySelector('.player2__img');
var centerDeck = document.querySelector('.center-pile__deck');
var feedbackSelector = document.querySelector('.feedback-message');

startGameButton.addEventListener('click', runNewGame);

document.addEventListener('keyup', function(event) {
  centerDeck.classList.remove('hidden');
  var currentPlayer = game.turn
  console.log(game[currentPlayer].hand)
  feedbackSelector.innerHTML = ''

  switch (event.key) {
    case 'q':
      // player1 deal -- take top card and put it on center pile -- if it's your turn
      if (currentPlayer === 'player1') {
        game.playerDealsCard(currentPlayer)

        centerDeck.innerHTML = `
          <img class="center-pile__img ${game.player1.id}__img--highlight" src="assets/card-fronts/${game.centerPile[0]}.png" alt="player card">
        `
        game.turnCount++
        game.alternateTurns()
      } else {
        alert(`It's the other player's turn.`)
      }
      break;
    case 'f':
      // player1 slap
      game.slap('player1')
      break;
    case 'p':
      // player2 deal take top card and put it on center pile
      if (currentPlayer === 'player2') {
        game.playerDealsCard(currentPlayer)

        centerDeck.innerHTML = `
          <img class="center-pile__img ${game.player2.id}__img--highlight" src="assets/card-fronts/${game.centerPile[0]}.png" alt="player card">
        `
        checkEmptyDeck(currentPlayer)
        game.turnCount++
        game.alternateTurns()
      } else {
        alert(`It's the other player's turn.`)
      }
      break;
    case 'j':
      // player2 slap
      game.slap('player2')
      break;
    default:
      alert(`Player 1 controls: 'q' to deal and 'f' to slap.\nPlayer 2 controls: 'p' to deal and 'j' to slap.\nOnly valid keys accepted.`)
  }
});

// function checkCenterPile(arr) {
//   if (arr === []) {
//     centerDeck.innerHTML = ''
//   }
// }

function runNewGame() {
  startGameButton.classList.add('hidden');
  player1DeckSelector.classList.add('player1__img--highlight'); // add to player1 but leave off player2

  // game instantiation goes here
  feedbackSelector.innerHTML = '';
  game = new Game();
  game.shuffleCards();
  game.dealDeckToPlayers();
  toggleHighlighting('player1');
}

function toggleHighlighting(player) {
  if (player === 'player1') {
    document.querySelector('.player1__title').classList.add('player1__title--highlight');
    document.querySelector('.player2__title').classList.remove('player2__title--highlight');
  } else {
    document.querySelector('.player1__title').classList.remove('player1__title--highlight');
    document.querySelector('.player2__title').classList.add('player2__title--highlight');
  }
}

function checkEmptyDeck(player) {
  if (game[player].hand.length < 1 && player === 'player1') {
    document.querySelector('.player1__deck').innerHTML = `
      <img class="player1__img" src="assets/empty.png" alt="empty card">
    `
    triggerSingleDeal('player2')
  } else if (game[player].hand.length < 1 && player === 'player2') {
     document.querySelector('.player2__deck').innerHTML = `
      <img class="player2__img" src="assets/empty.png" alt="back of card">
    `
    triggerSingleDeal('player1')
  }

}

function triggerSingleDeal(singlePlayer) {
  game.singleDeal = true
  game.singleDealer = singlePlayer
}

function updateFeedback(response, player) {
  var playerName = formatName(player)
  if (response === 'bad') {
    feedbackSelector.innerHTML = `
    <span>${response.toUpperCase()}! ${playerName} loses a card!</span>
  `
  } else {
    feedbackSelector.innerHTML = `
    <span>${response.toUpperCase()}! ${playerName} takes the pile!</span>
  `
  }

}

function formatName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1, 6) + " " + name[6]
}
