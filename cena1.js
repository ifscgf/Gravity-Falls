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
var pointer;
var touchX;
var touchY;
var timedEvent;
var timer = -1;
var timerText;
var inventoryText;
var inventory = 0;
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
var botaoSala1;
var botaoSala2;
var botaoSala3;
var botaoSala4;
var botaoSala5;
var botaoSala6;
var cameras;
var camera0;

//Funções para mostrar as telas do jogo
function aparecerSalas() {
  botaoSala1.setVisible(false);
  botaoSala2.setVisible(false);
  botaoSala3.setVisible(false);
  botaoSala4.setVisible(false);
  botaoSala5.setVisible(false);
  botaoSala6.setVisible(false);
}

cena1.preload = function () {
  this.load.image("botaoSala", "./assets/play.png");

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

  // D-Pad
  this.load.spritesheet("esquerda", "assets/esquerda.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  this.load.spritesheet("direita", "assets/direita.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  this.load.spritesheet("cima", "assets/cima.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  this.load.spritesheet("baixo", "assets/baixo.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  this.load.spritesheet("esquerda1", "assets/esquerda.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  this.load.spritesheet("direita1", "assets/direita.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  this.load.spritesheet("cima1", "assets/cima.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  this.load.spritesheet("baixo1", "assets/baixo.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  this.load.image("switch", "./assets/switch.png");
};

//música de fundo
cena1.create = function () {
  timer = -1;

  musicagameplay = this.sound.add("musicagameplay");
  coleta = this.sound.add("coleta");

  musicagameplay.play();
  musicagameplay.setLoop(true);

  // imagem de fundo
  this.add.image(800, 400, "switch");

  // mapa
  const map = this.make.tilemap({ key: "mapa" });

  const tileset = map.addTilesetImage("assets", "tilesets1");
  const tileset2 = map.addTilesetImage("assets2", "tilesets2");

  // camadas
  const belowLayer1 = map.createLayer("belowlayer1", tileset, 400, 0);
  const belowLayer2 = map.createLayer("belowlayer2", tileset2, 400, 0);
  const worldLayer = map.createLayer("worldlayer", tileset2, 400, 0);

  // colisão com camadas
  worldLayer.setCollisionByProperty({ collides: true });

  //casa
  casa = this.physics.add.sprite(1050, 670, "casa", 0).setScale(0.06);
  casa.body.setImmovable(true);

  //chaves
  key = this.physics.add.sprite(1118, 450, "key").setScale(0.01);
  key1 = this.physics.add.sprite(446, 752, "key1").setScale(0.01);
  key2 = this.physics.add.sprite(550, 250, "key2").setScale(0.01);
  key3 = this.physics.add.sprite(900, 400, "key3").setScale(0.01);
  key4 = this.physics.add.sprite(1086, 48, "key4").setScale(0.01);

  //bandeiras
  saida = this.physics.add.sprite(800, 10, "saida");

  // spawn
  player1 = this.physics.add.sprite(1000, 670, "player1", 0).setScale(0.3);
  player2 = this.physics.add.sprite(570, 60, "player2", 0);

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

  // Interação por toque de tela (até 2 toques simultâneos 0 a 1)
  pointer = this.input.addPointer(1);

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

  //Criando os botões para escolher a sala
  botaoSala1 = this.add
    .image(290, 100, "botaoSala")
    .setInteractive()
    .setScale(0.2);
  botaoSala2 = this.add
    .image(290, 200, "botaoSala")
    .setInteractive()
    .setScale(0.2);
  botaoSala3 = this.add
    .image(290, 300, "botaoSala")
    .setInteractive()
    .setScale(0.2);
  botaoSala4 = this.add
    .image(290, 400, "botaoSala")
    .setInteractive()
    .setScale(0.2);
  botaoSala5 = this.add
    .image(290, 500, "botaoSala")
    .setInteractive()
    .setScale(0.2);
  botaoSala6 = this.add
    .image(290, 600, "botaoSala")
    .setInteractive()
    .setScale(0.2);

  //Quando clicar em cada botão, vai para uma sala específica
  botaoSala1.on("pointerdown", function () {
    sala = 1;
    console.log("Pedido de entrada na sala %s.", sala);
    socket.emit("entrar-na-sala", sala);
    botaoSala1.setVisible(false);
    botaoSala2.setVisible(false);
    botaoSala3.setVisible(false);
    botaoSala4.setVisible(false);
    botaoSala5.setVisible(false);
    botaoSala6.setVisible(false);
    textMsg.setVisible(false);
  });
  botaoSala2.on("pointerdown", function () {
    sala = 2;
    console.log("Pedido de entrada na sala %s.", sala);
    socket.emit("entrar-na-sala", sala);
    botaoSala1.setVisible(false);
    botaoSala2.setVisible(false);
    botaoSala3.setVisible(false);
    botaoSala4.setVisible(false);
    botaoSala5.setVisible(false);
    botaoSala6.setVisible(false);
    textMsg.setVisible(false);
  });
  botaoSala3.on("pointerdown", function () {
    sala = 3;
    console.log("Pedido de entrada na sala %s.", sala);
    socket.emit("entrar-na-sala", sala);
    botaoSala1.setVisible(false);
    botaoSala2.setVisible(false);
    botaoSala3.setVisible(false);
    botaoSala4.setVisible(false);
    botaoSala5.setVisible(false);
    botaoSala6.setVisible(false);
    textMsg.setVisible(false);
  });
  botaoSala4.on("pointerdown", function () {
    sala = 4;
    console.log("Pedido de entrada na sala %s.", sala);
    socket.emit("entrar-na-sala", sala);
    botaoSala1.setVisible(false);
    botaoSala2.setVisible(false);
    botaoSala3.setVisible(false);
    botaoSala4.setVisible(false);
    botaoSala5.setVisible(false);
    botaoSala6.setVisible(false);
    textMsg.setVisible(false);
  });
  botaoSala5.on("pointerdown", function () {
    sala = 5;
    console.log("Pedido de entrada na sala %s.", sala);
    socket.emit("entrar-na-sala", sala);
    botaoSala1.setVisible(false);
    botaoSala2.setVisible(false);
    botaoSala3.setVisible(false);
    botaoSala4.setVisible(false);
    botaoSala5.setVisible(false);
    botaoSala6.setVisible(false);
    textMsg.setVisible(false);
  });
  botaoSala6.on("pointerdown", function () {
    sala = 6;
    console.log("Pedido de entrada na sala %s.", sala);
    socket.emit("entrar-na-sala", sala);
    botaoSala1.setVisible(false);
    botaoSala2.setVisible(false);
    botaoSala3.setVisible(false);
    botaoSala4.setVisible(false);
    botaoSala5.setVisible(false);
    botaoSala6.setVisible(false);
    textMsg.setVisible(false);
  });

  // Disparar evento quando jogador entrar na partida
  var physics = this.physics;
  cameras = this.cameras;
  var time = this.time;
  var add = this.add;

  inventoryText = add.text(900, 758, "0", {
    fontSize: "32px",
    fill: "#fff",
  });

  var add = this.add;
  cameras.main.setBounds(0, 0, 1600, 800);
  camera0 = this.cameras.add(400, 0, 800, 800);
  camera0.scrollX = 400;
  camera0.scrollY = 0;
  
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
      camera0.setZoom(8);
      camera0.startFollow(player1);

      // D-Pad: Para cada direção já os eventos
      // para tocar a tela ("pointerover")
      // e ao terminar essa interação ("pointerout")
      var esquerda = add
        .image(400, 750, "esquerda", 0)
        .setInteractive()
        .setScale(0.3)
        .setScrollFactor(0);
      esquerda.on("pointerover", () => {
        if (timer > 0) {
          esquerda.setFrame(1);
          player1.setVelocityX(-130);
          player1.anims.play("left1", true);
        }
      });
      esquerda.on("pointerout", () => {
        if (timer > 0) {
          esquerda.setFrame(0);
          player1.setVelocityX(0);
          player1.anims.play("stopped1", true);
        }
      });
      direita.on("pointerover", () => {
        if (timer > 0) {
          direita.setFrame(1);
          player1.setVelocityX(130);
          player1.anims.play("left1", true);
        }
      });
      direita.on("pointerout", () => {
        if (timer > 0) {
          direita.setFrame(0);
          player1.setVelocityX(0);
          player1.anims.play("stopped1", true);
        }
      });
      cima.on("pointerover", () => {
        if (timer > 0) {
          cima.setFrame(1);
          player1.setVelocityY(-130);
          player1.anims.play("up1", true);
        }
      });
      cima.on("pointerout", () => {
        if (timer > 0) {
          cima.setFrame(0);
          player1.setVelocityY(0);
          player1.anims.play("stopped1", true);
        }
      });
      baixo.on("pointerover", () => {
        if (timer > 0) {
          baixo.setFrame(1);
          player1.setVelocityY(130);
          player1.anims.play("down1", true);
        }
      });
      baixo.on("pointerout", () => {
        if (timer > 0) {
          baixo.setFrame(0);
          player1.setVelocityY(0);
          player1.anims.play("stopped1", true);
        }
      });

      // Colisão com casa
      physics.add.collider(player1, casa, null, null, this);

      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          midias = stream;
        })
        .catch((error) => console.log(error));
    } else if (jogadores.segundo === socket.id) {
      // Define jogador como o segundo
      jogador = 2;

      // Personagens colidem com os limites da cena
      player2.setCollideWorldBounds(true);

      // Colisão com camadas 2
      physics.add.collider(player2, worldLayer, null, null, this);

      // Colisão com casa
      physics.add.collider(player2, casa, null, null, this);

      // D-Pad: Para cada direção já os eventos
      // para tocar a tela ("pointerover")
      // e ao terminar essa interação ("pointerout")
      var esquerda = add.image(50, 550, "esquerda", 0).setInteractive();
      esquerda.on("pointerover", () => {
        if (timer > 0) {
          esquerda.setFrame(1);
          player2.setVelocityX(-70);
          player2.anims.play("left2", true);
        }
      });
      esquerda.on("pointerout", () => {
        if (timer > 0) {
          esquerda.setFrame(0);
          player2.setVelocityX(0);
          player2.anims.play("stopped2", true);
        }
      });
      direita.on("pointerover", () => {
        if (timer > 0) {
          direita.setFrame(1);
          player2.setVelocityX(70);
          player2.anims.play("left2", true);
        }
      });
      direita.on("pointerout", () => {
        if (timer > 0) {
          direita.setFrame(0);
          player2.setVelocityX(0);
          player2.anims.play("stopped2", true);
        }
      });
      cima.on("pointerover", () => {
        if (timer > 0) {
          cima.setFrame(1);
          player2.setVelocityY(-70);
          player2.anims.play("up2", true);
        }
      });
      cima.on("pointerout", () => {
        if (timer > 0) {
          cima.setFrame(0);
          player2.setVelocityY(0);
          player2.anims.play("stopped2", true);
        }
      });
      baixo.on("pointerover", () => {
        if (timer > 0) {
          baixo.setFrame(1);
          player2.setVelocityY(70);
          player2.anims.play("down2", true);
        }
      });
      baixo.on("pointerout", () => {
        if (timer > 0) {
          baixo.setFrame(0);
          player2.setVelocityY(0);
          player2.anims.play("stopped2", true);
        }
      });

      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          midias = stream;
          localConnection = new RTCPeerConnection(ice_servers);
          midias
            .getTracks()
            .forEach((track) => localConnection.addTrack(track, midias));
          localConnection.onicecandidate = ({ candidate }) => {
            candidate && socket.emit("candidate", sala, candidate);
          };
          console.log(midias);
          localConnection.ontrack = ({ streams: [midias] }) => {
            audio.srcObject = midias;
          };
          localConnection
            .createOffer()
            .then((offer) => localConnection.setLocalDescription(offer))
            .then(() => {
              socket.emit("offer", sala, localConnection.localDescription);
            });
        })
        .catch((error) => console.log(error));
    }

    // Os dois jogadores estão conectados
    console.log(jogadores);
    if (jogadores.primeiro !== undefined && jogadores.segundo !== undefined) {
      // Contagem regressiva em segundos (1.000 milissegundos)
      timer = 150;
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

  // Botão de ativar/desativar tela cheia
  var button = this.add
    .image(1525 - 16, 16, "fullscreen", 0)
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
};

