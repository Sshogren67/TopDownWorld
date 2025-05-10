class GameWon extends Phaser.Scene {
    constructor() {
        super("GameWon");


        this.my = {sprite: {}};   
    
    }

    preload() {

    }

    create() {
        let my = this.my;
        
        this.gameOverText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Game Won! Conratulations! Press R to restart.', {
            fontSize: '32px',
            fill: '#fff'
        });
        this.gameOverText.setOrigin(0.5, 0.5);
    
        this.input.keyboard.on('keydown-R', this.restartGame, this);

    }

    restartGame() {
        this.scene.start("shooterScene");
    }

    update() {
        let my = this.my


    }
}