//PASSO 1 CRIAR AS VARIÁVEIS
var trex_correndo, trex, trex_parado;
var solo, soloImagem, soloInvisivel;
var nuvemImagem;
//criar as variáveis para os grupos
var cactoGrupo, nuvemGrupo;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
//PASSO 1: CRIAR A VARIÁVEL
var somPulo, somCheck, somFim;
var restartImagem, restart;

//CARREGAR ARQUIVOS DE MÍDIA
function preload() {

    //CARREGAR  SONS
    somPulo = loadSound("jump.mp3");
    somCheck = loadSound("checkpoint.mp3"); 
    somFim = loadSound("die.mp3");

    //carregar animações
    trex_correndo = loadAnimation("trex1.png", "trex2.png", "trex3.png");
    trex_parado = loadAnimation("trex1.png");

    //CARREGAR IMAGENS
    soloImagem = loadImage("solo.png");
    nuvemImagem = loadImage("nuvem.png");
     
    obs1 = loadImage("obstaculo1.png");
    obs2 = loadImage("obstaculo2.png");
    obs3 = loadImage("obstaculo3.png");
    obs4 = loadImage("obstaculo4.png");
    obs5 = loadImage("obstaculo5.png");
    obs6 = loadImage("obstaculo6.png");
    gameOverImagem = loadImage("gameOver.png");

}
var score = 0;
function setup() {
    createCanvas(600, 200);

    //criar os grupos
    cactoGrupo = new Group();
    nuvemGrupo = new Group();

    //gameOver
    gameOver = createSprite(300, 100);
    gameOver.addImage(gameOverImagem);
    gameOver.scale = 0.5;
    gameOver.visible = false;

    //restart

    //solo
    solo = createSprite(300, 190, 600, 20);
    solo.addImage(soloImagem);
    solo.velocityX = -3;

    //solo invisível
    soloInvisivel = createSprite(300, 199, 600, 2);
    soloInvisivel.visible = false;    

    //trex
    trex = createSprite(50, 170, 50, 50);
    trex.addAnimation("correndo", trex_correndo);
    trex.addAnimation("parado", trex_parado);
    trex.scale = 0.5;
}

function draw() {
    background("white");

    if(gameState==PLAY){
        trex.changeAnimation("correndo");
    
        if (solo.x < 0) {
            solo.x = solo.width / 1.99;
        }
    
        if (keyDown("space")  && trex.isTouching(solo)) {
            trex.velocityY = -13;
            somPulo.play();
        }
        if(!trex.isTouching(solo)){
            trex.changeAnimation("parado");
        }
        //aumenta a pontuação
        score +=0.3;
        textSize(30);
        //mostra na tela
        text(Math.round(score), 550, 50);
        //aumenta a velocidade
        solo.velocityX = -(3 + score/10);
        cactoGrupo.setVelocityXEach(solo.velocityX);

        criarNuvens();
        criarCactos();

        if(trex.isTouching(cactoGrupo)){
            gameState = END;
        }

    }
    if(gameState == END){

        solo.velocityX = 0;

        cactoGrupo.setVelocityXEach(0)
        nuvemGrupo.setVelocityXEach(0)
        
        cactoGrupo.setLifetimeEach(-1);
        nuvemGrupo.setLifetimeEach(-1);

        trex.changeAnimation("parado"); 

        gameOver.visible = true;
        

    }
    trex.velocityY += 0.8;   
    trex.collide(soloInvisivel);
   
 
    drawSprites();

}
//cria a function 
function criarNuvens(){
    if (frameCount % 60 === 0) {
        nuvem = createSprite(600, 100, 40, 10);
        nuvem.y = Math.round(random(10, 60));
        nuvem.addImage(nuvemImagem);
        nuvem.scale = 0.5;
        nuvem.velocityX = -3;

        //atribuir tempo de vida à sprite
        nuvem.lifetime = 200;
        //ajustar a profundidade
        trex.depth = nuvem.depth + 1;
        nuvemGrupo.add(nuvem);
    }
}

function criarCactos() {
    if (frameCount % 60 === 0) {
        var cacto = createSprite(600, 175, 10, 40);
        cacto.velocityX = solo.velocityX;

        //gerar obstáculos aleatórios
        var rand = Math.round(random(1, 6));
        switch (rand) {
            case 1:
                cacto.addImage(obs1);
                break;
            case 2:
                cacto.addImage(obs2);
                break;
            case 3:
                cacto.addImage(obs3);
                break;
            case 4:
                cacto.addImage(obs4);
                break;
            case 5:
                cacto.addImage(obs5);
                break;
            case 6:
                cacto.addImage(obs6);
                break;
            default:
                break;
        }

        //atribuir escala e vida útil ao obstáculo       
        cacto.scale = 0.5;
        cacto.lifetime = 300;
        cactoGrupo.add(cacto);



    }
}

function reiniciar(){
    gameState = PLAY;
    score = 0;
    cactoGrupo.destroyEach();
    nuvemGrupo.destroyEach();
    gameOver.visible = false;
    restart.visible = false;
}