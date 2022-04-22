import { cena7 } from "./cena7.js";

var cena2 = new Phaser.scene("cena 2");

cena2.preload = function () {
  this.load.image("final", "assets/cena2.png");
  this.load.image("voltar", "assets/voltar.png");
};

cena2.create = function () {
  this.add.image(840, 368, "final");
  var button = this.add.image(900, 904, "voltar").setInteractive();

  button.on("pointerdown", function () {
    this.scene.start(cena1);
  });
};

cena2.update = function () {};

export { cena2 };
