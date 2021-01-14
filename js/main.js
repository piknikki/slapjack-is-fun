// need to detect keystrokes here
// need start functionality -- some way to start when players are ready
// maybe instructions???

// event listener on keys for slap
// event listener on keys for deal

var startGameButton = document.querySelector('.center-pile__startbtn');

startGameButton.addEventListener('click', runNewGame);

function runNewGame() {
  // game instantiation goes here

  var game = new Game()
  document.querySelector('.center-pile__deck').classList.toggle('hidden');
  document.querySelector('.center-pile__startbtn').classList.add('hidden');
}
