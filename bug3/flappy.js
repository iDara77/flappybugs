
var actions = { preload: preload, create: create, update: update };

var game = new Phaser.Game(790, 400, Phaser.AUTO, "game", actions);

var score = 0;

var labelScore;

var player;

var pipes = [];

var pipeInterval = 1.75;


function preload() {
    
    game.load.image("playerImg","../assets/jamesBond.gif");
    
    game.load.audio("score", "../assets/point.ogg");
    
    game.load.image("pipe","../assets/pipe.png");
}


function create() {
    
    game.stage.setBackgroundColor("#F3D3A3");
    
    game.add.text(20, 20, "Welcome to my game",
        {font: "30px Arial", fill: "#FFFFFF"});
    
    labelScore = game.add.text(20, 60, "0",
        {font: "30px Arial", fill: "#FFFFFF"});
    
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.enable(player);

    player = game.add.sprite(80, 200, "playerImg");
    
    player.body.gravity.y = 200;
    
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);
    
    game.time.events.loop(pipeInterval * Phaser.Timer.SECOND, generatePipe);
}


function update() {
    

    game.physics.arcade
        .overlap(player,
            pipes,
            gameOver);     

}


function addPipeBlock(x, y) {
    
    var block = game.add.sprite(x,y,"pipe");
    
    pipes.push(block);
    
    game.physics.arcade.enable(block);
    
    
    block.body.velocity.x = -200;
}


function generatePipe() {

    var gapStart = game.rnd.integerInRange(1, 5);

    for (var count = 0; count < 8; count++) {

        if(count != gapstart && count != gapstart+1){
            addPipeBlock(750, count * 50);
        }
    }
    
    changescore();
}

function playerJump() {
    
    player.body.velocity.y = -200;
}


function changeScore() {
    
    score++;
    
    labelScore.setText(score.toString());
}

function gameOver() {
    
    game.destroy();
}
