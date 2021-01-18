var game;

var startGameButton = document.querySelector('.center-pile__startbtn');
var player1front = document.querySelector('.player1__img-front');
var player1empty = document.querySelector('.player1__img-empty');
var player2front = document.querySelector('.player2__img-front');
var player2empty = document.querySelector('.player2__img-empty');
var centerDeck = document.querySelector('.center-pile__deck');
var feedbackSelector = document.querySelector('.feedback-message');

startGameButton.addEventListener('click', runNewGame);

document.addEventListener('keyup', function(event) {
  var currentPlayer = game.turn
  feedbackSelector.innerHTML = ''

  switch (event.key) {
    case 'q':
      if (currentPlayer === 'player1') {
        game.playerDealsCard(currentPlayer)

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
        game.playerDealsCard(currentPlayer)

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
      break;
    case 'j':
      game.slap('player2')
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
    document.querySelector('.player1__title').classList.add('player1__title--highlight');
    document.querySelector('.player2__title').classList.remove('player2__title--highlight');
  } else {
    document.querySelector('.player1__title').classList.remove('player1__title--highlight');
    document.querySelector('.player2__title').classList.add('player2__title--highlight');
  }
}

// todo --> I've tried abstracting these class changes out, but I can't get it to work. I'd appreciate feedback about how
//  I could do that if possible, so it can be a dynamic function instead of being so rigid
function checkEmptyDeck(player) {
  if (game[player].hand.length === 0 && player === 'player1') {
    feedbackSelector.innerHTML = `While your deck is empty, if you slap anything other than a jack, you'll lose.`
    player1front.classList.add('hidden');
    player1empty.classList.remove('hidden');
    triggerSingleDeal('player2')
  } else if (game[player].hand.length === 0 && player === 'player2') {
    feedbackSelector.innerHTML = `While your deck is empty, if you slap anything other than a jack, you'll lose.`
    player2front.classList.add('hidden');
    player2empty.classList.remove('hidden');
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

// todo --> this function is huge. I tried abstracting out some of the hide/show functionality but it doesn't
//  work right. I'd appreciate any feedback on how to slim this monster down.
function updateFeedback(response, player) {
  var playerName = formatName(player)
  var chunk;
  centerDeck.innerHTML = `
      <img class="player1__img" src="assets/blank.png" alt="empty card">
    `

  if (response === 'bad slap' && game.singleDeal === true ) {
    chunk = `
      <span>${response.toUpperCase()}! ${playerName} loses the game!</span>
    `
    // if bad slap and single deal === ran out of cards and then slapped something other than a jack
    //   so the player who slapped bad is loser and other player is winner
    player === 'player1' ? game.loser = 'player1' : game.loser = 'player2'
    player === 'player1' ? game.winner = 'player2' : game.winner = 'player1'

    // game.updateWinCount(game.winner)

    game.adjustMiddlePile(game.winner)
    checkLocalStorage();

    player1front.classList.remove('hidden');
    player1empty.classList.add('hidden');
    player2front.classList.remove('hidden');
    player2empty.classList.add('hidden');

    centerDeck.classList.add('hidden');
    startGameButton.classList.remove('hidden');
  } else if (response === 'bad slap') {
    chunk = `
      <span>${response.toUpperCase()}! ${playerName} loses a card!</span>
    `
  } else if (response === 'jack back') {
    var subchunk = 'jack'

    if (player === 'player1') {
      player1front.classList.remove('hidden');
      player1empty.classList.add('hidden');
    } else if (player === 'player2') {
      player2front.classList.remove('hidden');
      player2empty.classList.add('hidden');
    }

    chunk = `
      <span>${subchunk.toUpperCase()}! ${playerName} is back in the game!</span>
    `
    undoSingleDeal()
  } else if (response === 'winner') {
    chunk = `
      <span>${response.toUpperCase()}! ${playerName} wins the game!</span>
    `

    player1front.classList.remove('hidden');
    player1empty.classList.add('hidden');
    player2front.classList.remove('hidden');
    player2empty.classList.add('hidden');

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
    document.querySelector('.player1__wins').innerHTML = `${winsp1} wins`
    game.player1.wins = winsp1
  } else {
    document.querySelector('.player1__wins').innerHTML = `0 wins`
  }

  if (winsp2 != null) {
    document.querySelector('.player2__wins').innerHTML = `${winsp2} wins`
    game.player2.wins = winsp2
  } else {
    document.querySelector('.player2__wins').innerHTML = `0 wins`
  }
}
