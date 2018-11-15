/*
 * Create a list that holds all of your cards
 */
 var all_cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"];
 var first_card;
 var score_counter = 0;
 var time_keeper = new Date();
 var match_counter = 0;
 var stars_counter = 3;

 document.querySelector('.deck').addEventListener('click', function (evt) {
     if (evt.target.classList.contains('match') == false && !(evt.target == first_card) && evt.target.classList.contains('card')) {  // ← verifies target is desired element
       let selectedCard = evt.target;
       score_counter++;
       updateScore(score_counter);
       gameTracker(selectedCard);
     }
 });

 document.getElementById("restart").addEventListener('click', function() {
   restartGame();
 });

function gameTracker(clickedCard) {
  clickedCard.classList.add("open");
  clickedCard.classList.add("show");
  //console.log(subCard.classList);

if (first_card) {
  var subCard = first_card.getElementsByTagName('I');
  var subCard2 = clickedCard.getElementsByTagName('I');
  if (compareCards(subCard, subCard2)){
    first_card.classList.add("match");
    clickedCard.classList.add("match");
    match_counter++;
    if (match_counter == 8) {
      wonGame();
    }
  } else {
    first_card.classList.add("error");
    clickedCard.classList.add("error");
    setTimeout(notMatched, 3000, first_card, clickedCard);
  }

  first_card = null;
  } else {
    first_card = clickedCard;
  }
}

function compareCards(subCard, subCard2) {
  return subCard[0].classList[1] == subCard2[0].classList[1]; //&& !(subCard == subCard2)
}

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

function notMatched(first_card, clickedCard) {
  first_card.classList.remove("open", "show", "error");
  clickedCard.classList.remove("open", "show", "error");
};

function removeClass(first_card, clickedCard) {

};

function wonGame() {
  $('#winningModal').modal('toggle');
  current_time = new Date();
  document.getElementById("move-count").textContent = score_counter;
  document.getElementById("star-count").textContent = stars_counter;
  document.getElementById("game-time").textContent = (current_time-time_keeper)/1000;
}

function restartGame() {
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
