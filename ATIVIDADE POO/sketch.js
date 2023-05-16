var bola = new Bola();
var bola1 = new Bola();
bola1.x = 200;

function setup(){
    createCanvas(600,500);
}

function draw(){
    background("skyblue");
    
    bola.mostrar();
    bola1.mostrar();
    
    if(keyCode == 38){
        bola.y--;
    }
}