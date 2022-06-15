import { cena1 } from "./cena1.js";

var cena0 = new Phaser.Scene("Cena 0");
var abertura;

cena0.preload = function () {
  this.load.image("abertura", "./assets/cena0.png");
  this.load.image("play", "./assets/play.png");
  this.load.audio("abertura", "./sounds/abertura.mp3");
  this.load.image("stan", "./assets/stan.png");
};

cena0.create = function () {
  abertura = this.sound.add("abertura");
  abertura.play();
  abertura.setLoop(false);

  this.add.image(380, 300, "abertura").setScale(0.3);
  this.add.image(550, 610, "stan").setScale(0.4);
  var button = this.add.image(400, 630, "play").setInteractive().setScale(0.5);

  button.on(
    "pointerdown",
    function () {
      this.scene.start(cena1);
      abertura.stop();
    },
    this
  );
};

cena0.update = function () {};

export { cena0 };
