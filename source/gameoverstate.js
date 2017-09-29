var gameOverState = { }

gameOverState.preload = function() {
    this.game.load.image("space-bg-game-over", "assets/images/sky-background-game-over.jpg"); 
    this.game.load.image("player-ship-dead", "assets/images/player-bird-dead.png");
}

gameOverState.create = function() {
    
   game.add.sprite(0, 0, 'space-bg-game-over');
    
    var textStyle = {font: "25px Arial", fill: "#000", align: "center"}
    var textStyleSmall = {font: "15px Arial", fill: "#000", align: "center"}

    var title = game.add.text(game.width * 0.5, game.height * 0.2, "GAME OVER", textStyle);
    title.anchor.setTo(0.5, 0.5);
    
    

    var scoreTitle = game.add.text(game.width * 0.5, game.height * 0.6, "SCORE", textStyle);
    scoreTitle.anchor.setTo(0.5, 0.5);

    var scoreValue = game.add.text(game.width * 0.5, game.height * 0.7, playerScore, textStyle);
    scoreValue.anchor.setTo(0.5, 0.5);
    
     var description = game.add.text(game.width * 0.15, game.height * 0.85, "Press SPACE to play and beat your score.",textStyleSmall);
    scoreTitle.anchor.setTo(0.5, 0.5);
    
      var description2 = game.add.text(game.width * 0.20, game.height * 0.90, "Press ENTER for game instructions.",textStyleSmall);
        scoreTitle.anchor.setTo(0.5, 0.5);
    

    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
     this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    

     //position of playership
    var playerX = game.width * 0.5;    
    var playerY = game.height * 0.38;

  
      

    this.playerShip = game.add.sprite(playerX, playerY, 'player-ship-dead');

    
    this.playerShip.anchor.setTo(0.5, 0.5);
    
}

gameOverState.update = function() {
    
   if (this.spaceKey.isDown) {
        game.state.start("MainGame");
    }
    
    if (this.enterKey.isDown) {
        game.state.start("StartGame");
    }
}