var startGameState = { }

startGameState.preload = function() {
    this.game.load.image("space-bg", "assets/images/sky-background.jpg"); 
    this.game.load.image("player-ship", "assets/images/player-bird.png");
    this.game.load.image("move", "assets/images/move.png");
    this.game.load.image("shoot", "assets/images/z.png");
    this.game.load.image("enemy1", "assets/images/leaf.png");
    this.game.load.image("enemy2", "assets/images/rain_02.png");
    this.game.load.audio("music-bg", "assets/music/maingame.mp3");
      
}

startGameState.create = function() {
    game.add.sprite(0, 0, 'space-bg');

    var textStyle = {font: "25px Arial", fill: "#da2c26", align: "center"}
    var textStyleSmall = {font: "15px Arial", fill: "#fff", align: "center"}
    var textStyleSmallColor = {font: "18px Arial", fill: "#cb57b8", align: "center"}

    var title = game.add.text(game.width * 0.5, game.height * 0.2, "SUMMER BIRD", textStyle);
    title.anchor.setTo(0.5, 0.5);
    
    var description1 = game.add.text(game.width * 0.25, game.height * 0.25, "Help the little summer bird", textStyleSmallColor);
    title.anchor.setTo(0.5, 0.5);
    
    var description2 = game.add.text(game.width * 0.19, game.height * 0.28, "prevent the autumn from coming", textStyleSmallColor);
    title.anchor.setTo(0.5, 0.5);
    
    var description3 = game.add.text(game.width * 0.32, game.height * 0.6, "Press SPACE to play", textStyleSmall);
    title.anchor.setTo(0.5, 0.5);
    
    var description4 = game.add.text(game.width * 0.13, game.height * 0.8, "Move bird", textStyleSmall);
    title.anchor.setTo(0.5, 0.5);
    
    var description5 = game.add.text(game.width * 0.45, game.height * 0.8, "Shoot", textStyleSmall);
    title.anchor.setTo(0.5, 0.5);
    
    var description6 = game.add.text(game.width * 0.8, game.height * 0.8, "Autumn", textStyleSmall);
    title.anchor.setTo(0.5, 0.5);
    
    
    var playerX = game.width * 0.5;    
    var playerY = game.height * 0.45;

    this.playerShip = game.add.sprite(playerX, playerY, 'player-ship');
    this.playerShip.anchor.setTo(0.5, 0.5);
    
    
    var moveX = game.width * 0.2;    
    var moveY = game.height * 0.9;
    this.move = game.add.sprite(moveX, moveY, 'move');
    this.move.anchor.setTo(0.5, 0.5);
    
    var shootX = game.width * 0.5;    
    var shootY = game.height * 0.9;
    this.shoot = game.add.sprite(shootX, shootY, 'shoot');
    this.shoot.anchor.setTo(0.5, 0.5);
    
    var enemy1X = game.width * 0.8;    
    var enemy1Y = game.height * 0.9;
    this.enemy1 = game.add.sprite(enemy1X, enemy1Y, 'enemy1');
    this.enemy1.anchor.setTo(0.5, 0.5);
    
    var enemy2X = game.width * 0.9;    
    var enemy2Y = game.height * 0.9;
    this.enemy2 = game.add.sprite(enemy2X, enemy2Y, 'enemy2');
    this.enemy2.anchor.setTo(0.5, 0.5);
    
    
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
        //game music
        this.music = game.add.audio('music-bg');
        this.music.play();
        this.music.volume = 0.4;
        this.music.loop = true;
    

    
}

startGameState.update = function() {
    
   if (this.spaceKey.isDown) {
        game.state.start("MainGame");
    }
}