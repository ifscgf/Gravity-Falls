import { cena7 } from "./cena7.js";

//criar cena 1
var cena1 = new Phaser.Scene("cena1");
var abertura;

cena1.preload = function () {
  this.load.image("cena1", "assets/cena1.png");
  this.load.image("play", "assets/play.png");
  this.load.audio("openning", "assets/openning.mp3");
};

cena1.create = function () {
  abertura = this.sound.add("openning");
  abertura.play();
  abertura.setLoop(true);

  this.add.image(400, 400, "cena1");
  var button = this.add.image(400, 730, "play").setInteractive();

  button.on("pointerdown", function () {
    this.scene.start(cena7);
    abertura.stop();
  });
};

cena0.updade = function () {};

export { cena1 };
