# SlapJack!
Slapjack is a card game where you take turns dealing a single card into the middle pile and slap the whole pile if you see a jack -- 
whoever SLAPS it first wins the pile. In this game, you can also win the pile if you slap doubles (two cards with the same number),
or a Sammich (two same cards with a different one in between them.). You use the keyboard to deal and to slap (after clicking in the 
center to start a new game).

## Gameplay
* Player 1 keys: 
  - `q` to deal a card
  - `f` to slap

* Player 2 keys:
    - `p` to deal a card
    - `j` to slap
    
* Players alternate turns dealing.
* Slap on Jack, win the pile (your hand is automatically shuffled).
* Slap on doubles, win the pile (your hand is automatically shuffled).
* Slap on sammich, win the pile (your hand is automatically shuffled).
* Slap any other time, and you lose a card to your opponent (your top card gets put on bottom of their hand).

What if you're out of cards, you ask?
* When you run out, you can get back in the game by slapping a Jack. If you slap anything else, any time, you'll lose.
* Once you're back in the game, you can once again use doubles and sammiches.

### About me
* I'm Nikki and I wrote all the code for this project. I started with basic HTML and CSS, then added BEM and Sass to spice up 
my organization in those files. Next I added a data file to hold the names of the cards so that I could access those fairly easily 
  for shuffling and dealing. Then I added the Player and Game classes, which evolved organically as I built the game play 
  organization in my main.js file. 
