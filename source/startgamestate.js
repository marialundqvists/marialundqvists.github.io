var startGameState = { }

startGameState.preload = function() {
    this.game.load.image("space-bg", "assets/images/sky-background.png"); 
}

startGameState.create = function() {
    game.add.sprite(0, 0, 'space-bg');


    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
}

startGameState.update = function() {
    
   if (this.spaceKey.isDown) {
        game.state.start("MainGame");
    }
}