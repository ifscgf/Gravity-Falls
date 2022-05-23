import { cena0 } from "./cena0.js";

var cena3 = new Phaser.Scene("Cena 3");

cena3.preload = function () {
  this.load.image("vitória", "./assets/cena3.png");
  this.load.image("menu", "./assets/menu.png");
  this.load.audio("encerramento", "./sounds/encerramento.mp3");
};

cena3.create = function () {
  this.add.image(400, 400, "vitória");

  encerramento = this.add.audio("encerramento");
  encerramento.play();
  encerramento.setloop(true);
  
  var button = this.add.image(385, 700, "menu").setInteractive();

  button.on(
    "pointerdown",
    function () {
      this.scene.start(cena0);
    },
    this
  );
};

cena3.update = function () {};

export { cena3 };
