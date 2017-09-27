//create an empty object
 const playerShipSpeed = 200;
const minAstroidSpeed = 10;
const maxAstroidSpeed = 250;


var mainGameState = { }


//Add the preloader function
mainGameState.preload = function() {
    console.log("Pre-loading the Game");
    this.game.load.image("space-bg", "assets/images/space-bg.jpg"); 
    this.game.load.image("player-ship", "assets/images/player-ship.png");
    this.game.load.image("asteroid-s", "assets/images/asteroid-small-01.png");
    this.game.load.image("asteroid-xs", "assets/images/asteroid-small-02.png");
    this.game.load.image("asteroid-m", "assets/images/asteroid-medium-01.png");
    this.game.load.audio("music-bg", "assets/music/maingame.mp3");
    
}

//Add the create function
mainGameState.create = function() { 
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.add.sprite(0, 0, 'space-bg');
    console.log(game.time.totalElapsedSeconds());
    
    //position of playership
    var playerX = game.width * 0.5;    
    var playerY = game.height * 0.8;

  
    this.playerShip = game.add.sprite(playerX, playerY, 'player-ship');
    this.playerShip.anchor.setTo(0.5, 0.5);
    
    
    //support to press keys
    game.physics.arcade.enable(this.playerShip);
    this.cursors = game.input.keyboard.createCursorKeys();
   
    //game music
        this.music = game.add.audio('music-bg');
        this.music.play();
        this.music.volume = 0.1;
        this.music.loop = true;
    
    //timer
    this.asteroidTimer = 2.0;
    
    //enemy group
    this.asteroids = game.add.group();
   
}

//Add the update function
mainGameState.update = function() { 
    mainGameState.updatePlayer(); 
    
     this.asteroidTimer -= game.time.physicsElapsed;
    
    if (this.asteroidTimer <= 0.0) {
        console.log("spawn asteroids");
        this.spawnAsteroid();
        this.asteroidTimer = 2.0;
        }
    console.log(game.time.physicsElapsed);
}

mainGameState.updatePlayer = function() {
    
     //move player
    if (this.cursors.right.isDown) {
    console.log("RIGHT PRESSED");
    this.playerShip.body.velocity.x = playerShipSpeed;
    } else if (this.cursors.left.isDown) {
          console.log("left pressed");
          this.playerShip.body.velocity.x = -playerShipSpeed;
    } else {
          console.log("no pressed");
           this.playerShip.body.velocity.x = 0;
    }

    //  confine player to the screen
    if (this.playerShip.position.x < (0 + (this.playerShip.width/2)) && this.cursors.left.isDown) {
    this.playerShip.body.velocity.x = 0;
    }

    if (this.playerShip.position.x > (game.width - (this.playerShip.width/2)) && this.cursors.right.isDown) {
        this.playerShip.body.velocity.x = 0;
    }
    
    //clean up astroids
   for (var i = 0; i < this.asteroids.children.length; i++) {
       if (this.asteroids.children[i].y > (game.height + 200)) {
           this.asteroids.children[i].destroy();
           }
        
   }
   
}

mainGameState.spawnAsteroid = function() {
    var x = game.rnd.integerInRange(0, game.width);
    var asteroidVelocity = game.rnd.integerInRange(minAstroidSpeed, maxAstroidSpeed); 
    var asteroidGroup = ['asteroid-s', 'asteroid-xs', 'asteroid-m'];
    var randomAsteroid = Math.floor(Math.random(asteroidGroup) * 3);
    var asteroid = game.add.sprite(x, 0, asteroidGroup[randomAsteroid]);
    asteroid.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(asteroid);
    
    asteroid.body.velocity.setTo(0, asteroidVelocity);
    
    this.asteroids.add(asteroid);
    
} 
 
