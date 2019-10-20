// index.js file //
var word = require("./word.js");
var inquirer = require("inquirer");

var letterArray = "abcdefghijklmnopqrstuvwxyz";

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
    "suns"
];

var randomIndex = Math.floor(Math.random() * nbaTeams.length);
var randomTeam = nbaTeams[randomIndex];

var cpuWord = new word(randomTeam);

var requireNewWord = false;

var incorrectLetters = [];
var correctLetters = [],

var guessesLeft = 10;

function logic() {
    if (requireNewWord) {
        var randomIndex = Math.floor(Math.random() * nbaTeams.length);
    var randomTeam = nbaTeams[randomIndex];

    var cpuWord = new word(randomTeam);

    requireNewWord = false;
    }

    var wordComplete = [];
    cpuWord.objectArray.forEach(completeCheck);

    if (wordComplete.includes(false)) {
        inquirer.prompt([
            {
                type: "input",
                message: "Select letter from A to Z",
                name: "userinput"
            }
        ]).then(function(input){
            if (!letterArray.includes(input.userinput) || input.userinput.length > 1) {
                console.log("\nPlease try again.\n");
                logic();
            }
            else {
                if (incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === "") {
                    console.log("\nAlready guessed.\n");
                    logic();
                }
                else {
                    var wordCheckArray = [];

                    cpuWord.userGuess(input.userinput);

                    cpuWord.objectArray.forEach(wordCheck);

                    if(wordCheckArray.join("") === wordComplete.join("")) {
                        console.log("\nIncorrect.\n");

                        incorrectLetters.push(input.userinput);
                        guessesLeft--;
                    }
                    else {
                        console.log("\nIncorrect.\n");

                        correctLetters.push(input.userinput);
                    }

                    cpuWord.log();

                    console.log("Guesses Left: " + guessesLeft + "\n");

                    console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");

                    if(guessesLeft > 0) {
                        logic();
                    }
                    else {
                        console.log("You have lost!\n");
                        resetGame();
                    }

                    function wordCheck(key) {
                        wordCheckArray.push(key.guessed);
                    }
                }
            }

        });
    }
    else{
        console.log("YOU WIN!\n");

        resetGame();
    }

    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }
}
function resetGame () {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to:",
            choices: ["Play again?", "Exit"],
            name: "reset"
        }
    ])
    .then(function(input){
        if (input.reset === "Play again?") {
            requireNewWord = true;
            incorrectLetters = [];
            correctLetters = [];
            guessesLeft = 10;
            logic ();
        }
        else {
            return;
        }
    });
}

logic();