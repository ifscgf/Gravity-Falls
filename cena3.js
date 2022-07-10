import { cena0 } from "./cena0.js";

var cena3 = new Phaser.Scene("Cena 3");
var encerramento

cena3.preload = function () {
  this.load.image("vitória", "./assets/cena3.png");
  this.load.image("menu", "./assets/menu.png");
  this.load.audio("encerramento", "./sounds/encerramento.mp3");
};

cena3.create = function () {
  encerramento = this.sound.add("encerramento");
  encerramento.play();
  encerramento.setLoop(true);
  
  this.add.image(800, 400, "vitória");
  var button = this.add.image(785, 700, "menu").setInteractive();

  button.on(
    "pointerdown",
    function () {
      this.scene.start(cena0);
      encerramento.stop();
    },
    this
  );
};

cena3.update = function () {};

export { cena3 };
