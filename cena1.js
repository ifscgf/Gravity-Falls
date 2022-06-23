import { cena2 } from "./cena2.js";
import { cena3 } from "./cena3.js";

var cena1 = new Phaser.Scene("Cena 1");

var player1;
var player2;
var casa;
var key;
var key1;
var key2;
var key3;
var key4;
var saida;
var coleta;
var musicagameplay;
var cursors;
var timer;
var timedEvent;
var timerText;
var inventoryText;
var inventory = 0;
var inventoryText2;
var inventory2 = 0;
var jogador;
var socket;
var ice_servers = {
  iceServers: [
    {
      urls: "stun:ifsc.cloud",
    },
    {
      urls: "turns:ifsc.cloud",
      username: "etorresini",
      credential: "matrix",
    },
  ],
};
var localConnection;
var remoteConnection;
var midias;
const audio = document.querySelector("audio");
var sala;

cena1.preload = function () {
  // música ambiente
  this.load.audio("musicagameplay", "./sounds/musicagameplay.mp3");

  // tilesets e mapa
  this.load.image("fullscreen", "./assets/fullscreen.png");
  this.load.image("tilesets1", "./assets/tilesets1.png");
  this.load.image("tilesets2", "./assets/tilesets2.png");
  this.load.image("casa", "./assets/casa.png");
  this.load.tilemapTiledJSON("mapa", "./assets/labirinto.json");
  this.load.audio("coleta", "./sounds/coleta.mp3");

  //casa
  this.load.image("casa", "./assets/casa.png", {
    frameWidth: 32,
    frameHeight: 32,
  });

  // personagens
  this.load.spritesheet("player1", "./assets/sprite1.png", {
    frameWidth: 32,
    frameHeight: 32,
  });

  this.load.spritesheet("player2", "./assets/sprite2.png", {
    frameWidth: 15,
    frameHeight: 16,
  });

  //saída
  this.load.spritesheet("saida", "./assets/saida.png", {
    frameWidth: 19,
    frameHeight: 18,
  });

  //itens
  this.load.spritesheet("key", "./assets/livro.png", {
    frameWidth: 1000,
    frameHeight: 1000,
  });

  this.load.spritesheet("key1", "./assets/livro.png", {
    frameWidth: 1000,
    frameHeight: 1000,
  });

  this.load.spritesheet("key2", "./assets/livro.png", {
    frameWidth: 1000,
    frameHeight: 1000,
  });

  this.load.spritesheet("key3", "./assets/livro.png", {
    frameWidth: 1000,
    frameHeight: 1000,
  });

  this.load.spritesheet("key4", "./assets/livro.png", {
    frameWidth: 1000,
    frameHeight: 1000,
  });
};

