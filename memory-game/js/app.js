/*
 * Create a list that holds all of your cards
 */
 var all_cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"];
 var first_card;
 var score_counter = 0;
 var time_keeper = new Date();
 var match_counter = 0;
 var stars_counter = 3;
 var lock_game = false;
 var time_in_seconds, time_in_minutes;

// Game Timer
 var game_time = setInterval(function() {
   var update_time = new Date();
   var time_difference = Math.floor((update_time-time_keeper)/1000);
   time_in_seconds = time_difference % 60;
   time_in_minutes = Math.floor(time_difference / 60);
   if (time_in_seconds < 10) {time_in_seconds = "0" + time_in_seconds;}
   if (time_in_minutes < 10) {time_in_minutes = "0" + time_in_minutes;}
   document.getElementById("seconds").textContent = time_in_seconds;
   document.getElementById("minutes").textContent = time_in_minutes;
}, 1000);

//Click listener for any one of the tiles
 document.querySelector('.deck').addEventListener('click', function (evt) {
     if (evt.target.classList.contains('match') == false && !(evt.target == first_card) && evt.target.classList.contains('card') && !lock_game) {  // ← verifies that clicked card is not already matched or open and more than two cards are not open
       lock_game = true;
       let selectedCard = evt.target;
       score_counter++;
       updateScore(score_counter);
       gameTracker(selectedCard);
     }
 });

//To restart Game using the refresh icon
 document.getElementById("restart").addEventListener('click', function() {
   restartGame();
 });

// Main function that tracks the status of the game. Runs comparisson if this is the second card that is getting clicked else assigns first card.
function gameTracker(clickedCard) {
  clickedCard.classList.add("open", "show");
  if (first_card) { //Checking that first card is already open and user clicking on the second card in pair
    var subCard = first_card.getElementsByTagName('I');
    var subCard2 = clickedCard.getElementsByTagName('I');
    if (compareCards(subCard, subCard2)){  // If first and second card match
      first_card.classList.add("match");
      clickedCard.classList.add("match");
      match_counter++;
      if (match_counter == 8) { wonGame() } // If all the 8 pairs are open
      lock_game = false;
    } else {  // If they dont match
      first_card.classList.add("error");
      clickedCard.classList.add("error");
      setTimeout(notMatched, 2000, first_card, clickedCard);
    }
    first_card = null;
  } else {    // if this is the first card in the pair to be opened
    first_card = clickedCard;
    lock_game = false;
  }
}

// Compairing the already open card and the card the card that was clicked is same
function compareCards(subCard, subCard2) {
  return subCard[0].classList[1] == subCard2[0].classList[1]; //&& !(subCard == subCard2)
}

// Update the score after every click
function updateScore(score) {
  document.getElementsByClassName("moves")[0].textContent = score;
  if (score == 20) {
    document.getElementById("star-3").classList.replace("fa-star","fa-star-o"); stars_counter = 2;
  } else if (score == 25){
    document.getElementById("star-2").classList.replace("fa-star","fa-star-o"); stars_counter = 1;
  } else if (score == 30) {
    document.getElementById("star-1").classList.replace("fa-star","fa-star-o"); stars_counter = 0;
  } else if (score == 0) {
    document.getElementById("star-3").classList.replace("fa-star-o","fa-star");
    document.getElementById("star-2").classList.replace("fa-star-o","fa-star");
    document.getElementById("star-1").classList.replace("fa-star-o","fa-star");
    stars_counter = 3;
  }
}

// Close the cards and unlock board if cards don't match
function notMatched(first_card, clickedCard) {
  first_card.classList.remove("open", "show", "error");
  clickedCard.classList.remove("open", "show", "error");
  lock_game = false;
};

// Open winning modal and show the score
function wonGame() {
  $('#winningModal').modal('toggle');
  current_time = new Date();
  document.getElementById("move-count").textContent = score_counter;
  document.getElementById("star-count").textContent = stars_counter;
  document.getElementById("game-time-seconds").textContent = time_in_seconds;
  document.getElementById("game-time-minutes").textContent = time_in_minutes;
}

// Restart game
function restartGame() {
  lock_game = false;
  var old_order = [];
  for (var i = 0; i < all_cards.length; i++) {
    old_order[i] = all_cards[i];
  }
  shuffle(all_cards);
  var blah2 = document.querySelectorAll('.card')
  var blah = document.querySelectorAll('.card .fa')
  for (var i = 0; i < all_cards.length; i++) {
    blah2[i].classList.remove("match", "open", "show", "error");
    blah[i].classList.replace(old_order[i], all_cards[i]);
  }
  match_counter = 0;
  score_counter = 0
  updateScore(score_counter);
  first_card = null;
  time_keeper = new Date();
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
