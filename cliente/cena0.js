import { cena1 } from "./cena1.js";

var cena0 = new Phaser.Scene("Cena 0");
var abertura;

cena0.preload = function () {
  this.load.image("abertura", "assets/cena0.png");
  this.load.image("play", "assets/play.png");
  this.load.audio("abertura", "./sounds/abertura.mp3");
};

cena0.create = function () {
  abertura = this.sound.add("abertura");
  abertura.play();
  abertura.setLoop(true);

  this.add.image(400, 400, "abertura");
  var button = this.add.image(400, 730, "play").setInteractive();

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
