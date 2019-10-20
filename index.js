var Word = require("./word.js");
var inquirer = require("inquirer");

// letters entry
var letterArray = "abcdefghijklmnopqrstuvwxyz";

// List of words to choose from
var nbaTeams = [
  "bucks",
  "raptors",
  "sixers",
  "celtics",
  "pacers",
  "nets",
  "magic",
  "pistons",
  "hornets",
  "heat",
  "wizards",
  "hawks",
  "bulls",
  "cavaliers",
  "knicks",
  "warriors",
  "nuggets",
  "trailblazers",
  "rockets",
  "jazz",
  "thunder",
  "spurs",
  "clippers",
  "kings",
  "lakers",
  "timberwolves",
  "grizzlies",
  "pelicans",
  "mavericks",
  "sun"
];

// Pick Random index from nbaTeams array
var randomIndex = Math.floor(Math.random() * nbaTeams.length);
var randomWord = nbaTeams[randomIndex];

// Pass random word through Word constructor
var computerWord = new Word(randomWord);

var requireNewWord = false;

// Array for guessed letters
var incorrectLetters = [];
var correctLetters = [];

// Guesses left
var guessesLeft = 10;

function logic() {
  // Generates new word for Word constructor if true
  if (requireNewWord) {
    // Selects random nbaTeams array
    var randomIndex = Math.floor(Math.random() * nbaTeams.length);
    var randomWord = nbaTeams[randomIndex];

    // Passes random word through the Word constructor
    computerWord = new Word(randomWord);

    requireNewWord = false;
  }

  // TestS if a letter guessed is correct
  var wordComplete = [];
  computerWord.objArray.forEach(completeCheck);

  // letters remaining to be guessed
  if (wordComplete.includes(false)) {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Guess a letter between A and Z!",
          name: "userinput"
        }
      ])
      .then(function(input) {
        if (
          !letterArray.includes(input.userinput) ||
          input.userinput.length > 1
        ) {
          console.log("\nPlease try again!\n");
          logic();
        } else {
          if (
            incorrectLetters.includes(input.userinput) ||
            correctLetters.includes(input.userinput) ||
            input.userinput === ""
          ) {
            console.log("\nAlready Guessed\n");
            logic();
          } else {
            // Checks if guess is correct
            var wordCheckArray = [];

            computerWord.userGuess(input.userinput);

            // Checks if guess is correct
            computerWord.objArray.forEach(wordCheck);
            if (wordCheckArray.join("") === wordComplete.join("")) {
              console.log("\nIncorrect\n");

              incorrectLetters.push(input.userinput);
              guessesLeft--;
            } else {
              console.log("\nCorrect!\n");

              correctLetters.push(input.userinput);
            }

            computerWord.log();

            // Print guesses left
            console.log("Guesses Left: " + guessesLeft + "\n");

            // Print letters guessed already
            console.log(
              "Letters Guessed: " + incorrectLetters.join(" ") + "\n"
            );

            // Guesses left
            if (guessesLeft > 0) {
              // Call function
              logic();
            } else {
              console.log("You've lost the game!\n");

              resetGame();
            }

            function wordCheck(key) {
              wordCheckArray.push(key.guessed);
            }
          }
        }
      });
  } else {
    console.log("YOU WIN!\n");

    resetGame();
  }

  function completeCheck(key) {
    wordComplete.push(key.guessed);
  }
}

function resetGame() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to:\n",
        choices: ["Play Again?\n", "Exit\n"],
        name: "reset"
      }
    ])
    .then(function(input) {
      if (input.reset === "Play Again?") {
        requireNewWord = true;
        incorrectLetters = [];
        correctLetters = [];
        guessesLeft = 10;
        logic();
      } else {
        return;
      }
    });
}

logic();