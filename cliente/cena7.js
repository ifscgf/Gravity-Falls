import { cena2 } from "./cena2.js";

var cena7 = new Phaser.Scene("Cena 7");

var MabelPines;
var key;
var key1;
var key2;
var key3;
var key4;
var win1 = false;
var saída;
//var ambiente;
var cursors;
var timer;
var timedEvent;
var timerText;
var inventoryText;
var inventory = 0;
var inventoryText2;
var inventory2 = 0;
var jogador;
var ice_servers = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};
var localConnection;
var remoteConnection;
var midias;
const audio = document.querySelector("audio");

cena1.preload = function () {
  // música ambiente
  //this.load.audio("ambiente", "./sounds/ambiente.mp3");

  // tilesets e mapa
  this.load.image("ground", "./assets/ground.jpg");

  cena7.create = function () {
    timer = -1;
   
    // mapa
    const map = this.make.tilemap({ key: "mapa" });
  
    const tileset = map.addTilesetImage("assets", "ground");
  }
