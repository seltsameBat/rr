class AudioController {
  constructor() {
  this.muted = false;
  this.bgMusic = new Audio("assets/Audio/background-main.mp3");
  this.flipSound = new Audio("assets/Audio/flipcard.wav");
  this.matchedSound = new Audio("assets/Audio/matchcard.wav");
  this.levelUpSound = new Audio("assets/Audio/level-up.wav");
  this.gameOverSound = new Audio("assets/Audio/game-over.mp3");
  this.victorySound = new Audio("assets/Audio/victory-sound.mp3");
  this.bgMusic.volume = 0.2;
  this.victorySound.volume = 0.3;
  this.bgMusic.loop = true;
  }
  
  startMusic() {
  this.bgMusic.play();
  }
  
  stopMusic() {
  this.bgMusic.pause();
  }
  
  flip() {
  this.flipSound.play();
  }
  
  match() {
  this.matchedSound.play();
  }
  
  levelUpBuzz() {
  this.levelUpSound.play();
  }
  
  victory() {
  this.stopMusic();
  this.victorySound.play();
  }
  
  gameOver() {
  this.stopMusic();
  this.gameOverSound.play();
  }
  
  }
  
  // Onclick soundIcon to toggle sound icon image
  
  function soundIcon() {
  if (document.getElementById("soundToggler").classList.contains("soundOn")) {
  document.getElementById("soundToggler").classList.toggle("soundOff");
  }
  }
  
  
  class MemoryGame {
  constructor(totalTime) {
  this.cardsArray = [];
  this.totalTime = totalTime;
  this.timeRemaining = totalTime; // countdown timer
  this.timer = document.getElementById('time-remaining');
this.ticker = document.getElementById('flips');
this.audioController = new AudioController();
this.currentLevel = 1;
}
 // Separate function for images
 getImagesForLevel(level) {
  switch(level) {
      case 1:
          // Define the image URLs for level 1
          let imagesLevel1 = [
              "assets/images/da.png",
              "assets/images/f.png",
               "assets/images/i.png",
              "assets/images/lu.png",
               "assets/images/mu.jpeg",
              "assets/images/z.jpeg",
             
          ];
          // Duplicate the array for level 1
          return imagesLevel1.concat(imagesLevel1); // Concatenate to duplicate the array

      case 2:
          // Define the image URLs for level 2
          let imagesLevel2 = [ "assets/images/lj.png"
            , "URL6", "URL7", "URL8"];
          // Duplicate the array for level 2
          return imagesLevel2.concat(imagesLevel2); // Concatenate to duplicate the array

      case 3:
          // Define the image URLs for level 3
          let imagesLevel3 = ["URL9", "URL10", "URL11", "URL12"];
          // Duplicate the array for level 3
          return imagesLevel3.concat(imagesLevel3); // Concatenate to duplicate the array

      case 4:
          // Define the image URLs for level 4
          let imagesLevel4 = ["URL13", "URL14", "URL15", "URL16"];
          // Duplicate the array for level 4
          return imagesLevel4.concat(imagesLevel4); // Concatenate to duplicate the array

      case 5:
          // Define the image URLs for level 5
          let imagesLevel5 = ["URL17", "URL18", "URL19", ];
          // Duplicate the array for level 5
          return imagesLevel5.concat(imagesLevel5); // Concatenate to duplicate the array

      
  }
}

generateCards() {
  
  const level = this.currentLevel;
  let cards = this.getImagesForLevel(level);  // Fetch images dynamically
  

  let insertCard = document.querySelector('.card-container');
  insertCard.innerHTML = "";
  


  cards.forEach(href => insertCard.innerHTML += `
      <div class="card">
          <div class="card-back card-face">
              <img src="assets/js/images/cam.png" alt="card ack" class="card-img">
          </div>
          <div class="card-front card-face">
              <img class="card-value card-img" src="${href}" alt="jungle-books-image">
          </div>
      </div>`);
  
  this.cardsArray = Array.from(document.getElementsByClassName('card'));
  
  this.cardsArray.forEach(card => {
      card.addEventListener('click', () => this.flipCard(card));
  });

  
  }
  
 

startGame() {
this.cardToCheck = null;
this.totalClicks = 0;
this.timeRemaining = this.totalTime; //time will reset each time when the game starts


this.matchedCards = [];
this.busy = true; // wait for 500ms before countdown and bgmusic begins

setTimeout(() => {
  this.audioController.startMusic();
  this.muted = false;
  this.countDown = this.startCountDown();
  this.busy = false;
}, 500);
this.hideCards(); //this will reset inner timer and text

this.timer.innerText = this.timeRemaining;
this.ticker.innerText = this.totalClicks;
this.generateCards();
this.shuffleCards();



}

hideCards() {
this.cardsArray.forEach(card => {
card.classList.remove('visible');
});
}

//flip card with click and increase the total click in the flip section

flipCard(card) {
if (this.canFlipCard(card)) {
this.audioController.flip();
this.totalClicks++;
this.ticker.innerText = this.totalClicks;
card.classList.add('visible');
if (this.cardToCheck) {
  this.checkCardMatch(card);
} else {
  this.cardToCheck = card;
}
}
}

// Check if the card is matched

checkCardMatch(card) {
if (this.getCardType(card) === this.getCardType(this.cardToCheck)) this.cardMatch(card, this.cardToCheck);else this.cardUnMatch(card, this.cardToCheck);
this.cardToCheck = null;
}

// When both card is matched call this function

cardMatch(card1, card2) {
this.matchedCards.push(card1);
this.matchedCards.push(card2);
this.audioController.match();
if (this.matchedCards.length === this.cardsArray.length) this.levelUp();
}

// if the card does not match call this function

cardUnMatch(card1, card2) {
this.busy = true;
setTimeout(() => {
card1.classList.remove('visible');
card2.classList.remove('visible');
this.busy = false;
}, 700);
}

// this is created for checking match for card in checkCardMatch function

getCardType(card) {
return card.getElementsByClassName('card-value')[0].src;
}

// this will begin the countdown

startCountDown() {
return setInterval(() => {
this.timeRemaining--;
this.timer.innerText = this.timeRemaining;
if (this.timeRemaining === 0) this.gameOver();
}, 1000);
}

// this will clear the interval and bring out gameover-overlay

gameOver() {
clearInterval(this.countDown);
this.audioController.gameOver();
document.getElementById('game-over-text').classList.add('visible');
}

// this will clear the interval and bring out gameover-overlay

victory() {
clearInterval(this.countDown);
this.audioController.victory();
document.getElementById('victory-text').classList.add('visible');
this.hideCards();
}

// Level Up function
// Updated function to show level-up information, star rating, and next level button
function levelUp() {
    clearInterval(this.countDown);
    this.calculateStars(); // Calculate and display stars

    this.currentLevel++;

    // Display level-up info
    document.getElementById('level-up-container').style.display = 'block';
    document.getElementById('flips-count').innerText = `Flips: ${this.numFlips}`;
    document.getElementById('time-taken').innerText = `Time taken: ${this.timeRemaining}s`;

    if (this.currentLevel > 3) {
        this.victory();
        this.currentLevel = 1;
    } else {
        this.audioController.levelUpBuzz();
        document.getElementById('level-up-text').classList.add('visible');
    }

    // Show the next level button
    document.getElementById('next-level-btn').onclick = () => {
        this.startNextLevel();
        document.getElementById('level-up-container').style.display = 'none'; // Hide level-up display
    };
}

// Modified function to calculate and display the stars
function calculateStars() {
    const percentage = (this.timeRemaining / this.totalTime) * 100;
    let stars = 1; // Default is 1 star

    if (percentage >= 70) {
        stars = 3;
    } else if (percentage >= 40) {
        stars = 2;
    }

    // Update star display
    document.getElementById('star-rating').innerHTML = "⭐".repeat(stars);
}

// Function to start the next level
function startNextLevel() {
    // Reset necessary values and start the next level's countdown or logic
    this.resetLevel();
    this.startLevel();
}
// Code snippet SOURCE: PORTEx Youtube- FisherYates shuffle algo.

shuffleCards() {
for (let i = this.cardsArray.length - 1; i > 0; i--) {
let randomIndex = Math.floor(Math.random() * (i + 1));
this.cardsArray[randomIndex].style.order = i;
this.cardsArray[i].style.order = randomIndex;
}
}

canFlipCard(card) {
// if this statements is false then it will return true and player can flip the card
return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
}

//mute function

mute() {
this.audioController.stopMusic();
this.muted = true;
}

//Unmute function

unmute() {
this.audioController.startMusic();
this.muted = false;
}

}

function ready() {
let overlays = Array.from(document.getElementsByClassName('overlay-text'));
let game = new MemoryGame(100); //time for each level

overlays.forEach(overlay => {
overlay.addEventListener('click', () => {
overlay.classList.remove('visible'); //this will start the game when clicked


  game.startGame();
});



});

// sound Button

let soundBtn = document.getElementById('soundToggler');
soundBtn.addEventListener('click', () => {
if (document.getElementById("soundToggler").classList.contains("soundOff")) {
game.mute();
} else {
game.unmute();
}
});

// these button will reload the page when clicked

let reloadButtons = document.querySelectorAll('#victoryBtn, #gameOverBtn');

for (let i = 0; i < reloadButtons.length; i++) {
reloadButtons[i].onclick = () => {
location.reload();
};
}
}

if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
