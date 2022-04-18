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
};

cena7.update = function () {};

export { cena7 };
