function getActualDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

let player, userNameText, selectedCharacter, selectedSprite;
let gasolines;
let bombs;
let platforms;
let cursors;
let score = 0;
let health = 100;
let healthText;
let lives = 3;
let healthBar;
let livesText;
let gameOver = false;
let scoreText;
let damage = 5;
let charImage;
let desfribilador = [];
let specialObj, botiquinText, armaText;
let shooting = true;
let bullets;
let immune = false;
let zombies, contZombi =30;
let bossHealth = 100, bossTimer = 10, bossText, boss, bossDamage = 1;
let pause = false;
let pauseButton, pauseText, pauseOver, menuButton;
let shot, gas, boti;
let survivor;
let lv = 1, lvText, dateTxt, lvCompleteTxt;
const newFont = new FontFace('MiFuente', 'url(/public/assets/font/future_rot_transform/FutureRot.woff2)');

const gameplay = {
    key: "gameplay",
    init: init,
    preload: preload,
    create: create,
    update: update
};

const gameplay2 = {
    key: "gameplay2",
    init: init,
    preload: preload2,
    create: create2,
    update: update2
};

function init (data) {
    this.selectedCharacter = data.selectedCharacter;
    this.selectedSprite = data.selectedSprite;
}

function preload () {
    this.load.image('sky', 'public/assets/mapa1.jpg');
    this.load.image('sky2', 'public/assets/mapa1-2.jpg');
    this.load.image('floor', 'public/assets/floor.png');
    this.load.image('ground', 'public/assets/platform.png');
    this.load.image('gasoline', 'public/assets/gasoline.png');
    this.load.spritesheet('zombie1', 'public/assets/sprites/WildZombie/Walk.png', { frameWidth: 96, frameHeight: 96 });
    this.load.spritesheet('zombie2', 'public/assets/sprites/ZombieMan/Walk.png', { frameWidth: 96, frameHeight: 96 });
    this.load.spritesheet('zombie3', 'public/assets/sprites/ZombieWoman/Walk.png', { frameWidth: 96, frameHeight: 96 });

    this.load.image('desfribilador', 'public/assets/desfribilador.png');
    this.load.image('botiquin', 'public/assets/botiquin.webp');

    this.load.image('bullet', 'public/assets/ammo.png');
    this.load.image('pausa', 'public/assets/pause.png');
    this.load.image('play', 'public/assets/play.png');

    this.load.audio('shot', 'public/assets/audio/shot.mp3');
    this.load.audio('gas', 'public/assets/audio/gas.mp3');
    this.load.audio('boti', 'public/assets/audio/boti.mp3');
    this.load.audio('hit', 'public/assets/audio/hit.mp3');
}

function preload2 () {
    this.load.image('sky2-1', 'public/assets/mapa2.png');
    this.load.image('sky2-2', 'public/assets/mapa2-2.png');
    this.load.image('floor', 'public/assets/floor.png');
    this.load.image('ground', 'public/assets/platform.png');
    //this.load.image('gasoline', 'public/assets/gasoline.png');
    this.load.spritesheet('zombie1', 'public/assets/sprites/WildZombie/Walk.png', { frameWidth: 96, frameHeight: 96 });
    this.load.spritesheet('zombie2', 'public/assets/sprites/ZombieMan/Walk.png', { frameWidth: 96, frameHeight: 96 });
    this.load.spritesheet('zombie3', 'public/assets/sprites/ZombieWoman/Walk.png', { frameWidth: 96, frameHeight: 96 });
    this.load.image('boss', 'public/assets/sprites/Boss/jefe.png');

    this.load.image('desfribilador', 'public/assets/desfribilador.png');
    //this.load.image('botiquin', 'public/assets/botiquin.webp');

    this.load.image('bullet', 'public/assets/ammo.png');
    this.load.image('pausa', 'public/assets/pause.png');
    this.load.image('play', 'public/assets/play.png');

    this.load.audio('shot', 'public/assets/audio/shot.mp3');
    this.load.audio('gas', 'public/assets/audio/gas.mp3');
    this.load.audio('boti', 'public/assets/audio/boti.mp3');
    this.load.audio('hit', 'public/assets/audio/hit.mp3');
}

