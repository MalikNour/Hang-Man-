game = new Game();
generateButtons(game.word);

document.getElementById("resetBtn").onclick = resetGame;
document.getElementById("hintButton").onclick = game.toggleHintVisibility;

function resetGame() {
    mistakes = 0;
    game = new Game();
    document.getElementById('letterButtonContainer').innerHTML = '';
    document.getElementById("specialMessage").innerHTML = "";
    document.getElementById('hangmanPic').src = '../images/0.jpg';
    generateButtons(game.word);
    makeUnderscores(game.word)

    if (hint === true) {
        game.toggleHintVisibility();
    }
}

let hangmanPic = document.getElementById('hangmanPic');
document.getElementById('myButton').onclick = function (){
    hangmanPic.classList.toggle('fade');
}
