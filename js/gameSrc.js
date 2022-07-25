let hint = false;
let mistakes = 0;

function Game() {
    this.lives = 6;
    this.word = createWord().toLowerCase();
    this.score = 0;
    this.hint = false;
    this.lettersLeft = this.word.length;
    this.wordArray = this.word.split('');

    this.updateStats = function () {
        document.getElementById('scoreValue').innerHTML = this.score;
        document.getElementById('livesValue').innerHTML = this.lives;
        document.getElementById('hangmanPic').src = '../images/' + mistakes + '.jpg'
    };

    this.updateStats();

    this.correctLetterChosen = function (letter) {
        for (let i = 0; i < this.wordArray.length; i++) {
            if (this.wordArray[i] === letter) {
                this.lettersLeft--;
                this.score++;
            }
        }

        this.updateStats();

        if (this.lettersLeft === 0) {
            endGame(true, 'specialMessage');
        }
    };

    this.incorrectLetterChosen = function () {
        if (this.score > 0) {
            this.score--;
        }

        this.lives--;
        mistakes++;
        updateHangmanPicture()
        if (this.lives === 0) {
            endGame(false, 'specialMessage');
        }
        this.updateStats();
    };

    this.underscore_list = makeUnderscores(this.word);

    this.alterUnderscoreList = function (underscore_list, word, label) {
        let underscoreArray = underscore_list;
        for (let i = 0; i < underscore_list.length; i++) {
            if (word[i] === (label.toLowerCase())) {
                underscoreArray[i] = label
            }
        }

        let new_message = "";

        for (let i = 0; i < underscore_list.length; i++) {
            new_message = new_message.concat(underscoreArray[i]);
        }

        document.getElementById("displayedWord").innerHTML = new_message;
    };

    this.toggleHintVisibility = function () {
        if (hint === false) {
            document.getElementById("definition").style.visibility = "visible";
            hintButton.innerHTML = "Hide Hint";
            hint = true;
        } else {
            document.getElementById("definition").style.visibility = "hidden";
            hintButton.innerHTML = "Display Hint";
            hint = false;
        }
    }
}

function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = '../images/' + mistakes + '.jpg';
}

function makeUnderscores(word) {
    let underscore_list = [];
    for (let i = 0; i < word.length; i++) {
        underscore_list.push("_ ");
    }

    let underscores = "";
    for (let i = 0; i < underscore_list.length; i++) {
        underscores = underscores.concat(underscore_list[i]);
    }

    document.getElementById("displayedWord").innerHTML = underscores;
    return underscore_list;
}

function Button(label, word, underscore_list) {
    this.btn = document.createElement("BUTTON");
    this.btn.innerHTML = label;
    this.underscore_list = underscore_list;

    this.btn.onclick = function () {
        if (word.includes(label.toLowerCase())) {
            this.className = "correctGuessButton";
            game.correctLetterChosen(label.toLowerCase());
            game.alterUnderscoreList(underscore_list, word, label);
        } else {
            this.className = "wrongGuessButton";
            game.incorrectLetterChosen();
        }
    }
}

let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let letterButtons = [];

function generateButtons(word) {

    for (let i = 0; i < letters.length; i++) {
        let currentLetter = letters[i];
        let b = new Button(currentLetter, word, game.underscore_list);

        letterButtons.push(b.btn);
        document.getElementById('letterButtonContainer').appendChild(b.btn);
    }
}

function Word(name, definition) {
    this.name = name;
    this.definition = definition;
}

let wordList = [
    new Word("google", "When your stuck with an error in programming"),
    new Word("integer", "A data type in programming languages"),
    new Word("binary", "Numbers expressed in the base of two, using 0 and 1 only"),
    new Word("teamwork", "Working together cooperatively"),
    new Word("perseverance", "Sticking at it, hanging in there; important for programming"),
    new Word("template", "Something that establishes or serves as a pattern"),
    new Word("flowchart", "A diagram of an algorithm with arrows")
];

function createWord() {
    let randomNumber = Math.floor(Math.random() * wordList.length);
    let wordObject = wordList[randomNumber];

    document.getElementById('definition').innerHTML = wordObject.definition;


    return wordObject.name.toUpperCase();
}

function endGame(didUserWin, element_id) {
    if (didUserWin) {
        document.getElementById(element_id).innerHTML = 'Congratulations! You have won!<br><br> Press "Play Again" to restart';
    } else {
        document.getElementById(element_id).innerHTML = `You've lost! The word was "${game.word}"`;
    }

    for (let i = 0; i < letterButtons.length; i++) {
        letterButtons[i].disabled = true;
    }
}