cena1.update = function (time, delta) {
  // Controle dos personagens por toque
  let frame;
  if (jogador === 1) {
    // Testa se há animação do oponente,
    // caso contrário envia o primeiro frame (0)
    try {
      frame = player1.anims.getFrameName();
    } catch (e) {
      frame = 0;
    }
    socket.emit("estadoDoJogador", sala, {
      frame: frame,
      x: player1.body.x,
      y: player1.body.y,
    });
  } else if (jogador === 2) {
    // Testa se há animação do oponente,
    // caso contrário envia o primeiro frame (0)
    try {
      frame = player2.anims.getFrameName();
    } catch (e) {
      frame = 0;
    }
    socket.emit("estadoDoJogador", sala, {
      frame: frame,
      x: player2.body.x,
      y: player2.body.y,
    });
  }
};

//Condições vitória e derrota
function touchSaida(player1, saida) {
  if (inventory > 4 && timer > 0) {
    musicagameplay.stop();
    this.scene.stop();
    this.scene.start(cena3);
  } else if (timer === 0) {
    musicagameplay.stop();
    this.scene.stop();
    this.scene.start(cena2);
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
  this.scene.stop();
  this.scene.start(cena2);
}

function collectKey(player1, key) {
  //chave some quando coletada
  key.disableBody(true, true);
  coleta.play();
  inventory += 1;
  inventoryText.setText(inventory);
}

export { cena1 };
