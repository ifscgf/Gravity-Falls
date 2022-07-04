import { cena0 } from "./cena0.js";
import { cena1 } from "./cena1.js";
import { cena2 } from "./cena2.js";
import { cena3 } from "./cena3.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 800,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "game-container",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 800,
  },
  scene: [cena0, cena1, cena2, cena3],
};

const game = new Phaser.Game(config);