function create2 () {
    lv = 2;

    health = 100;


    //  A simple background for our game
    this.add.image(600, 300, 'sky2-1').setScale(3);
    this.add.image(1800, 300, 'sky2-2').setScale(3);
    
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'floor').setScale(2).refreshBody().setAlpha(0);
    platforms.create(800, 568, 'floor').setScale(2).refreshBody().setAlpha(0);
    platforms.create(1200, 568, 'floor').setScale(2).refreshBody().setAlpha(0);
    platforms.create(1600, 568, 'floor').setScale(2).refreshBody().setAlpha(0);
    platforms.create(2000, 568, 'floor').setScale(2).refreshBody().setAlpha(0);

    //  Now let's create some ledges
    platforms.create(845, 370, 'ground').setAlpha(0.8);
    platforms.create(1545, 370, 'ground').setAlpha(0.8);

    //UserName
    userNameText = this.add.text(180, 570, `${survivor}`, {
        fontSize: '28px',
        fill: '#fff'
    });

    pauseOver = this.add.graphics();
    pauseOver.fillStyle(0x000000, 0.5);
    pauseOver.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
    pauseOver.setVisible(false);


    lvText = this.add.text(this.cameras.main.centerX, 0,  `Nivel: ${lv}`, {
        fontSize: '28px',
        fill: '#fff'
    })

    dateTxt = this.add.text(800, 550, 'Date: ' + getActualDate(), {
        fontSize: '28px',
        fill: '#fff'
    })

    pauseText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Juego En Pausa', {
        fontSize: '48px',
        fill: '#ffffff'
    }).setOrigin(0.5, 0.5); // Centrar el texto
    pauseText.setVisible(false);

    menuButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 60, 'Volver al Menú', {
        fontSize: '32px',
        fill: '#ffffff',
        backgroundColor: '#990000'
    }).setOrigin(0.5, 0.5)
      .setPadding(10)
      .setInteractive()
      .setVisible(false);

    menuButton.on('pointerdown', () => {
       this.physics.resume();
        pause = false;
        pauseButton.setTexture('pausa');
        pauseOver.setVisible(false);
        pauseText.setVisible(false);
        menuButton.setVisible(false);
        window.location.href = '/menu';
    });
    
    pauseButton = this.add.image(1150, 40, 'pausa')
        .setDisplaySize(50, 50)
        .setInteractive()
        .setOrigin(0.5, 0.5);

    pauseButton.on('pointerdown', () => {
        if (!pause) {
            this.physics.pause(); // Pausar la física
            pause = true;
            pauseButton.setTexture('play');
            pauseOver.setVisible(true); // Mostrar la pantalla de pausa
            pauseText.setVisible(true);
            menuButton.setVisible(true);
        } else {
            this.physics.resume(); // Reanudar la física
            pause = false;
            pauseButton.setTexture('pausa');
            pauseOver.setVisible(false);
            pauseText.setVisible(false);
            menuButton.setVisible(false);
        }
    });

    shot = this.sound.add('shot');
    gas = this.sound.add('gas');
    boti = this.sound.add('boti');
    hit = this.sound.add('hit');

    // Crear el botiquín
    specialObj = this.physics.add.sprite(
        Phaser.Math.Between(500, 2000), // Genera un valor aleatorio entre 500 y 2000 para x
        Phaser.Math.Between(0, 400),    // Genera un valor aleatorio entre 0 y 300 para y
        'botiquin'
    ).setScale(0.2);
    specialObj.setCollideWorldBounds(true);
    
    let botiquinTimer = 15; 
    botiquinText = this.add.text(specialObj.x, specialObj.y - 20, botiquinTimer, {
        fontSize: '24px',
        fill: '#ffffff'
    }).setOrigin(0.5);

    // Temporizador para el botiquín
    this.time.addEvent({
        delay: 1000,
        callback: () => {
            botiquinTimer--;
            if (botiquinText) {
                botiquinText.setText(botiquinTimer);
            }

            if (botiquinTimer <= 0) {
                specialObj.destroy(); 
                if (botiquinText) {
                    botiquinText.destroy();
                    botiquinText = null;
                }
            }
        },
        callbackScope: this,
        loop: true
    });

    boss = this.physics.add.group()
    let bossX = Phaser.Math.Between(1000, 2000);
    let bossY = 400;
    boss = this.physics.add.sprite(bossX, bossY, 'boss').setScale(0.3);
    boss.setCollideWorldBounds(true);
    
    // Crear el texto de vida del jefe
    bossText = this.add.text(boss.x, boss.y - 50, `Vida: ${bossHealth}`, {
        fontSize: '24px',
        fill: '#ff0000'
    }).setOrigin(0.5);
    boss.setVelocityX(250);


    zombies = this.physics.add.group();

    for (let i = 0; i < contZombi; i++) { 
        let xPosition = Phaser.Math.Between(100, 2500);
        let yPosition = Phaser.Math.Between(50, 100);
        let zombie = zombies.create(xPosition, yPosition, `zombie${(i % 3) + 1}`);
        zombie.setBounce(0.1);
        zombie.setCollideWorldBounds(true);
        zombie.setVelocityX((i % 2 === 0 ? 50 : -50)); 
        zombie.anims.play(`walkZombie${(i % 3) + 1}`, true);
    }

    // The player and its settings
    player = this.physics.add.sprite(100, 450, this.selectedSprite);

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.1);
    player.setCollideWorldBounds(true);

    charImage = this.add.image(60, 550, this.selectedCharacter).setScale(0.5);

    for (let i = 0; i < 3; i++) {
        desfribilador[i] = this.add.image(210 - (i * 30), 50, 'desfribilador').setScale(0.15).setVisible(false);
    }
    updateDesfribiladores();

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers(this.selectedSprite, { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: this.selectedSprite, frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers(this.selectedSprite, { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // Crear animaciones para los zombies
    this.anims.create({
        key: 'walkZombie1',
        frames: this.anims.generateFrameNumbers('zombie1', { start: 0, end: 7 }), // Ajusta el rango según tus sprites
        frameRate: 10,
        repeat: 3
    });

    this.anims.create({
        key: 'walkZombie2',
        frames: this.anims.generateFrameNumbers('zombie2', { start: 0, end: 6 }), // Ajusta el rango según tus sprites
        frameRate: 10,
        repeat: 5
    });

    this.anims.create({
        key: 'walkZombie3',
        frames: this.anims.generateFrameNumbers('zombie3', { start: 0, end: 6 }), // Ajusta el rango según tus sprites
        frameRate: 10,
        repeat: 3
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
    keys = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        shot: Phaser.Input.Keyboard.KeyCodes.S,
    });

    //  Some stars to collect, 10 in total, evenly spaced 70 pixels apart along the x axis
    // gasolines = this.physics.add.group({
    //     key: 'gasoline',
    //     repeat: -1,
    //     setXY: { x: 300, y: 10, stepX: 200, stepY: 50 }
    // });

    bullets = this.physics.add.group({
        defaultKey: 'bullet',
        maxSize: 10000 
    });

    // gasolines.children.iterate(function (child) {
    //     //  Give each star a slightly different bounce
    //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    // });

    //  The score
    scoreText = this.add.text(16, 16, 'score: ' + score, { fontSize: '32px', fill: '#ff0000' });
    livesText = this.add.text(16, 50, 'Lives: ', { fontSize: '32px', fill: '#ff0000' });
    healthText = this.add.text(16, 50, health + '%', { fontSize: '28px', fill: '#fff' });
    //The Health Bar
    healthBar = this.add.graphics();
    updateHealthBar();

    //  Collide the player and the gasoline with the platforms
    this.physics.add.collider(player, platforms);
    //this.physics.add.collider(gasolines, platforms);
    this.physics.add.collider(specialObj, platforms);
    this.physics.add.collider(zombies, platforms);
    this.physics.add.collider(boss, platforms);

    //  Checks to see if the player overlaps with any of the gasoline, if he does call the collectStar function
    //this.physics.add.overlap(player, gasolines, collectStar2, null, this);
    this.physics.add.overlap(player, specialObj, collectSpecialObj, null, this);
    this.physics.add.overlap(player, zombies, hitByZombie, null, this);
    this.physics.add.overlap(player, boss, hitByBoss, null, this);

    this.physics.add.overlap(bullets, zombies, hitZombie, null, this);
    this.physics.add.overlap(bullets, boss, hitBoss, null, this);


    this.cameras.main.startFollow(player);
    this.physics.world.setBounds(0, 0, 2400, 600);
    this.cameras.main.setBounds(0, 0, 2400, 600);
    this.cameras.main.setDeadzone(200, 200);
}

function create () {
    //  A simple background for our game
    this.add.image(600, 300, 'sky').setScale(.7);
    this.add.image(1800, 300, 'sky2').setScale(.7);

    //this.add.image(1500, 300, 'sky2').setScale(3);
    //this.add.image(500, 300, 'sky2').setScale(3);
    

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'floor').setScale(2).refreshBody().setAlpha(0);
    platforms.create(800, 568, 'floor').setScale(2).refreshBody().setAlpha(0);
    platforms.create(1200, 568, 'floor').setScale(2).refreshBody().setAlpha(0);
    platforms.create(1600, 568, 'floor').setScale(2).refreshBody().setAlpha(0);
    platforms.create(2000, 568, 'floor').setScale(2).refreshBody().setAlpha(0);

    //  Now let's create some ledges
    platforms.create(400, 365, 'ground').setAlpha(0);
    platforms.create(800, 365, 'ground').setAlpha(0);
    platforms.create(1200, 365, 'ground').setAlpha(0);
    platforms.create(1600, 365, 'ground').setAlpha(0);
    platforms.create(2000, 365, 'ground').setAlpha(0);

    platforms.create(745, 180, 'ground').setAlpha(0);
    platforms.create(1145, 180, 'ground').setAlpha(0);
    platforms.create(1545, 180, 'ground').setAlpha(0);
    platforms.create(1650, 180, 'ground').setAlpha(0);

    //UserName
    userNameText = this.add.text(180, 570, `${survivor}`, {
        fontSize: '28px',
        fill: '#fff'
    });

    pauseOver = this.add.graphics();
    pauseOver.fillStyle(0x000000, 0.5);
    pauseOver.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
    pauseOver.setVisible(false);


    lvText = this.add.text(this.cameras.main.centerX, 0,  `Nivel: ${lv}`, {
        fontSize: '28px',
        fill: '#000'
    })

    dateTxt = this.add.text(800, 550, 'Date: ' + getActualDate(), {
        fontSize: '28px',
        fill: '#fff'
    })

    pauseText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Juego En Pausa', {
        fontSize: '48px',
        fill: '#ffffff'
    }).setOrigin(0.5, 0.5); // Centrar el texto
    pauseText.setVisible(false);

    menuButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 60, 'Volver al Menú', {
        fontSize: '32px',
        fill: '#ffffff',
        backgroundColor: '#990000'
    }).setOrigin(0.5, 0.5)
      .setPadding(10)
      .setInteractive()
      .setVisible(false);

    menuButton.on('pointerdown', () => {
       this.physics.resume();
        pause = false;
        pauseButton.setTexture('pausa');
        pauseOver.setVisible(false);
        pauseText.setVisible(false);
        menuButton.setVisible(false);
        window.location.href = '/menu';
    });

    pauseButton = this.add.image(1150, 40, 'pausa')
        .setDisplaySize(50, 50)
        .setInteractive()
        .setOrigin(0.5, 0.5);

        pauseButton.on('pointerdown', () => {
            if (!pause) {
                this.physics.pause(); // Pausar la física
                pause = true;
                pauseButton.setTexture('play');
                pauseOver.setVisible(true); // Mostrar la pantalla de pausa
                pauseText.setVisible(true);
                menuButton.setVisible(true);
            } else {
                this.physics.resume(); // Reanudar la física
                pause = false;
                pauseButton.setTexture('pausa');
                pauseOver.setVisible(false);
                pauseText.setVisible(false);
                menuButton.setVisible(false);
            }
        });

    const audio = document.getElementById('bgMusic');

    const newSource = document.createElement('source');
    newSource.src = 'public/assets/audio/levelmusic.mp3';
    newSource.type = 'audio/wav';
    audio.innerHTML = '';

    audio.appendChild(newSource);
    audio.load();
    audio.play();
    document.getElementById('playPauseBtn').textContent = "⏸️ Pausar";

    shot = this.sound.add('shot');
    gas = this.sound.add('gas');
    boti = this.sound.add('boti');
    hit = this.sound.add('hit');

    // Crear el botiquín
    specialObj = this.physics.add.sprite(
        Phaser.Math.Between(500, 2000), // Genera un valor aleatorio entre 500 y 2000 para x
        Phaser.Math.Between(0, 400),    // Genera un valor aleatorio entre 0 y 300 para y
        'botiquin'
    ).setScale(0.2);
    specialObj.setCollideWorldBounds(true);
    
    let botiquinTimer = 15; 
    botiquinText = this.add.text(specialObj.x, specialObj.y - 20, botiquinTimer, {
        fontSize: '24px',
        fill: '#ffffff'
    }).setOrigin(0.5);

    // Temporizador para el botiquín
    var aux = 0;
    this.time.addEvent({
        delay: 1000,
        callback: () => {
            botiquinTimer--;
            if (botiquinText) {
                botiquinText.setText(botiquinTimer);
            }

            if (botiquinTimer <= 0) {
                specialObj.destroy(); 
                if (botiquinText) {
                    botiquinText.destroy();
                    botiquinText = null;
                }
                if(aux == 0){
                    console.log(aux);
                    let gasoline = this.physics.add.sprite(specialObj.x, specialObj.y, 'gasoline').setScale(1);
                    gasoline.setCollideWorldBounds(true);
                    this.physics.add.collider(gasoline, platforms);
                    this.physics.add.overlap(player, gasoline, collectStar, null, this);
                    aux++;
                }
            }
        },
        callbackScope: this,
        loop: true
    });

    zombies = this.physics.add.group();


    for (let i = 0; i < contZombi; i++) { // Cambia el número de zombies según sea necesario
        let xPosition = Phaser.Math.Between(300, 2300); // Generar una posición aleatoria en el rango del mapa
        let yPosition = Phaser.Math.Between(50, 400); // Generar una altura aleatoria para los zombies
        let zombie = zombies.create(xPosition, yPosition, `zombie${(i % 3) + 1}`); // Alternar entre los tipos de zombies
        zombie.setBounce(0.1);
        zombie.setCollideWorldBounds(true);
        zombie.setVelocityX((i % 2 === 0 ? 50 : -50)); // Alternar dirección
        zombie.anims.play(`walkZombie${(i % 3) + 1}`, true); // Reproducir la animación de caminar
    }

    // The player and its settings
    player = this.physics.add.sprite(100, 450, this.selectedSprite);

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.1);
    player.setCollideWorldBounds(true);

    charImage = this.add.image(60, 550, this.selectedCharacter).setScale(0.5);

    for (let i = 0; i < 3; i++) {
        desfribilador[i] = this.add.image(210 - (i * 30), 50, 'desfribilador').setScale(0.15).setVisible(false);
    }
    updateDesfribiladores();

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers(this.selectedSprite, { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: this.selectedSprite, frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers(this.selectedSprite, { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // Crear animaciones para los zombies
    this.anims.create({
        key: 'walkZombie1',
        frames: this.anims.generateFrameNumbers('zombie1', { start: 0, end: 7 }), // Ajusta el rango según tus sprites
        frameRate: 10,
        repeat: 3
    });

    this.anims.create({
        key: 'walkZombie2',
        frames: this.anims.generateFrameNumbers('zombie2', { start: 0, end: 6 }), // Ajusta el rango según tus sprites
        frameRate: 10,
        repeat: 5
    });

    this.anims.create({
        key: 'walkZombie3',
        frames: this.anims.generateFrameNumbers('zombie3', { start: 0, end: 6 }), // Ajusta el rango según tus sprites
        frameRate: 10,
        repeat: 3
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
    keys = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        shot: Phaser.Input.Keyboard.KeyCodes.S,
    });

    //  Some stars to collect, 10 in total, evenly spaced 70 pixels apart along the x axis
    gasolines = this.physics.add.group({
        key: 'gasoline',
        repeat: 9,
        setXY: { x: 300, y: 10, stepX: 200, stepY: 50 }           //////Descompentar al Final
    });

    bullets = this.physics.add.group({
        defaultKey: 'bullet',
        maxSize: 10000 
    });

    gasolines.children.iterate(function (child) {
        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    //  The score
    scoreText = this.add.text(16, 16, 'score: ' + score, { fontSize: '32px', fill: '#ff0000' });
    livesText = this.add.text(16, 50, 'Lives: ', { fontSize: '32px', fill: '#ff0000' });
    healthText = this.add.text(16, 50, health + '%', { fontSize: '28px', fill: '#fff' });
    //The Health Bar
    healthBar = this.add.graphics();
    updateHealthBar();

    //  Collide the player and the gasoline with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(gasolines, platforms);
    this.physics.add.collider(specialObj, platforms);

    this.physics.add.collider(zombies, platforms);

    //  Checks to see if the player overlaps with any of the gasoline, if he does call the collectStar function
    this.physics.add.overlap(player, gasolines, collectStar, null, this);
    this.physics.add.overlap(player, specialObj, collectSpecialObj, null, this);
    this.physics.add.overlap(player, zombies, hitByZombie, null, this);

    this.physics.add.overlap(bullets, zombies, hitZombie, null, this);


    this.cameras.main.startFollow(player);
    this.physics.world.setBounds(0, 0, 2400, 600);
    this.cameras.main.setBounds(0, 0, 2400, 600);
    this.cameras.main.setDeadzone(200, 200);
}

function update () {
    if (gameOver) {
        let user = JSON.parse(localStorage.getItem(`superviviente ${survivor}`));

        if (user.puntuacion < score) {
            localStorage.setItem(`superviviente ${survivor}`, JSON.stringify({
                jugador: survivor,
                puntuacion: score,
                fecha: getActualDate()}));
        }

        this.scene.start("sceneGameOver");
        gameOver = false;
        return;
    }

    if (lvCompleteTxt && lvCompleteTxt.visible) { 
        if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N), 500)) {
            this.scene.start("gameplay2", {                 
                selectedCharacter: this.selectedCharacter,
                selectedSprite: this.selectedSprite,
                actualScore: score
            });
        }
    }

    if(pause){
        return;
    }

    if (cursors.left.isDown || keys.left.isDown)
    {
        player.setVelocityX(-460);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown || keys.right.isDown)
    {
        player.setVelocityX(460);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if ((cursors.up.isDown || cursors.space.isDown || keys.up.isDown) && player.body.touching.down)
    {
        player.setVelocityY(-350);
    }

    if(keys.shot.isDown && shooting){
        shootBullet();
    }


    bullets.children.iterate(function (bullet) {
        if (bullet.x > 2400 || bullet.x < 0) { 
            bullet.setActive(false);
            bullet.setVisible(false);
        }
    });

    userNameText.setPosition(this.cameras.main.scrollX+5, this.cameras.main.scrollY+470);
    scoreText.setPosition(this.cameras.main.scrollX+10, this.cameras.main.scrollY);
    healthBar.setPosition(this.cameras.main.scrollX+100, this.cameras.main.scrollY+520);
    livesText.setPosition(this.cameras.main.scrollX+10, this.cameras.main.scrollY+30);
    healthText.setPosition(this.cameras.main.scrollX+320, this.cameras.main.scrollY+566);
    charImage.setPosition(this.cameras.main.scrollX + 60, this.cameras.main.scrollY + 550);
    pauseButton.setPosition(this.cameras.main.scrollX + 1150, this.cameras.main.scrollY + 40);
    pauseOver.setPosition(this.cameras.main.scrollX, this.cameras.main.scrollY);
    pauseText.setPosition(this.cameras.main.scrollX+600, this.cameras.main.scrollY+300);
    menuButton.setPosition(this.cameras.main.scrollX+600, this.cameras.main.scrollY+400);
    dateTxt.setPosition(this.cameras.main.scrollX+800, this.cameras.main.scrollY+550);
    lvText.setPosition(this.cameras.main.scrollX+600, this.cameras.main.scrollY);
    desfribilador[0].setPosition(this.cameras.main.scrollX + 210, this.cameras.main.scrollY + 50);
    desfribilador[1].setPosition(this.cameras.main.scrollX + 180, this.cameras.main.scrollY + 50);
    desfribilador[2].setPosition(this.cameras.main.scrollX + 150, this.cameras.main.scrollY + 50);


    let distance = Phaser.Math.Distance.Between(player.x, player.y, charImage.x, charImage.y);
    let opacity = Phaser.Math.Clamp(distance/100, 0.1, 1);
    charImage.setAlpha(opacity); 

    if (specialObj && specialObj.active && botiquinText && botiquinText.active) { // Verifica si ambos objetos están activos
        botiquinText.setPosition(specialObj.x, specialObj.y - 20);
    }

    zombies.children.iterate(function(zombie) {
        moveZombies(zombie);
    });
}

function update2 () {
    if (gameOver) {
        let user = JSON.parse(localStorage.getItem(`superviviente ${survivor}`));

        if (user.puntuacion < score) {
            localStorage.setItem(`superviviente ${survivor}`, JSON.stringify({
                jugador: survivor,
                puntuacion: score,
                fecha: getActualDate()}));
        }

        this.scene.start("sceneGameOver");
        gameOver = false;
        return;
    }

    if(pause){
        return;
    }

    if (cursors.left.isDown || keys.left.isDown)
    {
        player.setVelocityX(-460);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown || keys.right.isDown)
    {
        player.setVelocityX(460);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if ((cursors.up.isDown || cursors.space.isDown || keys.up.isDown) && player.body.touching.down)
    {
        player.setVelocityY(-350);
    }

    if(keys.shot.isDown && shooting){
        shootBullet();
    }


    bullets.children.iterate(function (bullet) {
        if (bullet.x > 2400 || bullet.x < 0) { 
            bullet.setActive(false);
            bullet.setVisible(false);
        }
    });

    userNameText.setPosition(this.cameras.main.scrollX+5, this.cameras.main.scrollY+470);
    scoreText.setPosition(this.cameras.main.scrollX+10, this.cameras.main.scrollY);
    healthBar.setPosition(this.cameras.main.scrollX+100, this.cameras.main.scrollY+520);
    livesText.setPosition(this.cameras.main.scrollX+10, this.cameras.main.scrollY+30);
    healthText.setPosition(this.cameras.main.scrollX+320, this.cameras.main.scrollY+566);
    charImage.setPosition(this.cameras.main.scrollX + 60, this.cameras.main.scrollY + 550);
    pauseButton.setPosition(this.cameras.main.scrollX + 1150, this.cameras.main.scrollY + 40);
    pauseOver.setPosition(this.cameras.main.scrollX, this.cameras.main.scrollY);
    pauseText.setPosition(this.cameras.main.scrollX+600, this.cameras.main.scrollY+300);
    menuButton.setPosition(this.cameras.main.scrollX+600, this.cameras.main.scrollY+400);
    dateTxt.setPosition(this.cameras.main.scrollX+800, this.cameras.main.scrollY+550);
    bossText.setPosition(boss.x, boss.y - 80);
    lvText.setPosition(this.cameras.main.scrollX+600, this.cameras.main.scrollY);
    desfribilador[0].setPosition(this.cameras.main.scrollX + 210, this.cameras.main.scrollY + 50);
    desfribilador[1].setPosition(this.cameras.main.scrollX + 180, this.cameras.main.scrollY + 50);
    desfribilador[2].setPosition(this.cameras.main.scrollX + 150, this.cameras.main.scrollY + 50);


    let distance = Phaser.Math.Distance.Between(player.x, player.y, charImage.x, charImage.y);
    let opacity = Phaser.Math.Clamp(distance/100, 0.1, 1);
    charImage.setAlpha(opacity); 

    if (specialObj && specialObj.active && botiquinText && botiquinText.active) { // Verifica si ambos objetos están activos
        botiquinText.setPosition(specialObj.x, specialObj.y - 20);
    }

    zombies.children.iterate(function(zombie) {
        moveZombies(zombie);
    });

    if(boss){
        if (boss.body.blocked.right) {
            boss.setVelocityX(-250); // Cambia la dirección a la izquierda
        } else if (boss.body.blocked.left) {
            boss.setVelocityX(250); // Cambia la dirección a la derecha
        }
    }
}

function collectStar (player, gasoline) {
    gasoline.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
    gas.setVolume(0.4);
    gas.play();

    if (gasolines.countActive(true) === 0) {
        lvCompleteTxt = this.add.text(2250, 500, 'Continuar [N]', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);
        lvCompleteTxt = this.add.text(2250, 550, '-->', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);
    }
}

// function collectStar2 (player, gasoline) {
//     gasoline.disableBody(true, true);
//     score += 10;
//     scoreText.setText('Score: ' + score);
//     gas.setVolume(0.4);
//     gas.play();
// }


function collectSpecialObj(player, botiquin) {
    score += 500; 
    scoreText.setText('Score: ' + score);
    health = 100;
    updateHealthBar();
    healthText.setText(health + '%');

    boti.setVolume(0.5);
    boti.play();

    if (botiquin) {
        botiquin.destroy();
    }
    if (botiquinText && botiquinText.active) { 
        botiquinText.destroy();
        botiquinText = null;
    }
}

function hitByZombie(player, zombie){
    if (!immune) { 
        health -= damage;
        health = Math.max(health, 0);
        updateHealthBar();
        healthText.setText(health + '%');

        immune = true;
        hit.setVolume(0.7);
        hit.play();

        setTimeout(() => {
            immune = false;
        }, 500);

        if (health <= 0) {
            lives--;
            if (lives > 0) {
                resetLevel();
            } else {
                livesText.setText('Lives: ');
                this.physics.pause();
                player.setTint(0xff0000);
                charImage.setTint(0xff0000);
                player.anims.play('turn');
                gameOver = true;
                healthBar.clear();
            }
        }
    }
    updateDesfribiladores();
}

function hitByBoss(player, boss){
    if (!immune) { 
        health -= damage*3;
        health = Math.max(health, 0);
        updateHealthBar();
        healthText.setText(health + '%');

        immune = true;
        hit.setVolume(0.9);
        hit.play();

        setTimeout(() => {
            immune = false;
        }, 500);

        if (health <= 0) {
            lives--;
            if (lives > 0) {
                resetLevel();
            } else {
                livesText.setText('Lives: ');
                this.physics.pause();
                player.setTint(0xff0000);
                charImage.setTint(0xff0000);
                player.anims.play('turn');
                gameOver = true;
                healthBar.clear();
            }
        }
    }
    updateDesfribiladores();
}

function hitZombie(bullet, zombie) {
    bullet.destroy(); 
    zombie.destroy();

    // Incrementar el puntaje
    score += 50;
    scoreText.setText('Score: ' + score);
}

function hitBoss(bullet, boss) {

    if (bossHealth > 0) {
        bossHealth -= bossDamage;
        bossText.setText(`Vida: ${bossHealth}`);

        if (bossHealth <= 0) {
            boss.setVisible(false);
            boss.destroy(); 
            score += 1000; 
            scoreText.setText('Score: ' + score);

            let user = JSON.parse(localStorage.getItem(`superviviente ${survivor}`));

            if (user.puntuacion < score) {
                localStorage.setItem(`superviviente ${survivor}`, JSON.stringify({
                    jugador: survivor,
                    puntuacion: score,
                    fecha: getActualDate()
                }));
            }
            this.scene.start("sceneWinner");
        }
    }
}

function hitBomb (player, bomb) {
    health -= damage;
    health = Math.max(health, 0);
    updateHealthBar();
    healthText.setText(health + '%');

    if (health <= 0) {
        lives--;

        if (lives > 0) {
            resetLevel();
        } else {
            livesText.setText('Lives: ');
            this.physics.pause(); 
            player.setTint(0xff0000);
            charImage.setTint(0xff0000); 
            player.anims.play('turn');
            gameOver = true; 
            healthBar.clear();
        }
    }
    updateDesfribiladores();
}

function resetLevel() {
    score = Math.floor(score / 2);
    health = 100;
    healthText.setText(health + '%');
    updateHealthBar();
    player.setPosition(100, 450);

    scoreText.setText('Score: ' + score);
    livesText.setText('Lives: ');

    try{
        gasolines.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });
    }catch(e){}

    zombies.clear(true, true);
    for (let i = 0; i < contZombi; i++) { // Cambia el número de zombies según sea necesario
        let xPosition = Phaser.Math.Between(300, 2300); // Generar una posición aleatoria en el rango del mapa
        let yPosition = Phaser.Math.Between(50, 400); // Generar una altura aleatoria para los zombies
        let zombie = zombies.create(xPosition, yPosition, `zombie${(i % 3) + 1}`); // Alternar entre los tipos de zombies
        zombie.setBounce(0.1);
        zombie.setCollideWorldBounds(true);
        zombie.setVelocityX((i % 2 === 0 ? 50 : -50)); // Alternar dirección
        zombie.anims.play(`walkZombie${(i % 3) + 1}`, true); // Reproducir la animación de caminar
    }
    updateDesfribiladores();

    if (lvCompleteTxt) {
        lvCompleteTxt.destroy();
        lvCompleteTxt = null;
    }

    try{
        bossHealth = 100;
        bossText.setText(`Vida: ${bossHealth}`);
    }catch(e){};
}


function updateHealthBar() {
    healthBar.clear();
    healthBar.fillStyle(0x00ff80, 1);
    healthBar.fillRect(16, 50, health * 2, 20);
}

function updateDesfribiladores() {
    for (let i = 0; i < 3; i++){
        desfribilador[i].setVisible(false);
    }
    for (let i = 2; i >= 3 - lives; i--){
        desfribilador[i].setVisible(true);
    }
}

function shootBullet() {
    if (bullets.getLength() < bullets.maxSize) {
        let bullet = bullets.get();

        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.setPosition(player.x, player.y);
            
            // Determinar la dirección del disparo
            let direction = player.body.velocity.x >= 0 ? 1 : -1;
            bullet.setVelocityX(2000 * direction); 
            bullet.setVelocityY(-150);

            bullet.lifetime = 0; 
            bullet.maxLifetime = 300 / 300;
            bullet.setData('lifetime', bullet.maxLifetime);
            shot.setVolume(0.1);
            shot.play();
        }
        shooting = false;
        setTimeout(() => {
            shooting = true;
        }, 500);
    }
}

function moveZombies(zombie) {
    if (zombie.body.velocity.x >= 0) {
        zombie.setScale(1, 1); 
        zombie.anims.play(`walkZombie${zombie.texture.key.charAt(zombie.texture.key.length - 1)}`, true);
    } else if (zombie.body.velocity.x < 0) {
        zombie.setScale(-1, 1); 
        zombie.anims.play(`walkZombie${zombie.texture.key.charAt(zombie.texture.key.length - 1)}`, true);
    }

    if (zombie.body.blocked.right) {
        zombie.setVelocityX(-Math.abs(zombie.body.velocity.x));
        zombie.setVelocityX(-50);
    } else if (zombie.body.blocked.left) {
        zombie.setVelocityX(Math.abs(zombie.body.velocity.x));
        zombie.setVelocityX(50);
    }
}



const alias = {
    key: "alias",

    preload: function() {
        this.load.audio('type', 'public/assets/audio/typeSound.mp3');
        this.load.audio('startSFX', 'public/assets/audio/startSFX.mp3');
        this.load.audio('backSound', 'public/assets/audio/backSound.mp3');
    },

    create: function() {
        this.textInput = '';
        this.add.text(250, 100, 'Soy: ', { fontSize: '32px', fill: '#ffffff', fontFamily: "Future Rot" });
        this.displayText = this.add.text(340, 100, '_', { fontSize: '32px', fill: '#ffffff', fontFamily: "Future Rot" });
        this.typeSound = this.sound.add('type');
        this.backSFX = this.sound.add('backSound');

        this.returnToMain = () => {
            window.location.href = "/menu";
        }

        let back = this.add.text(25, 25, 'Regresar', {
            fontSize: '36px',
            fill: '#005500',
            fontFamily: "Future Rot" })
            .setPadding(10)
            .setInteractive();

        back.on('pointerdown', () => {
            this.backSFX.play();
            
            this.backSFX.once('complete', () => {
                this.returnToMain();
            });
        });

        const keys = [
            'QWERTYUIOP',
            'ASDFGHJKLÑ',
            'ZXCVBNM_'
        ];

        let keySize = 50;
        let keyPadding = 10;
        let totalKeyWidth = keys[0].length * keySize + (keys[0].length - 1) * keyPadding;
        let startX = (this.cameras.main.width - totalKeyWidth) / 2;
        let startY = 150;

        this.input.enabled = true;

        this.keyPressed = (letter) => {
            if (this.textInput.length < 8) {
                this.textInput += letter;
                this.displayText.setText(this.textInput);
                this.typeSound.play();
            }
        };

        this.keyBackSpace = () => {
            this.textInput = this.textInput.slice(0, -1);
            this.displayText.setText(this.textInput || '_');
            this.typeSound.play();
        }

        let backSpaceKey = this.add.text(startX + totalKeyWidth + 20, startY, '⌫', {
            fontSize: '32px', 
            fill: '#ffffff', 
            backgroundColor: '#444', 
            fontFamily: "Future Rot" })
            .setPadding(10)
            .setInteractive();

        backSpaceKey.on('pointerdown', () => {
            this.keyBackSpace();
        });

        keys.forEach((row, rowIndex) => {
            row.split('').forEach((letter, colIndex) => {
                let x = startX + colIndex * (keySize + keyPadding) + (rowIndex * 25);
                let y = startY + rowIndex * (keySize + keyPadding);
                let key = this.add.text(x, y, letter, { fontSize: '32px', fill: '#ffffff', backgroundColor: '#444', fontFamily: "Future Rot" })
                    .setPadding(10)
                    .setInteractive();

                key.on('pointerdown', () => {
                    this.keyPressed(letter);
                });
            });
        });

        let listoY = startY + keys.length * (keySize + 20);

        this.add.text(totalKeyWidth - 115, listoY - 20, '(Haz click sobre la tecla)', { fontSize: '16px', fill: '#ffffff', fontFamily: "Future Rot" });

        let listoButton = this.add.text(totalKeyWidth - 80, listoY + 20, 'Empezar', {
            fontSize: '32px',
            fill: '#ffffff',
            backgroundColor: '#990000',
            align: 'center',
            fontFamily: "Future Rot"
        })
            .setPadding(10)
            .setInteractive();

        listoButton.on('pointerdown', () => {
            if (this.textInput.length >= 4) {
                //Guardar el nombre en el Local Storage
                survivor = this.textInput;
                if (!localStorage.getItem(`superviviente ${survivor}`)) {
                    localStorage.setItem(`superviviente ${survivor}`, JSON.stringify({
                        jugador: survivor,
                        puntuacion: 0,
                        fecha: getActualDate()})); //Crearlo si no existe
                }
                this.sound.add('startSFX').play();
                this.scene.start("seleccion");
            }
        });
    }
};

const seleccion = {
    key: 'seleccion',

    preload: function() {
        this.load.image('imgBg', '../../public/assets/mapa1.jpg')
        this.load.image('imgBg', '../../public/assets/mapa1.jpg')
        this.load.image('character1', '../../public/assets/diego.jpg');
        this.load.image('character2', '../../public/assets/dany.jpg');
        this.load.image('character3', '../../public/assets/dan.jpg');

        this.load.spritesheet('sprite1', 'public/assets/diegoSprite.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('sprite2', 'public/assets/danySprite.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('sprite3', 'public/assets/danSprite.png', { frameWidth: 32, frameHeight: 48 });

        this.load.audio('music', 'public/assets/audio/missionstart.mp3');
        this.load.audio('startSFX', 'public/assets/audio/startSFX.mp3');
    },

    create: function() {
        const audio = document.getElementById('bgMusic');

        const newSource = document.createElement('source');
        newSource.src = 'public/assets/audio/missionstart.mp3';
        newSource.type = 'audio/wav';

        audio.innerHTML = '';

        audio.appendChild(newSource);
        audio.load();
        audio.play();
        document.getElementById('playPauseBtn').textContent = "⏸️ Pausar";

        const spritesChars = {
            'character1': 'sprite1',
            'character2': 'sprite2',
            'character3': 'sprite3'
        };

        const nombres = {
            'character1': "Diego A.",
            'character2': "A. Dany",
            'character3': "E. Dan"
        }

        this.add.text(50, 20, 'Campaña', { fontSize: '48px', fill: '#fff' });
        this.add.text(50, 75, 'Ciudad destruida', { fontSize: '24px', fill: '#fff' });
        
        this.add.image(380, 100, 'imgBg').setDisplaySize(150, 150);
        this.add.text(50, 200, 'Personajes Seleccionables', { fontSize: '20px', fill: '#fff' });
        
        let character1 = this.add.image(120, 300, 'character1').setDisplaySize(120, 120).setInteractive();
        let character2 = this.add.image(260, 300, 'character2').setDisplaySize(120, 120).setInteractive();
        let character3 = this.add.image(400, 300, 'character3').setDisplaySize(120, 120).setInteractive();

        character1.originalX = character1.x;
        character1.originalY = character1.y;

        character2.originalX = character2.x;
        character2.originalY = character2.y;
        
        character3.originalX = character3.x;
        character3.originalY = character3.y;

        this.input.setDraggable(character1);
        this.input.setDraggable(character2);
        this.input.setDraggable(character3);
        
        this.add.text(50, 450, `Protagonizada por ${survivor}`, { fontSize: '24px', fill: '#fff' });

        this.add.text(800, 100, '¿Quién soy? (Arrastrame)', { fontSize: '20px', fill: '#fff' });
        
        let dropZone = this.add.zone(950, 250, 227, 222, 0x808080)
                        .setRectangleDropZone(227, 222)
                        .setName("dropZone");

        let dropZoneOutline = this.add.graphics();
        dropZoneOutline.lineStyle(2, 0x990000);
        dropZoneOutline.strokeRect(dropZone.x - 113, dropZone.y - 111, 227, 222);
        
        let selectedCharacter = null;
        let selectedGameCharacter = null;
        let selectedSprite = null;
        let texto = null;

        let startButton = this.add.text(500, 500, 'Empezar', { fontSize: '48px', fill: '#888' })
            .setInteractive()
            .setAlpha(0.5);
        
        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setTint(0xaaaaaa);
        });
        
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
        
        this.input.on('dragend', (pointer, gameObject) => {
            gameObject.clearTint();

            if (gameObject !== selectedGameCharacter) {
                gameObject.x = gameObject.originalX;
                gameObject.y = gameObject.originalY;
            }
        });
        
        this.input.on('drop', (pointer, gameObject, dropZone) => {
            if (selectedGameCharacter) {
                selectedGameCharacter.setDisplaySize(120, 120);
                selectedGameCharacter.x = selectedGameCharacter.originalX;
                selectedGameCharacter.y = selectedGameCharacter.originalY;
                texto.destroy();
            }
            
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;

            selectedCharacter = gameObject.texture.key;
            selectedSprite = spritesChars[selectedCharacter];
            selectedGameCharacter = gameObject;
            selectedGameCharacter.setDisplaySize(220, 220);
            startButton.setAlpha(1).setFill('#990000');

            texto = this.add.text(380 + (survivor.length - 4) * 5, 450, `en el papel de ${nombres[selectedCharacter]}`, { fontSize: '24px', fill: '#990000' });
        });
        
        
        startButton.on('pointerdown', () => {
            if (selectedCharacter) {
                this.sound.add('startSFX').play();
                this.scene.start("gameplay", {
                    selectedCharacter: selectedCharacter,
                    selectedSprite: selectedSprite
                });
            }
        });
    }
};

