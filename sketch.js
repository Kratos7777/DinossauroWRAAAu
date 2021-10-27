var JOGAR,ENCERRAR;
var estadoJogo;

var trex, trex_correndo, trex_colidiu;
var solo, soloinvisivel, imagemdosolo;
var nuvemzinha,nuvemzinhamexendo;
var Cerra,Cerrinha,Pilosocereus_magnificus,Cacto_Pera,Cacto_Pedra,Cacto_Macarrao,Cacto_Xiaomi;


var grupinhodecactos,grupinhodosmarshemlow;

var game_over,game_over_relampago_marquinhos;

var kill_the_hero,HOJE_TEM_GOL_DO_RIBAMITO;

var dieturetry;

var easportstchinag;

var zico;

var pontos = 0;

var guinnessbook = 0;

function preload(){
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_colidiu = loadImage("trex_collided.png");
  
  imagemdosolo = loadImage("ground2.png");
  
  Cerrinha = loadImage("obstacle1.png");
  Pilosocereus_magnificus = loadImage("obstacle2.png");
  Cacto_Pera = loadImage ("obstacle3.png");
  Cacto_Pedra = loadImage ("obstacle4.png");
  Cacto_Macarrao = loadImage("obstacle5.png");
  Cacto_Xiaomi = loadImage ("obstacle6.png");
  
  
  nuvemzinhamexendo = loadImage("cloud.png");
  
  game_over_relampago_marquinhos = loadImage ("gameOver.png");
  
  HOJE_TEM_GOL_DO_RIBAMITO = loadImage ("restart.png");
  
  dieturetry = loadSound ("die.mp3");
 
  easportstchinag = loadSound ("jump.mp3");
  
  zico = loadSound ("checkPoint.mp3");
}

function setup() {

  createCanvas(windowWidth,windowHeight)
  
  //criar um sprite do trex
  trex = createSprite(50,height-40,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("faleceu",trex_colidiu);
  trex.scale = 0.5;
  
  //criar um sprite do solo
  solo = createSprite(width/2,height-20,width,20);
  solo.addImage("ground",imagemdosolo);
  solo.velocityX = -(4+pontos/100);
  
  //criando solo invisível
  soloinvisivel = createSprite(200,height-10,400,10);
  soloinvisivel.visible = false;
  
  game_over = createSprite(width/2,height-100,20,20);
  game_over.addImage ("FIM DE JOGO OTARO",game_over_relampago_marquinhos);
  game_over.scale = 0.5;
  game_over.visible = false;
  
  kill_the_hero = createSprite(width/2,height-60,20,20);
  kill_the_hero.addImage("OUTRA CHANCE QUE DEUS TE DEU",HOJE_TEM_GOL_DO_RIBAMITO);
  kill_the_hero.scale = 0.5;
  kill_the_hero.visible = false;
  
  JOGAR = 1;
  ENCERRAR = 0;
  estadoJogo = JOGAR;
  
  
  //gerar números aleatórios
  var rand =  Math.round(random(1,100))
  //console.log(rand)
  
  grupinhodecactos = new Group();
  grupinhodosmarshmelow = new Group();

  trex.setCollider("circle",0,0,30);
  //trex.debug = true;
  
  
  
  
}

function draw() {
  //definir cor de fundo
  background("white");
  
  //console.log(trex.y)
  text("pontuação: "+pontos,width-100,height-150);
  text("Record: "+guinnessbook,width-100,height-130);
  //console.log(frameCount);
  
  // pular quando a tecla espaço é acionada
   if(trex.isTouching(grupinhodecactos)){
     estadoJogo = ENCERRAR;
     trex.changeAnimation("faleceu",trex_colidiu);
     //dieturetry.play();
    }  
   if(estadoJogo === JOGAR){
     if(keyDown("space")&& trex.y >= height-50) {
      trex.velocityY = -10;
      easportstchinag.play();
      }
     trex.velocityY = trex.velocityY + 0.6;
     if (solo.x < solo.width/5){
      solo.x = solo.width/2;
      }
     pontos = Math.round(frameCount/3);
      gerarNuvens();
      gerarCerrinha();
     
     if(pontos>0 && pontos%100 === 0){
        zico.play();
      }
     solo.velocityX = -(4+pontos/100);
     }else if(estadoJogo === ENCERRAR){
      funeraldotrex();
      if(mousePressedOver(kill_the_hero)){
       VOLTADESGRAZZA();
      }
      if(pontos>guinnessbook){
        guinnessbook = pontos; 
      } 
     }
  
   
   

  
  //impedir o trex de cair 
  trex.collide(soloinvisivel);
  
  
  drawSprites();
}

//função para gerar as nuvens
function gerarNuvens() {
 // escreva o seu código aqui

  
  if(frameCount%90 === 0){
    nuvemzinha = createSprite(width,100,20,20);
    nuvemzinha.velocityX = -(2+pontos/100);
    nuvemzinha.addImage("Imagem",nuvemzinhamexendo);
    
    nuvemzinha.y = Math.round(random(height-170,height-100));
    nuvemzinha.scale = random(0.25,1.25);
    //console.log(nuvemzinha.depth);
    //console.log(trex.depth);
    nuvemzinha.lifetime = width/nuvemzinha.velocityX;
    grupinhodosmarshmelow.add(nuvemzinha);  
    nuvemzinha.depth = trex.depth - 1;
 }
  
}

function gerarCerrinha(){
  if(frameCount%100 === 0){
   Cerra = createSprite(width,height-40,20,20);
   var bingo = Math.round(random(1,6));
   switch (bingo){
     case 1: Cerra.addImage ("CerrinhaDiferenciada",Cerrinha);
     Cerra.scale = 0.5;
     break;
     case 2: Cerra.addImage ("CerrinhaDiferenciada",Pilosocereus_magnificus);
     Cerra.scale = 0.5;
     break;
     case 3: Cerra.addImage ("CerrinhaDiferenciada",Cacto_Pera);
     Cerra.scale = 0.5;
     break;
     case 4: Cerra.addImage ("CerrinhaDiferenciada",Cacto_Pedra);
     Cerra.scale = 0.5;  
     break;
     case 5: Cerra.addImage ("CerrinhaDiferenciada",Cacto_Macarrao);
     Cerra.scale = 0.4;  
     break;
     case 6: Cerra.addImage ("CerrinhaDiferenciada",Cacto_Xiaomi);
     Cerra.scale = 0.4;  
     break; 
   } 
   Cerra.velocityX = -(4+pontos/100);
   Cerra.lifetime = width/Cerra.velocityX;
   grupinhodecactos.add(Cerra);
 }
}

function funeraldotrex(){
  solo.velocityX = 0;
  grupinhodosmarshmelow.setVelocityXEach (0);
  grupinhodecactos.setVelocityXEach (0);
  grupinhodecactos.setLifetimeEach(-1);
  grupinhodosmarshmelow.setLifetimeEach(-1);
  kill_the_hero.visible = true;
  game_over.visible = true;
  
}

function VOLTADESGRAZZA(){
  kill_the_hero.visible = false;
  game_over.visible = false;
  grupinhodosmarshmelow.destroyEach();
  grupinhodecactos.destroyEach();
  estadoJogo = JOGAR;
  trex.changeAnimation("running",trex_correndo);
  pontos = 0;
  frameCount = 0;
}