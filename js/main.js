var game;

var startGameButton = document.querySelector('.center-pile__startbtn');
var player1Title = document.querySelector('.player1__title');
var player2Title = document.querySelector('.player2__title');
var player1Front = document.querySelector('.player1__img-front');
var player1Empty = document.querySelector('.player1__img-empty');
var player2Front = document.querySelector('.player2__img-front');
var player2Empty = document.querySelector('.player2__img-empty');
var player1Wins = document.querySelector('.player1__wins')
var player2Wins = document.querySelector('.player2__wins')
var centerDeck = document.querySelector('.center-pile__deck');
var feedbackSelector = document.querySelector('.feedback-message');

startGameButton.addEventListener('click', runNewGame);

document.addEventListener('keyup', function(event) {
  var currentPlayer = game.turn
  feedbackSelector.innerHTML = ''

  switch (event.key) {
    case 'q':
      if (currentPlayer === 'player1') {
        game.playerDealsCard(currentPlayer);

        centerDeck.innerHTML = `
          <img class="center-pile__img ${game.player1.id}__img--center-highlight" src="assets/card-fronts/${game.centerPile[0]}.png" alt="player card">
        `
        checkEmptyDeck(currentPlayer)
        game.turnCount++
        game.alternateTurns()
        toggleHighlighting(game.turn)
      } else {
        alert(`It's the other player's turn.`)
      }
      break;
    case 'p':
      if (currentPlayer === 'player2') {
        game.playerDealsCard(currentPlayer);

        centerDeck.innerHTML = `
          <img class="center-pile__img ${game.player2.id}__img--center-highlight" src="assets/card-fronts/${game.centerPile[0]}.png" alt="player card">
        `
        checkEmptyDeck(currentPlayer)
        game.turnCount++
        game.alternateTurns()
        toggleHighlighting(game.turn)
      } else {
        alert(`It's the other player's turn.`)
      }
      break;
    case 'f':
      game.slap('player1')
      updateFeedback()
      break;
    case 'j':
      game.slap('player2')
      updateFeedback()
      break;
    default:
      alert(`Player 1 controls: 'q' to deal and 'f' to slap.\nPlayer 2 controls: 'p' to deal and 'j' to slap.\nOnly valid keys accepted.`)
  }
});

function runNewGame() {
  startGameButton.classList.add('hidden');
  centerDeck.classList.toggle('hidden');

  toggleHighlighting('player1');
  feedbackSelector.innerHTML = '';

  game = new Game();
  game.shuffleCards(game.wholeDeck);
  game.dealDeckToPlayers();

  checkLocalStorage();
}

function toggleHighlighting(player) {
  if (player === 'player1') {
    player1Title.classList.add('player1__title--highlight');
    player2Title.classList.remove('player2__title--highlight');
  } else {
    player1Title.classList.remove('player1__title--highlight');
    player2Title.classList.add('player2__title--highlight');
  }
}

function checkEmptyDeck(player) {
  if (game[player].hand.length === 0 && player === 'player1') {
    feedbackSelector.innerHTML = `
      <p class="feedback-message__instructions--p3">
        While one player's deck is empty, if either player slaps anything other than a jack, they'll lose.
      </p>
    `
    showEmptyCard(player)
    // player1Front.classList.add('hidden');
    // player1Empty.classList.remove('hidden');
    triggerSingleDeal('player2')
  } else if (game[player].hand.length === 0 && player === 'player2') {
    feedbackSelector.innerHTML = `
      <p class="feedback-message__instructions--p3">
        While one player's deck is empty, if either player slaps anything other than a jack, they'll lose.
      </p>
    `
    showEmptyCard(player)
    // player2Front.classList.add('hidden');
    // player2Empty.classList.remove('hidden');
    triggerSingleDeal('player1')
  }
}

function triggerSingleDeal(singlePlayer) {
  game.singleDeal = true
  game.singleDealer = singlePlayer
}

function undoSingleDeal() {
  game.singleDeal = false
  game.singleDealer = null
  game.turnCount++
  game.alternateTurns()
  toggleHighlighting(game.turn)
}

// todo --> put empty card changing into two other functions
function updateFeedback() {
  var player = game.feedbackPlayer
  var response = game.feedback
  var playerName = formatName(player)
  var chunk;

  centerDeck.innerHTML = `
      <img class="player1__img" src="assets/blank.png" alt="empty card">
    `

  if (response === 'bad slap' && game.singleDeal === true ) {
    chunk = `
      <span>${response.toUpperCase()}! ${playerName} loses the game!</span>
    `

    player === 'player1' ? game.loser = 'player1' : game.loser = 'player2'
    player === 'player1' ? game.winner = 'player2' : game.winner = 'player1'

    game.adjustMiddlePile(game.winner)
    game.determineWinner();

    hideEmptyCard('player1')
    hideEmptyCard('player2')

    // player1Front.classList.remove('hidden');
    // player1Empty.classList.add('hidden');
    // player2Front.classList.remove('hidden');
    // player2Empty.classList.add('hidden');

    centerDeck.classList.add('hidden');
    startGameButton.classList.remove('hidden');
  } else if (response === 'bad slap') {
    chunk = `
      <span>${response.toUpperCase()}! ${playerName} loses a card!</span>
    `
  } else if (response === 'jack back') {
    var subchunk = 'jack'

    hideEmptyCard(player)

    // if (player === 'player1') {
    //   hideEmptyCard(player)
    //   // player1Front.classList.remove('hidden');
    //   // player1Empty.classList.add('hidden');
    // } else if (player === 'player2') {
    //   hideEmptyCard()
    //   player2Front.classList.remove('hidden');
    //   player2Empty.classList.add('hidden');
    // }

    chunk = `
      <span>${subchunk.toUpperCase()}! ${playerName} is back in the game!</span>
    `
    undoSingleDeal()
  } else if (response === 'winner') {
    chunk = `
      <span>${response.toUpperCase()}! ${playerName} wins the game!</span>
    `
    hideEmptyCard('player1')
    hideEmptyCard('player2')

    // player1Front.classList.remove('hidden');
    // player1Empty.classList.add('hidden');
    // player2Front.classList.remove('hidden');
    // player2Empty.classList.add('hidden');

    centerDeck.classList.add('hidden');
    startGameButton.classList.remove('hidden');
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
  var winsp1 = JSON.parse(localStorage.getItem('player1'));
  var winsp2 = JSON.parse(localStorage.getItem('player2'));

  if (winsp1 != null) {
    player1Wins.innerHTML = `${winsp1} wins`
    game.player1.wins = winsp1
  } else {
    player1Wins.innerHTML = `0 wins`
  }

  if (winsp2 != null) {
    player2Wins.innerHTML = `${winsp2} wins`
    game.player2.wins = winsp2
  } else {
    player2Wins.innerHTML = `0 wins`
  }
}

function showEmptyCard(player) {
  if (player === 'player1') {
    player1Front.classList.add('hidden');
    player1Empty.classList.remove('hidden');
  } else if (player === 'player2') {
    player2Front.classList.add('hidden');
    player2Empty.classList.remove('hidden');
  }
}

function hideEmptyCard(player) {
  if (player === 'player1') {
    player1Front.classList.remove('hidden');
    player1Empty.classList.add('hidden');
  } else if (player === 'player2') {
    player2Front.classList.remove('hidden');
    player2Empty.classList.add('hidden');
  }
}
