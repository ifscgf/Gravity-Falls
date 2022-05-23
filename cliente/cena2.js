import { cena1 } from "./cena1.js";

var cena2 = new Phaser.Scene("Cena 2");

cena2.preload = function () {
  this.load.image("final", "./assets/cena2.png");
  this.load.image("voltar", "./assets/voltar.png");
  this.load.audio("audiogameover", "./sounds/audiogameover.mp3");
};

cena2.create = function () {
  this.add.image(400, 400, "final");
  
  audiogameover = this.sound.add("audiogameover");
  audiogameover.play();
  audiogameover.setLoop(false);
  
  var button = this.add.image(385, 700, "voltar").setInteractive();

  button.on(
    "pointerdown",
    function () {
      this.scene.start(cena1);
    },
    this
  );
};

cena2.update = function () {};

export { cena2 };
