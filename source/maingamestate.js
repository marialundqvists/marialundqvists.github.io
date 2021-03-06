//create an empty object
const playerShipSpeed = 200;
const minAstroidSpeed = 50;
const maxAstroidSpeed = 250;
const fireSpeed = -150;

var playerScore = 0;

var mainGameState = { }


//Add the preloader function
mainGameState.preload = function() {
    this.game.load.image("space-bg", "assets/images/sky-background.jpg"); 
    this.game.load.image("player-ship", "assets/images/player-bird.png");
     this.game.load.image("player-ship-dead", "assets/images/player-bird-dead.png");
    this.game.load.image("asteroid-s", "assets/images/rain_01.png");
    this.game.load.image("asteroid-xs", "assets/images/rain_02.png");
    this.game.load.image("asteroid-m", "assets/images/leaf.png");
    this.game.load.image("fire", "assets/images/flower-fire.png");
    this.game.load.audio("player-fire-01", "assets/audio/player_fire_01.mp3");
    this.game.load.audio("player-fire-02", "assets/audio/player_fire_02.mp3");
    this.game.load.audio("player-fire-03", "assets/audio/player_fire_03.mp3");
    this.game.load.audio("asteroid-hit-01", "assets/audio/asteroid_hit_01.mp3");
    this.game.load.audio("asteroid-hit-02", "assets/audio/asteroid_hit_02.mp3");
    this.game.load.audio("asteroid-hit-03", "assets/audio/asteroid_hit_03.mp3");
    this.game.load.audio("asteroid-death-01", "assets/audio/asteroid_death_01.mp3");
    this.game.load.audio("asteroid-death-02", "assets/audio/asteroid_death_02.mp3");
    this.game.load.audio("asteroid-death-03", "assets/audio/asteroid_death_03.mp3");
    
}

//Add the create function
mainGameState.create = function() { 
    game.physics.startSystem(Phaser.Physics.ARCADE);
   
  //  game.add.sprite(0, 0, 'space-bg');
     // Create a tilesprite (x, y, width, height, key)
    tileSprite = game.add.tileSprite(0, 0, 800, 600, 'space-bg');
  
    
    //position of playership
    var playerX = game.width * 0.5;    
    var playerY = game.height * 0.9;

    this.playerShip = game.add.sprite(playerX, playerY, 'player-ship');

    this.playerShip.anchor.setTo(0.5, 0.5);
  
    game.physics.arcade.enable(this.playerShip);
    this.playerShip.body.immovable = true;
      //support to press keys
    this.cursors = game.input.keyboard.createCursorKeys();
    this.fireKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
   

    
    //timer asteroids
    this.asteroidTimer = 2.0;
    
    this.timePerAsteroid = 1.0;
    
    this.dificultTimer = 10.0;
    
    //timer fire
   
    this.fireTimer = 0.4;
    
    //invornability time
    this.dieTime = 0.0;
    
    //enemy group
    this.asteroids = game.add.group();
    
    //fire group
    this.playerFire = game.add.group();
    
    //sound effect
    this.playerFireSfx = [];
    this.playerFireSfx.push(game.add.audio('player-fire-01'));
    this.playerFireSfx.push(game.add.audio('player-fire-02'));
    this.playerFireSfx.push(game.add.audio('player-fire-03'));
    
    for (var i = 0; i < 3 ; i++) {
        this.playerFireSfx[i].volume = 0.1
    }
    
    this.asteroidHitSfx = [];
    this.asteroidHitSfx.push(game.add.audio('asteroid-hit-01'));
    this.asteroidHitSfx.push(game.add.audio('asteroid-hit-02'));
    this.asteroidHitSfx.push(game.add.audio('asteroid-hit-03'));
    
    for (var i = 0; i < 3 ; i++) {
        this.asteroidHitSfx[i].volume = 0.1
    }
  
    this.asteroidDeathSfx = [];
    this.asteroidDeathSfx.push(game.add.audio('asteroid-death-01'));
    this.asteroidDeathSfx.push(game.add.audio('asteroid-death-02'));
    this.asteroidDeathSfx.push(game.add.audio('asteroid-death-03'));
    this.asteroidDeathSfx.volume = 0.1;
    
    for (var i = 0; i < 3 ; i++) {
        this.asteroidDeathSfx[i].volume = 0.01
    }
    
    playerScore = 0;
    this.playerLives = 3;
    
    //score text
    var textStyle = {font: "16px Arial", fill: "#ffffff", align: "center"}

    this.scoreTitle = game.add.text(game.width * 0.85, 40, "SCORE", textStyle);
    this.scoreTitle.fixedToCamera = true;
    this.scoreTitle.anchor.setTo(0.5, 0.5);

    this.scoreValue = game.add.text(game.width * 0.85, 21, "0", textStyle);
    this.scoreValue.fixedToCamera = true;
    this.scoreValue.anchor.setTo(0.5, 0.5);
    
    //live text
  
    this.liveTitle = game.add.text(game.width * 0.14, 40, "LIVES", textStyle);
    this.liveTitle.fixedToCamera = true;
    this.liveTitle.anchor.setTo(0.5, 0.5);

    this.liveValue = game.add.text(game.width * 0.14, 21, "5", textStyle);
    this.liveValue.fixedToCamera = true;
    this.liveValue.anchor.setTo(0.5, 0.5);

  
}