//música de fundo
cena1.create = function () {
  timer = -1;

  musicagameplay = this.sound.add("musicagameplay");
  coleta = this.sound.add("coleta");

  musicagameplay.play();
  musicagameplay.setLoop(true);

  // mapa
  const map = this.make.tilemap({ key: "mapa" });

  const tileset = map.addTilesetImage("assets", "tilesets1");
  const tileset2 = map.addTilesetImage("assets2", "tilesets2");

  // camadas
  const belowLayer1 = map.createLayer("belowlayer1", tileset, 0, 0);
  const belowLayer2 = map.createLayer("belowlayer2", tileset2, 0, 0);
  const worldLayer = map.createLayer("worldlayer", tileset2, 0, 0);

  // colisão com camadas
  worldLayer.setCollisionByProperty({ collides: true });

  //casa
  casa = this.physics.add.sprite(750, 700, "casa", 0).setScale(0.06);
  casa.body.setImmovable(true);

  // Botão de ativar/desativar tela cheia
  var button = this.add
    .image(800 - 16, 16, "fullscreen", 0)
    .setOrigin(1, 0)
    .setInteractive();

  // Ao clicar no botão de tela cheia
  button.on(
    "pointerup",
    function () {
      if (this.scale.isFullscreen) {
        button.setFrame(0);
        this.scale.stopFullscreen();
      } else {
        button.setFrame(1);
        this.scale.startFullscreen();
      }
    },
    this
  );

  // Tecla "F" também ativa/desativa tela cheia
  var FKey = this.input.keyboard.addKey("F");
  FKey.on(
    "down",
    function () {
      if (this.scale.isFullscreen) {
        button.setFrame(0);
        this.scale.stopFullscreen();
      } else {
        button.setFrame(1);
        this.scale.startFullscreen();
      }
    },
    this
  );

  //chaves
  key = this.physics.add.sprite(718, 400, "key").setScale(0.01);
  key1 = this.physics.add.sprite(46, 752, "key1").setScale(0.01);
  key2 = this.physics.add.sprite(494, 208, "key2").setScale(0.01);
  key3 = this.physics.add.sprite(654, 272, "key3").setScale(0.01);
  key4 = this.physics.add.sprite(686, 48, "key4").setScale(0.01);

  //bandeiras
  saida = this.physics.add.sprite(400, 10, "saida");

  // spawn
  player1 = this.physics.add.sprite(400, 768, "player1", 0).setScale(0.3);
  player2 = this.physics.add.sprite(752, 48, "player2", 0);

  //coletar chaves
  this.physics.add.overlap(player1, key, collectKey, null, this);
  this.physics.add.overlap(player1, key1, collectKey, null, this);
  this.physics.add.overlap(player1, key2, collectKey, null, this);
  this.physics.add.overlap(player1, key3, collectKey, null, this);
  this.physics.add.overlap(player1, key4, collectKey, null, this);
  this.physics.add.overlap(player1, player2, hitplayer, null, this);
  this.physics.add.overlap(player1, saida, touchSaida, null, this);

  //frames das animações jogador 1
  this.anims.create({
    key: "left1",
    frames: this.anims.generateFrameNumbers("player1", {
      frames: [6, 7],
    }),
    frameRate: 7,
    repeat: -1,
  });

  this.anims.create({
    key: "right1",
    frames: this.anims.generateFrameNumbers("player1", {
      frames: [3, 4],
    }),
    frameRate: 7,
    repeat: -1,
  });

  this.anims.create({
    key: "stopped1",
    frames: this.anims.generateFrameNumbers("player1", {
      frames: [1, 2, 8],
    }),
    frameRate: 3,
    repeat: -1,
  });

  this.anims.create({
    key: "up1",
    frames: this.anims.generateFrameNumbers("player1", {
      frames: [9, 11],
    }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: "down1",
    frames: this.anims.generateFrameNumbers("player1", {
      frames: [0, 5],
    }),
    frameRate: 7,
    repeat: -1,
  });

  //frames das animações jogador 2
  this.anims.create({
    key: "left2",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 3,
      end: 5,
    }),
    frameRate: 7,
    repeat: -1,
  });

  this.anims.create({
    key: "right2",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 6,
      end: 8,
    }),
    frameRate: 7,
    repeat: -1,
  });

  this.anims.create({
    key: "stopped2",
    frames: this.anims.generateFrameNumbers("player2", {
      frames: [2],
    }),
    frameRate: 3,
    repeat: -1,
  });

  this.anims.create({
    key: "up2",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 9,
      end: 11,
    }),
    frameRate: 7,
    repeat: -1,
  });

  this.anims.create({
    key: "down2",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 0,
      end: 2,
    }),
    frameRate: 7,
    repeat: -1,
  });

  // Direcionais
  cursors = this.input.keyboard.createCursorKeys();

  // Contador na tela
  timerText = this.add.text(16, 16, "150", {
    fontSize: "32px",
    fill: "#fff",
  });

  // Conectar no servidor via WebSocket
  socket = io("https://hidden-brook-30522.herokuapp.com/");
  var textMsg = this.add.text(10, 10, "Sala para entrar:", {
    font: "32px Courier",
    fill: "#ffffff",
  });

  var textEntry = this.add.text(10, 50, "", {
    font: "32px Courier",
    fill: "#ffff00",
  });

  this.input.keyboard.on("keydown", function (event) {
    if (event.keyCode === 8 && textEntry.text.length > 0) {
      textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
    } else if (
      event.keyCode === 32 ||
      (event.keyCode >= 48 && event.keyCode < 90)
    ) {
      textEntry.text += event.key;
    } else if (event.keyCode === 13) {
      sala = textEntry.text;
      console.log("Pedido de entrada na sala %s.", sala);
      socket.emit("entrar-na-sala", sala);
      textMsg.destroy();
      textEntry.destroy();
    }
  });

  // Disparar evento quando jogador entrar na partida
  var physics = this.physics;
  var cameras = this.cameras;
  var time = this.time;
  var add = this.add;

  inventoryText = add.text(768, 758, "0", {
    fontSize: "32px",
    fill: "#fff",
  });

  inventoryText.setScrollFactor(0);

  inventoryText2 = add.text(768, 16, "0", {
    fontSize: "32px",
    fill: "#fff",
  });

  socket.on("jogadores", function (jogadores) {
    if (jogadores.primeiro === socket.id) {
      // Define jogador como o primeiro
      jogador = 1;

      // Personagens colidem com os limites da cena
      player1.setCollideWorldBounds(true);

      //personagens colidem entre si
      physics.add.collider(player1, player2, null, null, this);

      // Colisão com camadas 1
      physics.add.collider(player1, worldLayer, null, null, this);

      // Câmera seguindo o personagem 1
      cameras.main.startFollow(player1);

      cameras.main.setZoom(8);

      cameras.main.setBounds(0, 0, 800, 800);

      // Colisão com casa
      physics.add.collider(player1, casa, null, null, this);
    } else if (jogadores.segundo === socket.id) {
      // Define jogador como o segundo
      jogador = 2;

      // Personagens colidem com os limites da cena
      player2.setCollideWorldBounds(true);

      // Colisão com camadas 2
      physics.add.collider(player2, worldLayer, null, null, this);

      // Colisão com casa
      physics.add.collider(player2, casa, null, null, this);
    }

    // Os dois jogadores estão conectados
    console.log(jogadores);
    if (jogadores.primeiro !== undefined && jogadores.segundo !== undefined) {
      // Contagem regressiva em segundos (1.000 milissegundos)
      timer = 300;
      timedEvent = time.addEvent({
        delay: 1000,
        callback: countdown,
        callbackScope: this,
        loop: true,
      });
    }
  });

  socket.on("offer", (socketId, description) => {
    remoteConnection = new RTCPeerConnection(ice_servers);
    midias
      .getTracks()
      .forEach((track) => remoteConnection.addTrack(track, midias));
    remoteConnection.onicecandidate = ({ candidate }) => {
      candidate && socket.emit("candidate", sala, candidate);
    };
    remoteConnection.ontrack = ({ streams: [midias] }) => {
      audio.srcObject = midias;
    };
    remoteConnection
      .setRemoteDescription(description)
      .then(() => remoteConnection.createAnswer())
      .then((answer) => remoteConnection.setLocalDescription(answer))
      .then(() => {
        socket.emit("answer", sala, remoteConnection.localDescription);
      });
  });

  socket.on("answer", (description) => {
    localConnection.setRemoteDescription(description);
  });

  socket.on("candidate", (candidate) => {
    const conn = localConnection || remoteConnection;
    conn.addIceCandidate(new RTCIceCandidate(candidate));
  });

  // Desenhar o outro jogador
  socket.on("desenharOutroJogador", ({ frame, x, y }) => {
    if (jogador === 1) {
      player2.setFrame(frame);
      player2.x = x + 8;
      player2.y = y + 7.5;
    } else if (jogador === 2) {
      player1.setFrame(frame);
      player1.x = x + 8;
      player1.y = y + 8;
    }
  });
};

