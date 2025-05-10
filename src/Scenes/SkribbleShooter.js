class SkribbleShooter extends Phaser.Scene {
    constructor() {
        super("shooterScene");


        this.my = {sprite: {}};

        this.aKey = null;
        this.dKey = null;
 


        this.startX = game.config.width / 2;
        this.startY = 600;

        this.enemyX = 300;
        this.enemyY = 100;
        this.helmetY = this.enemyY - 25;
        this.shieldX = this.enemyX +100;
        this.shieldY = this.enemyY +100;

        this.heartX = game.config.width - 60;
        this.heartY = 30;

        this.bulletActive = false;

        this.playerScore = 0;
    }

    preload() {
        this.load.setPath("./assets/");

        // Player Assets
        this.load.image("playerBase", "kenney_scribble-platformer/PNG/Default/tile_crate.png");
        this.load.image("playerLadder", "kenney_scribble-platformer/PNG/Default/tile_ladder.png");
        this.load.image("playerSpear", "kenney_scribble-platformer/PNG/Default/item_spear.png");

        //Shield Enemy Assets
        this.load.image("shieldEnemyRed", "kenney_scribble-platformer/PNG/Default/character_squareRed.png");
        this.load.image("Shield", "kenney_scribble-platformer/PNG/Default/item_.png");
        this.load.image("Helmet", "kenney_scribble-platformer/PNG/Default/item_helmet.png");

        //Bow Enemy Assets
        this.load.image("OvalYellow", "kenney_scribble-platformer/PNG/Default/character_roundYellow.png");
        this.load.image("Bow", "kenney_scribble-platformer/PNG/Default/item_bow.png");
        this.load.image("YellowHand", "kenney_scribble-platformer/PNG/Default/character_handYellow.png");
        this.load.image("Arrow", "kenney_scribble-platformer/PNG/Default/item_arrow.png");

        //Map
        this.load.image("Skribble-Tiles", "kenney_scribble-platformer/Spritesheet/spritesheet_default.png");
        this.load.tilemapTiledJSON("map", "Castle1-map.json");

        //Lives and Score
        this.load.image("Heart", "kenney_scribble-platformer/PNG/Default/tile_heart.png");
        this.load.image("1", "kenney_scribble-platformer/PNG/Default/ui_num1.png");
        this.load.image("2", "kenney_scribble-platformer/PNG/Default/ui_num2.png");
        this.load.image("3", "kenney_scribble-platformer/PNG/Default/ui_num3.png");
        this.load.image("4", "kenney_scribble-platformer/PNG/Default/ui_num4.png");
        this.load.image("5", "kenney_scribble-platformer/PNG/Default/ui_num5.png");
        this.load.image("6", "kenney_scribble-platformer/PNG/Default/ui_num6.png");
        this.load.image("7", "kenney_scribble-platformer/PNG/Default/ui_num7.png");
        this.load.image("8", "kenney_scribble-platformer/PNG/Default/ui_num8.png");
        this.load.image("9", "kenney_scribble-platformer/PNG/Default/ui_num9.png");
        this.load.image("0", "kenney_scribble-platformer/PNG/Default/ui_num0.png");
        this.load.image("X", "kenney_scribble-platformer/PNG/Default/ui_numX.png");

        //Audio
        this.load.audio("playerHit", "Audio/impactWood_heavy_003.ogg");
        this.load.audio("shieldHit", "Audio/impactBell_heavy_003.ogg");
        this.load.audio("bowHit", "Audio/impactPunch_medium_000.ogg");
        this.load.audio("gameLost", "jingles_NES13.ogg");
        this.load.audio("gameWon", "jingles_PIZZI11.ogg");

    }

    create() {
        let my = this.my


        //Map
        this.map = this.add.tilemap("map", 64, 64, 10, 15);
        this.tileset = this.map.addTilesetImage("Skribble-Platformer", "Skribble-Tiles");

        this.groundLayer = this.map.createLayer("Ground-n-Sky", this.tileset, 0, 0);
        this.castleLayer = this.map.createLayer("Castle-n-Clouds", this.tileset, 0, 0);
        this.addLayer = this.map.createLayer("Additional-Details", this.tileset, 0, 0);



        //Player Sprite
        this.my.sprite.Base = this.add.sprite(this.startX,this.startY, "playerBase");
        this.my.sprite.Ladder = this.add.sprite(this.startX,this.startY, "playerLadder");
        this.my.sprite.playerSpear = this.add.sprite(this.startX,this.startY, "playerSpear");
        // this.my.sprite.Spear = this.add.sprite(this.my.sprite.Base.x, this.my.sprite.Base.y, "playerSpear");
        // this.my.sprite.Spear.visible = false;

        this.waveOne();


        this.playerSpeed = 8;
        this.bulletSpeed = 15;
        this.arrowSpeed = 400;

        this.arrows = this.physics.add.group();



        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        // this.my.text.score = this.add.bitmapText(580, 0, "rocketSquare", "Score " + this.playerScore);


        //Adding the enemy pathing
        this.ShieldPointsLeft = [
            60, 2,
            53, 62,
            60, 119,
            80, 158,
            125, 169,
            180, 170,
            237, 165,
            300, 163,
            357, 166,
            400, 185,
            424, 225,
            423, 283,
            372, 288,
            287, 284,
            217, 281,
            152, 286,
            108, 293,
            80, 320,
            77, 371,
            96, 413,
            140, 413,
            203, 409,
            248, 407,
            308, 405,
            363, 405,
            409, 400,
            444, 429,
            437, 473,
            407, 506,
            366, 511,
            297, 508,
            255, 513,
            196, 509,
            151, 509,
            108, 512,
            69, 529,
            83, 578,
            116, 623,
            164, 626,
            214, 622,
            276, 621,
            342, 619,
            393, 619,
            423, 623,
            459, 654,
            466, 714,
            450, 756,
            417, 768,
            372, 764,
            312, 759,
            242, 757,
            196, 761,
            148, 764,
            126, 764,
            81, 756
        ];
        
        
        this.ShieldPointsRight = [
            928,0,
            928,34,
            926,66,
            925,105,
            920,125,
            880,137,
            819,145,
            754,144,
            704,145,
            658,149,
            612,158,
            572,173,
            554,207,
            560,252,
            594,277,
            644,282,
            702,280,
            762,283,
            816,279,
            877,280,
            930,286,
            946,330,
            942,389,
            933,431,
            873,434,
            805,438,
            733,438,
            681,437,
            627,437,
            572,436,
            540,462,
            528,540,
            542,585,
            608,593,
            692,581,
            753,587,
            820,581,
            888,580,
            926,584,
            952,607,
            957,685,
            944,714,
            906,733,
            862,742,
            820,742,
            769,737,
            720,736,
            676,736,
            624,732,
            577,730,
            544,757,
            544,776,
            544,795
        ];
        
        
        this.BowPathLeft = [
            4,227,
            50,228,
            97,226,
            143,226,
            186,225,
            228,225,
            292,226,
            353,221,
            401,221,
            470,217,
            500,221,
            507,251,
            504,285,
            504,332,
            502,367,
            456,375,
            396,377,
            341,374,
            268,372,
            207,378,
            133,381,
            90,381,
            43,381,
            0,377
        ];
        
        this.BowPathRight = [
            997,206,
            934,208,
            868,205,
            814,206,
            750,207,
            684,207,
            638,207,
            588,206,
            580,257,
            576,304,
            576,341,
            580,369,
            642,364,
            701,366,
            760,366,
            798,369,
            848,363,
            901,362,
            950,364,
            996,365
        ];

        this.sPathLeft = new Phaser.Curves.Spline(this.ShieldPointsLeft);
        this.sPathRight = new Phaser.Curves.Spline(this.ShieldPointsRight);
        this.bPathLeft = new Phaser.Curves.Spline(this.BowPathLeft);
        this.bPathRight = new Phaser.Curves.Spline(this.BowPathRight);

        this.shieldPathProgress = 0;
        this.bowPathProgress = 0;


        this.waveFinished = true;
        this.currentWave = 0;
        this.shieldEnemies = [];
        this.bowEnemies = [];

        this.timesShieldHit = 0;
        this.timesBowHit = 0;
        this.justBowHit = false;
        this.justHit = false;

        this.playerInvincible = false;


        //Lives
        this.playerLives = 3;
        this.heartIcons = [];
        this.updateHearts();

        //UI Score
        this.scoreSprites = [];
        this.updateScoreSprites();

        this.counter = 0;
    }

    waveOne() {
        let my = this.my

        if (my.shieldenemyRed1) {
            my.shieldenemyRed1.destroy();
            my.shieldenemyRed1 = null;
        }
        if (my.shieldenemyRed2) {
            my.shieldenemyRed2.destroy();
            my.shieldenemyRed2 = null;
        }
        if (my.bowenemyYellow1) {
            my.bowenemyYellow1.destroy();
            my.bowenemyYellow1 = null;
        }
        if (my.bowenemyYellow2) {
            my.bowenemyYellow2.destroy();
            my.bowenemyYellow2 = null;
        }

        this.enemiesRemaining = 4;

        //Shield Enemy 1
        this.my.sprite.SquareRed1 = this.add.sprite(0, 0, "shieldEnemyRed");
        this.my.shieldenemyRed1 = this.add.container(this.enemyX, this.enemyY, [this.my.sprite.SquareRed1])
        let Helmet1 = this.add.sprite(0,-25, "Helmet");
        this.my.sprite.Helmet1 = Helmet1;
        let Shield1 = this.add.sprite(+15,+10, "Shield").setScale(.5);
        this.my.shieldenemyRed1.add([Helmet1, Shield1]);
        this.my.shieldenemyRed1.visible = true;

        this.shield1PathProgress = 0;

        // this.shieldEnemies.add(this.my.shieldenemyRed1);

        this.timesShieldHit1 = 0;
        this.shieldJustHit1 = false;

        //Shield Enemy 2
        this.my.sprite.SquareRed2 = this.add.sprite(0, 0, "shieldEnemyRed");
        my.shieldenemyRed2 = this.add.container(this.enemyX, this.enemyY, [this.my.sprite.SquareRed2])
        let Helmet2 = this.add.sprite(0,-25, "Helmet");
        this.my.sprite.Helmet2 = Helmet2;
        let Shield2 = this.add.sprite(+15,+10, "Shield").setScale(.5);
        this.my.shieldenemyRed2.add([Helmet2, Shield2]);
        my.shieldenemyRed2.visible = true;

        this.shield2PathProgress = 0;

        // this.shieldEnemies.add(this.my.shieldenemyRed2);

        this.timesShieldHit2 = 0;
        this.shieldJustHit2 = false;

        //Bow Enemy 1
        let Bow1 = this.add.sprite(+15,+10, "Bow").setOrigin(.1,.5);
        let YellowHand1 = this.add.sprite(+15,+10, "YellowHand").setOrigin(.1,.5);
        this.my.sprite.Bow1 = Bow1;
        this.my.sprite.YellowHand1 = YellowHand1;
 
        this.my.sprite.OvalYellow1 = this.add.sprite(0, 0, "OvalYellow");
        my.bowenemyYellow1 = this.add.container(this.shieldX, this.shieldY, [this.my.sprite.OvalYellow1])
        this.my.bowenemyYellow1.add([Bow1, YellowHand1]);

        this.bow1PathProgress = 0;

        // this.bowEnemies.add(this.my.bowenemyYellow1);

        this.timesBowHit1 = 0;
        this.justBowHit1 = false;


        //Bow Enemy 2
        let Bow2 = this.add.sprite(+15,+10, "Bow").setOrigin(.1,.5);
        let YellowHand2 = this.add.sprite(+15,+10, "YellowHand").setOrigin(.1,.5);
        this.my.sprite.Bow2 = Bow2;
        this.my.sprite.YellowHand2 = YellowHand2;
 
        this.my.sprite.OvalYellow2 = this.add.sprite(0, 0, "OvalYellow");
        my.bowenemyYellow2 = this.add.container(this.shieldX, this.shieldY, [this.my.sprite.OvalYellow2])
        this.my.bowenemyYellow2.add([Bow2, YellowHand2]);

        this.bow2PathProgress = 0;

        // this.bowEnemies.add(this.my.bowenemyYellow2);

        this.timesBowHit2 = 0;
        this.justBowHit2 = false;
    }


    waveTwo() {
        let my = this.my

        if (my.shieldenemyRed1) {
            my.shieldenemyRed1.destroy();
            my.shieldenemyRed1 = null;
        }
        if (my.shieldenemyRed2) {
            my.shieldenemyRed2.destroy();
            my.shieldenemyRed2 = null;
        }
        if (my.shieldenemyRed3) {
            my.shieldenemyRed3.destroy();
            my.shieldenemyRed3 = null;
        }
        if (my.bowenemyYellow1) {
            my.bowenemyYellow1.destroy();
            my.bowenemyYellow1 = null;
        }
        if (my.bowenemyYellow2) {
            my.bowenemyYellow2.destroy();
            my.bowenemyYellow2 = null;
        }
        if (my.bowenemyYellow3) {
            my.bowenemyYellow3.destroy();
            my.bowenemyYellow3 = null;
        }

        this.enemiesRemaining = 6;

        //Shield Enemy 1
        this.my.sprite.SquareRed1 = this.add.sprite(0, 0, "shieldEnemyRed");
        this.my.shieldenemyRed1 = this.add.container(this.enemyX, this.enemyY, [this.my.sprite.SquareRed1])
        let Helmet1 = this.add.sprite(0,-25, "Helmet");
        this.my.sprite.Helmet1 = Helmet1;
        let Shield1 = this.add.sprite(+15,+10, "Shield").setScale(.5);
        this.my.shieldenemyRed1.add([Helmet1, Shield1]);
        this.my.shieldenemyRed1.visible = true;

        this.shield1PathProgress = 0;

        // this.shieldEnemies.add(this.my.shieldenemyRed1);

        this.timesShieldHit1 = 0;
        this.shieldJustHit1 = false;

        //Shield Enemy 2
        this.my.sprite.SquareRed2 = this.add.sprite(0, 0, "shieldEnemyRed");
        my.shieldenemyRed2 = this.add.container(this.enemyX, this.enemyY, [this.my.sprite.SquareRed2])
        let Helmet2 = this.add.sprite(0,-25, "Helmet");
        this.my.sprite.Helmet2 = Helmet2;
        let Shield2 = this.add.sprite(+15,+10, "Shield").setScale(.5);
        this.my.shieldenemyRed2.add([Helmet2, Shield2]);
        my.shieldenemyRed2.visible = true;

        this.shield2PathProgress = 0;

        // this.shieldEnemies.add(this.my.shieldenemyRed2);

        this.timesShieldHit2 = 0;
        this.shieldJustHit2 = false;

        //Shield Enemy 3
        this.my.sprite.SquareRed3 = this.add.sprite(0, 0, "shieldEnemyRed");
        my.shieldenemyRed3 = this.add.container(this.enemyX, this.enemyY, [this.my.sprite.SquareRed3])
        let Helmet3 = this.add.sprite(0,-25, "Helmet");
        this.my.sprite.Helmet3 = Helmet3;
        let Shield3 = this.add.sprite(+15,+10, "Shield").setScale(.5);
        this.my.shieldenemyRed3.add([Helmet3, Shield3]);
        my.shieldenemyRed3.visible = true;

        this.shield3PathProgress = .5;

        // this.shieldEnemies.add(this.my.shieldenemyRed2);

        this.timesShieldHit3 = 0;
        this.shieldJustHit3 = false;

        //Bow Enemy 1
        let Bow1 = this.add.sprite(+15,+10, "Bow").setOrigin(.1,.5);
        let YellowHand1 = this.add.sprite(+15,+10, "YellowHand").setOrigin(.1,.5);
        this.my.sprite.Bow1 = Bow1;
        this.my.sprite.YellowHand1 = YellowHand1;
 
        this.my.sprite.OvalYellow1 = this.add.sprite(0, 0, "OvalYellow");
        my.bowenemyYellow1 = this.add.container(this.shieldX, this.shieldY, [this.my.sprite.OvalYellow1])
        this.my.bowenemyYellow1.add([Bow1, YellowHand1]);

        this.bow1PathProgress = 0;

        // this.bowEnemies.add(this.my.bowenemyYellow1);

        this.timesBowHit1 = 0;
        this.justBowHit1 = false;


        //Bow Enemy 2
        let Bow2 = this.add.sprite(+15,+10, "Bow").setOrigin(.1,.5);
        let YellowHand2 = this.add.sprite(+15,+10, "YellowHand").setOrigin(.1,.5);
        this.my.sprite.Bow2 = Bow2;
        this.my.sprite.YellowHand2 = YellowHand2;
 
        this.my.sprite.OvalYellow2 = this.add.sprite(0, 0, "OvalYellow");
        my.bowenemyYellow2 = this.add.container(this.shieldX, this.shieldY, [this.my.sprite.OvalYellow2])
        this.my.bowenemyYellow2.add([Bow2, YellowHand2]);

        this.bow2PathProgress = 0;

        // this.bowEnemies.add(this.my.bowenemyYellow2);

        this.timesBowHit2 = 0;
        this.justBowHit2 = false;


        //Bow Enemy 3
        let Bow3 = this.add.sprite(+15,+10, "Bow").setOrigin(.1,.5);
        let YellowHand3 = this.add.sprite(+15,+10, "YellowHand").setOrigin(.1,.5);
        this.my.sprite.Bow3 = Bow3;
        this.my.sprite.YellowHand3 = YellowHand3;
 
        this.my.sprite.OvalYellow3 = this.add.sprite(0, 0, "OvalYellow");
        my.bowenemyYellow3 = this.add.container(this.shieldX, this.shieldY, [this.my.sprite.OvalYellow3])
        this.my.bowenemyYellow3.add([Bow3, YellowHand3]);

        this.bow3PathProgress = .5;

        // this.bowEnemies.add(this.my.bowenemyYellow2);

        this.timesBowHit3 = 0;
        this.justBowHit3 = false;
    }

    update() {
        let my = this.my
        this.counter += 1;

        if (this.playerLives == 0){
            console.log("Game Over!");
            this.sound.play("gameLost", {
                volume: .8   // Can adjust volume using this, goes from 0 to 1
            });
            this.scene.start("GameOver");

        }

        if (this.waveFinished) {
            if (this.currentWave < 5) {
                this.sound.play("gameWon", {
                    volume: 1   // Can adjust volume using this, goes from 0 to 1
                });
                this.waveOne();
                this.waveFinished = false;
                this.currentWave++;
            }
        }

        if (this.waveFinished) {
            if (this.currentWave >= 5 && this.currentWave < 10) {
                this.sound.play("gameWon", {
                    volume: 1   // Can adjust volume using this, goes from 0 to 1
                });
                this.waveTwo();
                this.waveFinished = false;
                this.currentWave++;
            }
        }

        if (this.currentWave == 10) {
            console.log("Game Won!");
            this.sound.play("gameWon", {
                volume: 1   // Can adjust volume using this, goes from 0 to 1
            });
            this.scene.start("GameWon");
        }

        if (this.enemiesRemaining == 0) {
            this.waveFinished = true;
            this.playerLives++;
        }


        //Movement
        if (this.aKey.isDown) {
            this.my.sprite.Base.x -= 5;
            this.my.sprite.Ladder.x = this.my.sprite.Base.x;
            this.my.sprite.playerSpear.x = this.my.sprite.Base.x;
            
            if (this.my.sprite.Base.x <= 0) {
                this.my.sprite.Base.x = 0;
            }

        }

        if (this.dKey.isDown) {
            this.my.sprite.Base.x += 5;
            this.my.sprite.Ladder.x = this.my.sprite.Base.x;
            this.my.sprite.playerSpear.x = this.my.sprite.Base.x;
            
            if (this.my.sprite.Base.x >= game.config.width) {
                this.my.sprite.Base.x = game.config.width;
            }

        }

        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            if (!this.bulletActive) {

                this.bulletActive = true;

                this.my.sprite.Spear = this.add.sprite(this.my.sprite.Base.x, this.my.sprite.Base.y, "playerSpear");

                // my.sprite.Spear.x = my.sprite.Base.x;
                // my.sprite.Spear.y = my.sprite.Base.y;
                my.sprite.Spear.visible = true;
            }
        }

        if (this.bulletActive) {
            my.sprite.Spear.y -= this.bulletSpeed;
            this.my.sprite.playerSpear.visible = false;
            if (my.sprite.Spear.y < -(my.sprite.Spear.height/2)) {
                this.bulletActive = false;
                my.sprite.Spear.visible = false;
                my.sprite.Spear.destroy();
            }
        } else {
            this.my.sprite.playerSpear.visible = true;
        }

        //Heart Spawning
        this.updateHearts();


        //Following the player with eyes and bow
        if (my.bowenemyYellow1) {
            let dx = my.sprite.Base.x - my.bowenemyYellow1.x;
            let dy = my.sprite.Base.y - my.bowenemyYellow1.y;

            let bowRadian = Math.atan2(dy, dx);
            let bowAngle = Phaser.Math.RadToDeg(bowRadian);


            my.sprite.Bow1.angle = bowAngle;
            my.sprite.YellowHand1.angle = bowAngle;


            if (my.bowenemyYellow1.x > my.sprite.Base.x) {
                my.sprite.OvalYellow1.flipX = true;
                my.sprite.Bow1.flipY = true;
                my.sprite.YellowHand1.flipX = true;
            } else {
                my.sprite.OvalYellow1.flipX = false;
                my.sprite.Bow1.flipY = false;
                my.sprite.YellowHand1.flipX = false;
            }
        }
        if (my.bowenemyYellow2) {
            let dx = my.sprite.Base.x - my.bowenemyYellow2.x;
            let dy = my.sprite.Base.y - my.bowenemyYellow2.y;

            let bowRadian = Math.atan2(dy, dx);
            let bowAngle = Phaser.Math.RadToDeg(bowRadian);


            my.sprite.Bow2.angle = bowAngle;
            my.sprite.YellowHand2.angle = bowAngle;


            if (my.bowenemyYellow2.x > my.sprite.Base.x) {
                my.sprite.OvalYellow2.flipX = true;
                my.sprite.Bow2.flipY = true;
                my.sprite.YellowHand2.flipX = true;
            } else {
                my.sprite.OvalYellow2.flipX = false;
                my.sprite.Bow2.flipY = false;
                my.sprite.YellowHand2.flipX = false;
            }
        }

        if (my.bowenemyYellow3) {
            let dx = my.sprite.Base.x - my.bowenemyYellow3.x;
            let dy = my.sprite.Base.y - my.bowenemyYellow3.y;

            let bowRadian = Math.atan2(dy, dx);
            let bowAngle = Phaser.Math.RadToDeg(bowRadian);


            my.sprite.Bow3.angle = bowAngle;
            my.sprite.YellowHand3.angle = bowAngle;


            if (my.bowenemyYellow3.x > my.sprite.Base.x) {
                my.sprite.OvalYellow3.flipX = true;
                my.sprite.Bow3.flipY = true;
                my.sprite.YellowHand3.flipX = true;
            } else {
                my.sprite.OvalYellow3.flipX = false;
                my.sprite.Bow3.flipY = false;
                my.sprite.YellowHand3.flipX = false;
            }
        }

        if (my.shieldenemyRed1 &&  my.shieldenemyRed1.x > my.sprite.Base.x) {
            my.sprite.SquareRed1.flipX = true;
            my.sprite.Helmet1.flipX = true;
        } else {
            my.sprite.SquareRed1.flipX = false;
            my.sprite.Helmet1.flipX = false;
        }

        if (my.shieldenemyRed2 &&  my.shieldenemyRed2.x > my.sprite.Base.x) {
            my.sprite.SquareRed2.flipX = true;
            my.sprite.Helmet2.flipX = true;
        } else {
            my.sprite.SquareRed2.flipX = false;
            my.sprite.Helmet2.flipX = false;
        }

        if (my.shieldenemyRed3 && my.sprite.SquareRed3 && my.sprite.Helmet3) {
            if (my.shieldenemyRed3 &&  my.shieldenemyRed3.x > my.sprite.Base.x) {
                my.sprite.SquareRed3.flipX = true;
                my.sprite.Helmet3.flipX = true;
            } else {
                my.sprite.SquareRed3.flipX = false;
                my.sprite.Helmet3.flipX = false;
            }

        }
        //Enemy Path Following

        //Shield 1 Path
        this.shield1PathProgress += 0.001;
        if (this.shield1PathProgress > 1) {
            this.shield1PathProgress = 0;
        }

        const shieldPoint1 = this.sPathLeft.getPoint(this.shield1PathProgress);
        if (shieldPoint1 && my.shieldenemyRed1) {
            my.shieldenemyRed1.x =shieldPoint1.x
            my.shieldenemyRed1.y =shieldPoint1.y
        }

        //Shield 2 Path
        this.shield2PathProgress += 0.001;
        if (this.shield2PathProgress > 1) {
            this.shield2PathProgress = 0;
        }

        const shieldPoint2 = this.sPathRight.getPoint(this.shield2PathProgress);
        if (shieldPoint2 && my.shieldenemyRed2) {
            my.shieldenemyRed2.x =shieldPoint2.x
            my.shieldenemyRed2.y =shieldPoint2.y
        }

        //Shield 3 Path
        this.shield3PathProgress += 0.001;
        if (this.shield3PathProgress > 1) {
            this.shield3PathProgress = 0;
        }

        if (my.shieldenemyRed3){
            const shieldPoint3 = this.sPathRight.getPoint(this.shield3PathProgress);
            if (shieldPoint3 && my.shieldenemyRed3) {
                my.shieldenemyRed3.x =shieldPoint3.x
                my.shieldenemyRed3.y =shieldPoint3.y
            }
        }

        //Bow 1 Path
        this.bow1PathProgress += 0.001;
        if (this.bow1PathProgress > 1) {
            this.bow1PathProgress = 0;
        }

        const bowPoint1 = this.bPathRight.getPoint(this.bow1PathProgress);
        if (bowPoint1 && my.bowenemyYellow1) {
            my.bowenemyYellow1.x =bowPoint1.x
            my.bowenemyYellow1.y =bowPoint1.y
        }

        //Bow 2 Path
        this.bow2PathProgress += 0.001;
        if (this.bow2PathProgress > 1) {
            this.bow2PathProgress = 0;
        }

        const bowPoint2 = this.bPathLeft.getPoint(this.bow2PathProgress);
        if (bowPoint2 && my.bowenemyYellow2) {
            my.bowenemyYellow2.x =bowPoint2.x
            my.bowenemyYellow2.y =bowPoint2.y
        }

        //Bow 3 Path
        this.bow3PathProgress += 0.001;
        if (this.bow3PathProgress > 1) {
            this.bow3PathProgress = 0;
        }

        if (my.bowenemyYellow3) {
            const bowPoint3 = this.bPathLeft.getPoint(this.bow3PathProgress);
            if (bowPoint3 && my.bowenemyYellow3) {
                my.bowenemyYellow3.x =bowPoint3.x
                my.bowenemyYellow3.y =bowPoint3.y
            }
        }

        // my.sprite.Spear = my.sprite.Spear.filter((Spear) => Spear.y > -(Spear.displayHeight/2));



        //Bow enemy shooting
        
        if (my.bowenemyYellow1 && this.counter % 180 == 0) {
            this.fireArrow(my.bowenemyYellow1);
        } else if (my.bowenemyYellow2 && this.counter % 180 == 90) {
            this.fireArrow(my.bowenemyYellow2);
        } else if (my.bowenemyYellow3 && this.counter % 180 == 135) {
            this.fireArrow(my.bowenemyYellow3);
        }

        


        //Shield Collision

        if (my.shieldenemyRed1 && my.sprite.Spear && this.collides(my.shieldenemyRed1, this.my.sprite.Spear) && this.shieldJustHit1 == false) {
            my.sprite.Spear.visible = false;
            this.shieldJustHit1 = true;
            this.sound.play("shieldHit", {
                volume: .6   // Can adjust volume using this, goes from 0 to 1
            });
            if (this.timesShieldHit1 >= 3){
                this.playerScore += 15;
                this.updateScoreSprites();

                    // this.my.sprite.Helmet.destroy();
                    // this.my.sprite.SquareRed.destroy();
                    
                my.shieldenemyRed1.destroy();

                my.shieldenemyRed1 = null;
                this.enemiesRemaining--;

            } else {
                this.timesShieldHit1++;
            }
                
            // this.updateScore();
        }

        if (my.shieldenemyRed2 && my.sprite.Spear && this.collides(my.shieldenemyRed2, this.my.sprite.Spear) && this.shieldJustHit2 == false) {
            my.sprite.Spear.visible = false;
            this.shieldJustHit2 = true;
            this.sound.play("shieldHit", {
                volume: .6   // Can adjust volume using this, goes from 0 to 1
            });
            if (this.timesShieldHit2 >= 3){
                this.playerScore += 15;
                this.updateScoreSprites();

                    // this.my.sprite.Helmet.destroy();
                    // this.my.sprite.SquareRed.destroy();
                    
                my.shieldenemyRed2.destroy();

                my.shieldenemyRed2 = null;
                this.enemiesRemaining--;

            } else {
                this.timesShieldHit2++;
            }
                
            // this.updateScore();
        }

        if (my.shieldenemyRed3 && my.sprite.Spear && this.collides(my.shieldenemyRed3, this.my.sprite.Spear) && this.shieldJustHit3 == false) {
            my.sprite.Spear.visible = false;
            this.shieldJustHit3 = true;
            this.sound.play("shieldHit", {
                volume: .6   // Can adjust volume using this, goes from 0 to 1
            });
            if (this.timesShieldHit3 >= 3){
                this.playerScore += 15;
                this.updateScoreSprites();

                    // this.my.sprite.Helmet.destroy();
                    // this.my.sprite.SquareRed.destroy();
                    
                my.shieldenemyRed3.destroy();

                my.shieldenemyRed3 = null;
                this.enemiesRemaining--;

            } else {
                this.timesShieldHit3++;
            }
                
            // this.updateScore();
        }


        if (!this.bulletActive) {
            this.shieldJustHit1 = false;
            this.shieldJustHit2 = false;
            this.shieldJustHit3 = false;
            this.justBowHit1 = false;
            this.justBowHit2 = false;
            this.justBowHit3 = false;
        }

        if (my.sprite.Spear && my.bowenemyYellow1 && this.collides(this.my.bowenemyYellow1, this.my.sprite.Spear) && this.justBowHit1 == false) {
            my.sprite.Spear.visible = false;
            this.justBowHit1 = true;
            this.sound.play("bowHit", {
                volume: .6   // Can adjust volume using this, goes from 0 to 1
            });
            if (this.timesBowHit1 >= 1){
                this.playerScore += 30;
                this.updateScoreSprites();
                this.my.bowenemyYellow1.destroy();

                this.my.bowenemyYellow1 = null;
                this.enemiesRemaining--;

            } else {
                this.timesBowHit1++;
            }
        
        }

        if (my.sprite.Spear && my.bowenemyYellow2 && this.collides(this.my.bowenemyYellow2, this.my.sprite.Spear) && this.justBowHit2 == false) {
            my.sprite.Spear.visible = false;
            this.justBowHit2 = true;
            this.sound.play("bowHit", {
                volume: .6   // Can adjust volume using this, goes from 0 to 1
            });
            if (this.timesBowHit2 >= 1){
                this.playerScore += 30;
                this.updateScoreSprites();
                this.my.bowenemyYellow2.destroy();

                this.my.bowenemyYellow2 = null;
                this.enemiesRemaining--;

            } else {
                this.timesBowHit2++;
            }
        
        }

        if (my.sprite.Spear && my.bowenemyYellow3 && this.collides(this.my.bowenemyYellow3, this.my.sprite.Spear) && this.justBowHit3 == false) {
            my.sprite.Spear.visible = false;
            this.justBowHit3 = true;
            this.sound.play("bowHit", {
                volume: .6   // Can adjust volume using this, goes from 0 to 1
            });
            if (this.timesBowHit3 >= 1){
                this.playerScore += 30;
                this.updateScoreSprites();
                this.my.bowenemyYellow3.destroy();

                this.my.bowenemyYellow3 = null;
                this.enemiesRemaining--;

            } else {
                this.timesBowHit3++;
            }
        
        }

        this.arrows.getChildren().forEach((arrow) => {
            if (this.collides(arrow, this.my.sprite.Base)) {
                this.hitByArrow(arrow);
            }
        });

        if (my.sprite.Base && my.shieldenemyRed1 && this.collides(this.my.shieldenemyRed1, this.my.sprite.Base)) {
            if (!this.playerInvincible) {
                this.playerLives--;
                this.updateHearts();

                this.sound.play("playerHit", {
                    volume: .7   // Can adjust volume using this, goes from 0 to 1
                });

                this.playerInvincible = true;

                this.time.delayedCall(2000, () => {
                    this.playerInvincible = false;
                }, null, this);
            }
        
        }

        if (my.sprite.Base && my.shieldenemyRed2 && this.collides(this.my.shieldenemyRed2, this.my.sprite.Base)) {
            if (!this.playerInvincible) {
                this.playerLives--;
                this.updateHearts();

                this.sound.play("playerHit", {
                    volume: .7   // Can adjust volume using this, goes from 0 to 1
                });

                this.playerInvincible = true;

                this.time.delayedCall(2000, () => {
                    this.playerInvincible = false;
                }, null, this);
            }
        
        }

        if (my.sprite.Base && my.shieldenemyRed3 && this.collides(this.my.shieldenemyRed3, this.my.sprite.Base)) {
            if (!this.playerInvincible) {
                this.playerLives--;
                this.updateHearts();

                this.sound.play("playerHit", {
                    volume: .7   // Can adjust volume using this, goes from 0 to 1
                });

                this.playerInvincible = true;

                this.time.delayedCall(2000, () => {
                    this.playerInvincible = false;
                }, null, this);
            }
        
        }


    }

    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

    updateScore() {
        this.my.text.score.setText("Score " + this.playerScore);
    }

    fireArrow(BowEnemy) {
        let arrow = this.arrows.create(BowEnemy.x, BowEnemy.y, "Arrow");
        arrow.setOrigin(-.3, .75);
        arrow.setDepth(1);

        let dx = this.my.sprite.Base.x - arrow.x;
        let dy = this.my.sprite.Base.y - arrow.y;
        let arrowAngle = Math.atan2(dy, dx);
        let velocityX = Math.cos(arrowAngle) * this.arrowSpeed;
        let velocityY = Math.sin(arrowAngle) * this.arrowSpeed;

        arrow.setVelocity(velocityX, velocityY);
        arrow.rotation = arrowAngle;
    }

    updateHearts() {
        for (let heart of this.heartIcons) {
            heart.destroy();
        }
        this.heartIcons = [];

        for (let i = 0; i < this.playerLives; i++) {
            let heart = this.add.image(this.heartX - i * 60, this.heartY, "Heart");
            this.heartIcons.push(heart);
        }
    }

    hitByArrow(arrow) {
        arrow.destroy(); 
        this.playerLives -= 1;

        this.sound.play("playerHit", {
            volume: .7   // Can adjust volume using this, goes from 0 to 1
        });
    
        if (this.playerLives <= 0) {
            console.log("Player dead");
        }
    
        this.updateHearts();

        this.playerInvincible = true;

        this.time.delayedCall(2000, () => {
            this.playerInvincible = false;
        }, null, this);
    }

    updateScoreSprites() {
        this.scoreSprites.forEach(sprite => sprite.destroy());
        this.scoreSprites = [];
    
        let scoreString = this.playerScore.toString().padStart(4, '0');
        scoreString = 'X' + scoreString;
    
        for (let i = 0; i < scoreString.length; i++) {
            let char = scoreString[i];
            let sprite = this.add.image(30 + i * 30, 30, char).setScale(0.8).setScrollFactor(0);
            this.scoreSprites.push(sprite);
        }
    }

}