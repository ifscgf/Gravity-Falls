//import { cena2 } from "./cena2.js";

var cena7 = new Phaser.Scene("Cena 7");

var ice_servers = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};
var localConnection;
var remoteConnection;
var midias;
var timer;
var billcipher;
const audio = document.querySelector("audio");

cena7.preload = function () {
  // música ambiente
  //this.load.audio("ambiente", "./sounds/ambiente.mp3");

  // tilesets e mapa
  this.load.image("ground", "./assets/ground.jpg");

  this.load.spritesheet("billcipher", "./assets/billcipher.png", {
    frameWidth: 32,
    frameHeight: 32,
  });
};

cena7.create = function () {
  timer = -1;

  // mapa
  //const map = this.make.tilemap({ key: "mapa" });

  this.add.image(400, 400, "ground");

  //personagem Bill Cipher

  billcipher = this.physics.add.sprite(400, 300, "billcipher");

  this.anims.create({
    key: "left1",
    frames: this.anims.generateFrameNumbers("billcipher", {
      frames: [6, 7],
    }),
    frameRate: 7,
    repeat: -1,
  });

  this.anims.create({
    key: "right1",
    frames: this.anims.generateFrameNumbers("plbillcipher", {
      frames: [3, 4],
    }),
    frameRate: 7,
    repeat: -1,
  });

  this.anims.create({
    key: "stopped1",
    frames: this.anims.generateFrameNumbers("billcipher", {
      frames: [1, 2, 8],
    }),
    frameRate: 3,
    repeat: -1,
  });

  this.anims.create({
    key: "up1",
    frames: this.anims.generateFrameNumbers("billcipher", {
      frames: [9, 11],
    }),
    frameRate: 7,
    repeat: -1,
  });

  this.anims.create({
    key: "down1",
    frames: this.anims.generateFrameNumbers("billcipher", {
      frames: [0, 5],
    }),
    frameRate: 7,
    repeat: -1,
  });
};

cena7.update = function () {};

export { cena7 };
