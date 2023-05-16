class Bola{
    //primeiro código a ser lido
    //ao criar o objeto
    constructor(){
        this.x = 100;
        this.y = 100;
        this.raio = 30;
        this.cor = 'lime';
    }
    mostrar(){
        fill (this.cor);
        ellipse(this.x, this.y, this.raio);
    }
}