const sceneGameOver = {
    key: "sceneGameOver",

    preload() {
        this.load.image("background", "public/assets/fondo-game-over.jpg");
        this.load.image("logo", "public/assets/titulo.webp");
    },
    
    create() {
        // Obtener el ancho y alto de la pantalla
        const { width, height } = this.cameras.main;

        const audio = document.getElementById('bgMusic');

        const newSource = document.createElement('source');
        newSource.src = 'public/assets/audio/Game Over Laugh.mp3';
        newSource.type = 'audio/wav';
        audio.innerHTML = '';

        audio.appendChild(newSource);
        audio.load();
        audio.play();
        document.getElementById('playPauseBtn').textContent = "⏸️ Pausar";

        this.add.image(600, 300, "background").setScale(2);
        this.add.image(900, 100, "logo").setScale(1);
        

        // Mostrar mensaje de Game Over
        this.add.text(width / 2, height / 2 - 50, 'GAME OVER', {
            fontFamily: "Future Rot",
            fontSize: '64px',
            fill: '#ff0000'
        }).setOrigin(0.5);

        // Botón para reiniciar el juego
        const restartButton = this.add.text(width / 2, height / 2 + 50, 'Volver al Menu', {
            fontFamily: "Future Rot",
            fontSize: '32px',
            fill: '#ffffff',
            backgroundColor: '#000000'
        }).setOrigin(0.5)
          .setPadding(10)
          .setInteractive();

        restartButton.on('pointerdown', () => {
            window.location.href = '/menu';
        });
    }
    
}

