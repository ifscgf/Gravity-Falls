import { cena0 } from "./cena0.js";

var cena2 = new Phaser.scene("cena2");

cena2.preload = function () {
  this.load.image("final", "assets/cena2.png");
  this.load.image("voltar", "assets/voltar.png");
};

cena2.create = function () {
  this.add.image(840, 368, "final");
  var button = this.add.image(900, 904, "voltar").setInteractive();

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
