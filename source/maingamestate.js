//create an empty object
 const playerShipSpeed = 200;
const minAstroidSpeed = 10;
const maxAstroidSpeed = 250;
const fireSpeed = -150;


var mainGameState = { }


//Add the preloader function
mainGameState.preload = function() {
    console.log("Pre-loading the Game");
    this.game.load.image("space-bg", "assets/images/space-bg.jpg"); 
    this.game.load.image("player-ship", "assets/images/player-ship.png");
    this.game.load.image("asteroid-s", "assets/images/asteroid-small-01.png");
    this.game.load.image("asteroid-xs", "assets/images/asteroid-small-02.png");
    this.game.load.image("asteroid-m", "assets/images/asteroid-medium-01.png");
      this.game.load.image("fire", "assets/images/bullet-fire.png");
    this.game.load.audio("music-bg", "assets/music/maingame.mp3");
    
}

//Add the create function
mainGameState.create = function() { 
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.add.sprite(0, 0, 'space-bg');
    
    //position of playership
    var playerX = game.width * 0.5;    
    var playerY = game.height * 0.9;

  
    this.playerShip = game.add.sprite(playerX, playerY, 'player-ship');
    this.playerShip.anchor.setTo(0.5, 0.5);
    
    
  
    game.physics.arcade.enable(this.playerShip);
      //support to press keys
    this.cursors = game.input.keyboard.createCursorKeys();
    this.fireKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
   
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
        this.spawnAsteroid();
        this.asteroidTimer = 2.0;
        }
}

mainGameState.updatePlayer = function() {
    
     //move player
    if (this.cursors.right.isDown) {
    this.playerShip.body.velocity.x = playerShipSpeed;
    } else if (this.cursors.left.isDown) {
          this.playerShip.body.velocity.x = -playerShipSpeed;
    } else {
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
    
   
    //fire
    if (this.fireKey.isDown) {
        console.log("fire PRESSED");
        this.spawnPlayerBullet();
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

mainGameState.spawnPlayerBullet = function() {
    //position of fire
    var fire = game.add.sprite(this.playerShip.position.x, (this.playerShip.position.y - 50), "fire");
    fire.anchor.setTo(0.5, 0.5);

    game.physics.arcade.enable(fire);
    fire.body.velocity.setTo(0, fireSpeed);
    
} 