//Add the update function
mainGameState.update = function() { 
    mainGameState.updatePlayer(); 
     mainGameState.updatePlayerBullets();
    
    
    if (this.asteroidTimer <= 0) {
        this.spawnAsteroid();
        this.asteroidTimer = this.timePerAsteroid;
    }
    
     this.asteroidTimer -= game.time.physicsElapsed;
    
    if (this.dificultTimer <= 0) {
        this.spawnAsteroid();
        this.dificultTimer = this.timePerAsteroid;
    }
    
     this.dificultTimer -= game.time.physicsElapsed;
    
    game.physics.arcade.collide(this.asteroids, this.playerFire, mainGameState.onAsteroidBulletCollide, null, this);
    game.physics.arcade.collide(this.asteroids, this.playerShip, mainGameState.onAsteroidPlayerCollide, null, this);   
    
    
    this.scoreValue.setText(playerScore);
    this.liveValue.setText(this.playerLives);
    
    if (this.dieTime > 0) {
        this.playerShip.alpha = 0.5;
        this.dieTime -= game.time.elapsed;
        
        if ( this.dieTime < 0 ) {
            this.playerShip.alpha = 1.0;
        }
    }
 
      
    if (this.playerLives <= 0) {
        game.state.start("GameOver");
    }
    
    
        // Move tilesprite position by pressing arrow keys
    if (this.cursors.left.isDown)
    {
        tileSprite.tilePosition.x += 0;
    }
    else if (this.cursors.right.isDown)
    {
        tileSprite.tilePosition.x -= 0;
    }

    if (this.cursors.up.isDown)
    {
        tileSprite.tilePosition.y += 8;
    }
    else if (this.cursors.down.isDown)
    {
        tileSprite.tilePosition.y -= 0;
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
    if ( this.fireTimer < 0 ) {
        this.fireTimer = 0.4;
            //position of fire
    var fire = game.add.sprite(this.playerShip.position.x, (this.playerShip.position.y - 60), "fire");
    fire.anchor.setTo(0.5, 0.5);

    game.physics.arcade.enable(fire);
    fire.body.velocity.setTo(0, fireSpeed);
    
   this.playerFire.add(fire);
        
    var index = game.rnd.integerInRange(0, this.playerFireSfx.length - 1);
     this.playerFireSfx[index].play();
    }

} 

mainGameState.updatePlayerBullets = function() {
              //shoot fire
    if (this.fireKey.isDown) {
        console.log("fire PRESSED");
        this.spawnPlayerBullet();
    }
    
     this.fireTimer -= game.time.physicsElapsed;
    
   //clean up firebullets
   for (var i = 0; i < this.playerFire.children.length; i++) {
       if (this.playerFire.children[i].y < -200) {
           this.playerFire.children[i].destroy();
           }
        
   }  
}

mainGameState.onAsteroidBulletCollide = function(object1, object2) {
        object1.pendingDestroy = true;
        object2.pendingDestroy = true;
       
        var index = game.rnd.integerInRange(0, this.asteroidHitSfx.length - 1);
        this.asteroidHitSfx[index].play();
    
       playerScore += 1; 
}

mainGameState.onAsteroidPlayerCollide = function(object1, object2) {
    if (object1.key.includes("asteroid") ) {
        object1.pendingDestroy = true;
    } else {
        object2.pendingDestroy = true;
    }
        
       
    var index = game.rnd.integerInRange(0, this.asteroidDeathSfx.length - 1);
   this.asteroidDeathSfx[index].play();
    
    this.playerLives -= 1; 
    
    if (this.dieTime > 0) {
        
        return;
    }
    this.dieTime = 3.0;
}