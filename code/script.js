const holes = document.querySelectorAll('.hole')
const scoreBoard = document.querySelector('.score')
const moles = document.querySelectorAll('.mole')
const secondsLeft = document.querySelector('#time-left')

let lastHole;
let score = 0;
let seconds = 20;

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
  //setTimeout sätter bara en timer men man får inte reda på hur lång tid det gått, med setInterval så 
  //sätter du att den ska köra t ex en gång i sekunden och så körs funktionen varje sekund
  setTimeout(() => {
      hole.classList.remove('up');
      if(!timeUp){
        peep();
      }
    }, time);
}

function startTimer () {
  //The setInterval() method calls a function or evaluates an expression at specified 
  //intervals (in milliseconds).
  const interval = setInterval(() => {
    seconds -= 1;
    secondsLeft.textContent = seconds;
      if (seconds === 0) {
          //The setInterval() method will continue calling the function until 
          //clearInterval() is called, or the window is closed.
          clearInterval(interval)
      }
  }, 1000)
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  seconds = 20;
  peep();
  startTimer()
  setInterval(() => timeUp = true, 20000) //show random minions for 20 seconds
}

function wack(e){
  if(!e.isTrusted) return;
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', wack))