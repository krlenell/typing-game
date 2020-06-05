var typingString = document.getElementById("typing-string")
var modal = document.getElementById("modal")

var severianRant1 = "Certain mystes aver that the real world has been constructed by the human mind, since our ways are governed by the artificial categories into which we place essentially undifferentiated things, things weaker than our words for them."
var severianRant2 = "Is it possible the flower came into being only because Dorcas reached for it? In daylight moments, I know as well as the next that such things are impossible; but I am writing by night"
var severianRant3 = "We imagine ourselves, though we obey the orders of some prosaic person every day, our own masters, when the truth is that our masters are sleeping. One wakes within us and we are ridden like beasts, though the rider is but some hitherto unguessed part of ourselves."
var sampleSentence = "Grumpy wizards make a toxic brew for the jovial queen."
var sentenceArray = []

var currentPlaceInArray = 0
var currentPlaceOnPage
var keyPresses = 0
var matches = 0
var gameStarted = false

function stringToArray(string) {
  var stringArray = []
  for (var i = 0; i < string.length; i++) {
    stringArray.push(string[i])
  }
  return stringArray
}

function userSelection(event) {
  gameStarted = true
  if (event.target.id === "rant-1") {
    startGame(severianRant1)
    modal.classList.add("hidden")
    window.addEventListener('keydown', handleKey)
  }
  if (event.target.id === "rant-2") {
    startGame(severianRant2)
    modal.classList.add("hidden")
    window.addEventListener('keydown', handleKey)
  }
  if (event.target.id === "rant-3") {
    startGame(severianRant3)
    modal.classList.add("hidden")
    window.addEventListener('keydown', handleKey)
  }
}


//
function createSentence(string) {
  sentenceArray = stringToArray(string)
  for (var i = 0; i < sentenceArray.length; i++) {
    var newChar = document.createElement("span")
    newChar.textContent = sentenceArray[i]
    typingString.append(newChar)
  }
}

function underlineOrEndGame() {
  if (currentPlaceOnPage) {
    currentPlaceOnPage.classList.add("current-letter")
  } else {
    alert("Game Over - Your Accuracy is " + getAccuracy(matches, keyPresses))
  }
}

function getAccuracy(matches, key) {
  return (Math.trunc((matches / keyPresses) * 100) + "%")
}

function startGame(choice) {
  createSentence(choice)
  currentPlaceOnPage = typingString.firstElementChild
  underlineOrEndGame()
}

function handleKey(event) {
  var currentChar = sentenceArray[currentPlaceInArray].toLowerCase()
  var keyPressed = event.key
  keyPresses++
  //key is correct
  if (keyPressed === currentChar) {
    matches++
    currentPlaceOnPage.classList.remove("red", "current-letter")
    currentPlaceOnPage.classList.add("green")
    currentPlaceOnPage = currentPlaceOnPage.nextElementSibling
    currentPlaceInArray++
    underlineOrEndGame()
  } else {
    currentPlaceOnPage.classList.add("red")
  }
}

modal.addEventListener('click', userSelection)
if (gameStarted) {
}
