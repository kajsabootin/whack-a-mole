const holes = document.querySelectorAll('.hole')
const scoreBoard = document.querySelector('.score')
const moles = document.querySelectorAll('.mole')
const timeLeft = document.querySelector('#time-left')

//let currentTime = timeLeft.textContent

let lastHole;
let timeUp = false;
//let currentTime = timeLeft.textContent
let score = 0;

//let currentTime = timeLeft.textContent


//create a function to make a random time for mole to pop from the hole
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) +min);
}

//create a function that shows a random mole
function randomHole(holes){
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];

   //prevent same hole from getting the same number
   if (hole === lastHole){
     console.log('ah nah thats the same one bud')
     return randomHole(holes);
   }
   lastHole = hole;
   return hole;
}

function peep(){
  const time = randomTime(500, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
      hole.classList.remove('up');
      if(!timeUp){
        peep();
      }
    }, time);
}

function startGame(){
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => timeUp = true, 15000)
  //let timerId = null
  //timerId = setInterval(randomHole, 1000)
}

function wack(e){
  if(!e.isTrusted) return;
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', wack))

/* function moveMole(){
  let timerId = null
  timerId = setInterval(randomHole, 1000)
} */

/* function countDown() {
  currentTime--
  timeLeft.textContent = currentTime

  if(currentTime === 0) {
    clearInterval(timerId)
    alert('nu är det slut' + score)
  }
}

let timerId = setInterval(countDown, 1000) */