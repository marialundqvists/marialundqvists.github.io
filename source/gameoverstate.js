var gameOverState = { }

gameOverState.preload = function() {
    
}

gameOverState.create = function() {
    var textStyle = {font: "14px Arial", fill: "#ccddff", align: "center"}

    var title = game.add.text(game.width * 0.5, game.height * 0.2, "GAME OVER");
    title.anchor.setTo(0.5, 0.5);

    var scoreTitle = game.add.text(game.width * 0.5, game.height * 0.6, "Your Score");
    scoreTitle.anchor.setTo(0.5, 0.5);

    var scoreValue = game.add.text(game.width * 0.5, game.height * 0.8, score);
    scoreValue.anchor.setTo(0.5, 0.5);

    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACE);
}

gameOverState.update = function() {
     if (this.spaceKey.isDown) {
        game.state.start("MainGame");
    }
}