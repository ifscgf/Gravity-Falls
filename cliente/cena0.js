import { cena1 } from "./cena1.js";

//criar cena 0
var cena0 = new Phaser.Scene("cena0");
var abertura;

cena0.preload = function () {
  this.load.image("cena0", "assets/cena0.png");
  this.load.image("play", "assets/play.png");
  this.load.audio("openning", "assets/openning.mp3");
};

cena0.create = function () {
  abertura = this.sound.add("openning");
  abertura.play();
  abertura.setLoop(true);

  this.add.image(370, 300, "cena0").setScale(0.3);
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

cena0.updade = function () {};

export { cena0 };
