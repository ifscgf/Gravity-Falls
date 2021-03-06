import { cena0 } from "./cena0.js";

var cena2 = new Phaser.Scene("Cena 2");
var audiogameover

cena2.preload = function () {
  this.load.image("final", "./assets/cena2.png");
  this.load.image("voltar", "./assets/voltar.png");
  this.load.audio("audiogameover", "./sounds/audiogameover.mp3");
};

cena2.create = function () {
  audiogameover = this.sound.add("audiogameover");
  audiogameover.play();
  audiogameover.setLoop(false);
  
  this.add.image(800, 400, "final");
  var button = this.add.image(785, 700, "voltar").setInteractive();

  button.on(
    "pointerdown",
    function () {
      this.scene.start(cena0);
    },
    this
  );
};

cena2.update = function () {};

export { cena2 };