cena1.update = function (time, delta) {
  //Sincronizar direcionais com movimentos
  if (jogador === 1 && timer >= 0) {
    if (cursors.left.isDown) {
      player1.body.setVelocityX(-150);
    } else if (cursors.right.isDown) {
      player1.body.setVelocityX(150);
    } else {
      player1.body.setVelocityX(0);
    }

    if (cursors.up.isDown) {
      player1.body.setVelocityY(-150);
    } else if (cursors.down.isDown) {
      player1.body.setVelocityY(150);
    } else {
      player1.body.setVelocityY(0);
    }

    if (cursors.left.isDown) {
      player1.anims.play("left1", true);
    } else if (cursors.right.isDown) {
      player1.anims.play("right1", true);
    } else if (cursors.up.isDown) {
      player1.anims.play("up1", true);
    } else if (cursors.down.isDown) {
      player1.anims.play("down1", true);
    } else {
      player1.anims.play("stopped1", true);
    }
    socket.emit("estadoDoJogador", sala, {
      frame: player1.anims.getFrameName(),
      x: player1.body.x,
      y: player1.body.y,
    });
  } else if (jogador === 2 && timer >= 0) {
    if (cursors.left.isDown) {
      player2.body.setVelocityX(-50);
    } else if (cursors.right.isDown) {
      player2.body.setVelocityX(50);
    } else {
      player2.body.setVelocityX(0);
    }

    if (cursors.up.isDown) {
      player2.body.setVelocityY(-50);
    } else if (cursors.down.isDown) {
      player2.body.setVelocityY(50);
    } else {
      player2.body.setVelocityY(0);
    }

    if (cursors.left.isDown) {
      player2.anims.play("left2", true);
    } else if (cursors.right.isDown) {
      player2.anims.play("right2", true);
    } else if (cursors.up.isDown) {
      player2.anims.play("up2", true);
    } else if (cursors.down.isDown) {
      player2.anims.play("down2", true);
    } else {
      player2.anims.play("stopped2", true);
    }

    socket.emit("estadoDoJogador", sala, {
      frame: player2.anims.getFrameName(),
      x: player2.body.x,
      y: player2.body.y,
    });
  }
};

//Condições vitória e derrota
function touchSaida(player1, saida) {
  if (inventory > 4 && timer > 0) {
    musicagameplay.stop();
    this.scene.start(cena3);
    this.scene.stop();
  } else if (timer === 0) {
    musicagameplay.stop();
    this.scene.start(cena2);
    this.scene.stop();
  }
}

function countdown() {
  //Contador decrementa em 1 segundo
  timer -= 1;
  timerText.setText(timer);
}

//Jogador 1 perde se encostar no Jogador 2
function hitplayer(player1, player2) {
  musicagameplay.stop();
  this.scene.start(cena2);
  this.scene.stop();
}

function collectKey(player1, key) {
  //chave some quando coletada
  key.disableBody(true, true);
  coleta.play();
  inventory += 1;
  inventoryText.setText(inventory);
}

export { cena1 };
