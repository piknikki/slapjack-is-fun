var game;

var startGameButton = document.querySelector('.center-pile__startbtn');
var player1front = document.querySelector('.player1__img-front');
var player1empty = document.querySelector('.player1__img-empty');
var player2front = document.querySelector('.player2__img-front');
var player2empty = document.querySelector('.player2__img-empty');
var centerDeck = document.querySelector('.center-pile__deck');
var feedbackSelector = document.querySelector('.feedback-message');

startGameButton.addEventListener('click', runNewGame);
window.addEventListener('load', checkLocalStorage)

document.addEventListener('keyup', function(event) {

  var currentPlayer = game.turn
  console.log(game[currentPlayer].hand)
  feedbackSelector.innerHTML = ''

  switch (event.key) {
    case 'q':
      if (currentPlayer === 'player1') {
        game.playerDealsCard(currentPlayer)

        centerDeck.innerHTML = `
          <img class="center-pile__img ${game.player1.id}__img--center-highlight" src="assets/card-fronts/${game.centerPile[0]}.png" alt="player card">
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
      if (currentPlayer === 'player2') {
        game.playerDealsCard(currentPlayer)

        centerDeck.innerHTML = `
          <img class="center-pile__img ${game.player2.id}__img--center-highlight" src="assets/card-fronts/${game.centerPile[0]}.png" alt="player card">
        `
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
  centerDeck.classList.toggle('hidden');

  feedbackSelector.innerHTML = '';
  game = new Game();
  checkLocalStorage();
  game.reset()
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
  var chunk;
  centerDeck.innerHTML = `
      <img class="player1__img" src="assets/blank.png" alt="empty card">
    `

  if (response === 'bad') {
    chunk = `
      <span>${response.toUpperCase()}! ${playerName} loses a card!</span>
    `
  } else if (response === 'winner') {
    chunk = `
      <span>${response.toUpperCase()}! ${playerName} wins the game!</span>
    `
    game[player].saveWinsToStorage()
    checkLocalStorage();
    // centerDeck.classList.add('hidden');
    game.reset();
    // startGameButton.classList.remove('hidden');
  } else {
    chunk = `
      <span>${response.toUpperCase()}! ${playerName} takes the pile!</span>
    `
  }
  return feedbackSelector.innerHTML = chunk;
}

function formatName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1, 6) + " " + name[6]
}

function checkLocalStorage() {
  var winsp1 = JSON.parse(localStorage.getItem('player1'))
  var winsp2 = JSON.parse(localStorage.getItem('player2'))

  if (winsp1 != null) {
    console.log(winsp1)
    // game.player1.wins = winsp1;
    document.querySelector('.player1__wins').innerHTML = `${winsp1} wins`
  } else {
    document.querySelector('.player1__wins').innerHTML = `0 wins`
  }

  if (winsp2 != null) {
    console.log(winsp2)
    // game.player2.wins = winsp2
    document.querySelector('.player2__wins').innerHTML = `${winsp2} wins`
  } else {
    document.querySelector('.player2__wins').innerHTML = `0 wins`
  }
}

function toggleEmptyCard(player) {
  if (player === 'player1') {
    player1front.classList.toggle('.hidden');
    player1empty.classList.toggle('.hidden');
  } else if (player === 'player2') {
    player2front.classList.toggle('.hidden');
    player2empty.classList.toggle('.hidden');
  }

}
