var typingString = document.getElementById("typing-string")
var modal = document.getElementById("modal")
var stats = document.getElementById("stats")
var time = document.getElementById("time")
var wpm = document.getElementById("wpm")
var intro = document.getElementById("intro-text")
var endStats = document.getElementById("end-stats")



var severianRant1 = "Certain mystes aver that the real world has been constructed by the human mind, since our ways are governed by the artificial categories into which we place essentially undifferentiated things, things weaker than our words for them."
var severianRant2 = "Is it possible the flower came into being only because Dorcas reached for it? In daylight moments, I know as well as the next that such things are impossible; but I am writing by night"
var severianRant3 = "We imagine ourselves, though we obey the orders of some prosaic person every day, our own masters, when the truth is that our masters are sleeping. One wakes within us and we are ridden like beasts, though the rider is but some hitherto unguessed part of ourselves."
// var sampleSentence = "Grumpy wizards make a toxic brew for the jovial queen."
var sentenceArray = []

var currentPlaceInArray = 0
var currentPlaceOnPage
var keyPresses = 0
var matches = 0
var roundTime = 0
var timer
var wordsInString
var wordsTyped

function userSelection(event) {
  if (event.target.id === "rant-1") {
    startGame(severianRant1)
  }
  if (event.target.id === "rant-2") {
    startGame(severianRant2)
  }
  if (event.target.id === "rant-3") {
    startGame(severianRant3)
  }
}

function timerStart() {
  timer = setInterval(function () {
    roundTime++
    time.textContent = "Time: " + clockConvert(roundTime)
  }, 1000)
}

function clockConvert(time) {
  var min = 0
  var sec = time
  if (sec >= 60) {
    sec = time % 60
    min = (time - sec) / 60
  }
  return addZeroesToClock(min) + ":" + addZeroesToClock(sec)
}

function addZeroesToClock(timeNumber) {
  if (timeNumber < 10) {
    return "0" + timeNumber
  }
  return timeNumber
}

function wordsPerMinute() {
  return "WPM: " + Math.trunc((wordsTyped / (roundTime / 60)))
}


//appends sentence made of char and spans to document
function createSentence(string) {
  //splits by word
  wordsInString = string.split(" ").length
  //creates array of individual chars
  sentenceArray = string.split('')
  for (var i = 0; i < sentenceArray.length; i++) {
    var newChar = document.createElement("span")
    newChar.textContent = sentenceArray[i]
    typingString.append(newChar)
  }
}

//determines what happens next
function underlineOrEndGame() {
  if (currentPlaceOnPage) {
    currentPlaceOnPage.classList.add("current-letter")
  } else {
    resetGame()
  }
}

//calculates accuracy
function getAccuracy(matches, keyPresses) {
  return (Math.trunc((matches / keyPresses) * 100) + "%")
}

//initiates sentence on string based on selection
function startGame(choice) {
  currentPlaceInArray = 0
  roundTime = 0
  keyPresses = 0
  matches = 0
  wordsTyped = 0
  createSentence(choice)
  currentPlaceOnPage = typingString.firstElementChild
  modal.classList.add("hidden")
  window.addEventListener('keydown', handleKey)
  stats.classList.remove("hidden")
  timerStart()
  underlineOrEndGame()
}

function handleKey(event) {
  var currentChar = sentenceArray[currentPlaceInArray].toLowerCase()
  var keyPressed = event.key.toLowerCase()
  if (event.key !== 'Shift') {
    keyPresses++
  }
  //key is correct
  if (keyPressed === currentChar) {
    if (currentChar === ' ') {
      wordsTyped++
      wpm.textContent = wordsPerMinute()
    }
    matches++
    currentPlaceOnPage.classList.remove("red", "current-letter")
    currentPlaceOnPage.classList.add("green")
    currentPlaceOnPage = currentPlaceOnPage.nextElementSibling
    currentPlaceInArray++
    underlineOrEndGame()
  } else { //key incorrect
    currentPlaceOnPage.classList.add("red")
  }
}

function resetGame() {
  while (typingString.firstElementChild) {
    typingString.removeChild(typingString.lastElementChild)
  }
  wordsTyped++
  endStats.classList.remove("hidden")
  modal.classList.remove("hidden")
  stats.classList.add("hidden")
  intro.textContent = "Game Over.  Play Again?"
  endStats.textContent = "Your accuracy: " + getAccuracy(matches, keyPresses) + "Total Time: " + clockConvert(roundTime) + " " + wordsPerMinute()
  clearInterval(timer)
}


modal.addEventListener('click', userSelection)