const sceneWinner = {
    key: "sceneWinner",

    preload() {
        this.load.image("background", "public/assets/fondo-victoria.jpg");
        this.load.image("logo", "public/assets/titulo.webp");
    },
    
    create() {
        // Obtener el ancho y alto de la pantalla
        const { width, height } = this.cameras.main;

        const audio = document.getElementById('bgMusic');

        const newSource = document.createElement('source');
        newSource.src = 'public/assets/audio/monsters within.mp3';
        newSource.type = 'audio/wav';
        audio.innerHTML = '';

        audio.appendChild(newSource);
        audio.load();
        audio.play();
        document.getElementById('playPauseBtn').textContent = "⏸️ Pausar";

        this.add.image(600, 300, "background").setScale(2);
        this.add.image(900, 100, "logo").setScale(1);


        this.add.image(600, 300, "background").setScale(1);
        this.add.image(900, 100, "logo").setScale(1);
        

        // Mostrar mensaje de Game Over
        this.add.text(width / 2, height / 2 - 50, `¡GANASTE ${survivor}!`, {
            fontFamily: "Future Rot",
            fontSize: '64px',
            fill: 'white'
        }).setOrigin(0.5);


        this.add.text(width / 2, height / 2, `Puntaje Obtenido: ${score} puntos`, {
            fontFamily: "Future Rot",
            fontSize: '24px',
            fill: 'white'
        }).setOrigin(0.5);

        // Botón para reiniciar el juego
        const restartButton = this.add.text(width / 2, height / 2 + 60, 'Volver al Menu', {
            fontFamily: "Future Rot",
            fontSize: '32px',
            fill: '#ffffff',
            backgroundColor: '#000000'
        }).setOrigin(0.5)
          .setPadding(10)
          .setInteractive();

        restartButton.on('pointerdown', () => {
            window.location.href = '/menu';
        });
    }
    
}

let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [alias, seleccion, gameplay, gameplay2, sceneGameOver, sceneWinner]
};

newFont.load().then((loadedFont) => {
    document.fonts.add(loadedFont);
    console.log('Fuente cargada');
    
}).catch((error) => {
    console.error('Error al cargar la fuente:', error);
});

let game = new Phaser.Game(config);

game.events.on('boot', function(){
    let gameContainer = document.querySelector('.game');
    gameContainer.appendChild(game.canvas);
    console.log(game.canvas);
});