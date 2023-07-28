let xBolinha = 300;
let yBolinha = 200;
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let diametro = 22;
let raio = diametro / 2;

let xRaquete;
let yRaquete;
let raqueteComprimento = 10;
let raqueteAltura = 90;

let xRaqueteInimigo;
let yRaqueteInimigo;
let velocidadeXInimigo = 6;

let pontos = 0;
let pontosInimigo = 0;

let trilhaSonora;
let somRaquetada;
let somGol;

function preload() {
    trilhaSonora = loadSound("trilha.mp3");
    somRaquetada = loadSound("raquetada.mp3");
    gol = loadSound("gol.mp3");
}

function setup() {
  createCanvas(600, 400);
  xRaquete = 5;
  yRaquete = 150;
  xRaqueteInimigo = 585;
  yRaqueteInimigo = 150;
  
  trilhaSonora.loop();
}

function draw() {
  background(0);
  noStroke();
  fill(255);
  
  verificaColisaoBorda();
  verificaColisaoRaquete();
  verificaColisaoRaqueteInimigo();
  mostraBolinha();
  mostraRaquete();
  mostraRaqueteInimigo();
  movimentaBolinha();
  movimentaRaqueteInimigo();
  incluiPlacar();
  movimentaMinhaRaquete(); 
}

function mostraBolinha(){
  ellipse(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}
  
function verificaColisaoBorda(){
  if (xBolinha - raio < 0 ||
    xBolinha + raio > width) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha - raio < 0 ||
    yBolinha + raio > height) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(){
  fill(255);
  noStroke();
  rect(xRaquete, yRaquete, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function movimentaRaqueteInimigo(){
  velocidadeYInimigo = yBolinha - yRaqueteInimigo - raqueteComprimento / 2 - 30 
  yRaqueteInimigo += velocidadeYInimigo + 40
}

function verificaColisaoRaquete(){
      // canto direito da bolinha com esquerdo da raquete
    // canto esquerdo da bolinha direito da raquete
  //topo da bolinha com a base da raquete
  //base da bolinha e topo da raquete
  if (xBolinha + raio > xRaquete &&
     xBolinha - raio <= xRaquete + raqueteComprimento &&
     yBolinha - raio < yRaquete + raqueteAltura &&
     yBolinha + raio > yRaquete) {
    somRaquetada.play();
    velocidadeXBolinha *= -1;
  
  } else if (xBolinha < 10) {
    pontosInimigo +=1;
    gol.play();
  }
}

function verificaColisaoRaqueteInimigo(){
  if (xBolinha + raio > xRaqueteInimigo &&
     xBolinha - raio <= xRaqueteInimigo + raqueteComprimento &&
     yBolinha - raio < yRaqueteInimigo + raqueteAltura &&
     yBolinha + raio > yRaqueteInimigo) {
    velocidadeXBolinha *= -1;
    somRaquetada.play();
  
  } else if (xBolinha > 590) {
    pontos += 1
    gol.play();
  }
}

function mostraRaqueteInimigo(){
  fill(255);
  noStroke();
  rect(xRaqueteInimigo, yRaqueteInimigo, raqueteComprimento, raqueteAltura);
}

function incluiPlacar(){
  strokeWeight(1);
  stroke(255);
  fill(color(255,140,0));
  rect(width / 2 - 42, 10, 40, 20);
  fill(255);
  textSize(18);
  textAlign(CENTER);
  text(pontos, 278, 26);
  strokeWeight(1);
  stroke(255);
  fill(color(255,140,0));
  rect(width / 2 + 2, 10, 40, 20);
  fill(255);
  textSize(18);
  textAlign(CENTER);
  text(pontosInimigo, 321, 26);
}
