// word.js file //
var Letter = require("./letter.js");

function Word(answer) {
    this.objectArray = [];

    for(var i =0; i < answer.length; i++) {
        var letter = new letter(answer[i]);
        this.objectArray.push(letter);
    }

    this.log = function() {
        answerLog = "";
        for(var i = 0; i < this.objectArray.length; i++) {
            answerLog += this.objectArray[i] + " ";
        }
        console.log(answerLog + "\n====================\n");
    };

    this.userGuess = function(input) {
        for (var i = 0; i < this.objectArray.length; i ++) {
            this.objectArray[i].guess(input);
        }
    };
}

module.exports = Word;