const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')

let gameOver = false


function reiniciarJogo() {
    gameOver = false
    bola.x = canvas.width / 2;
    bola.y = canvas.height - 40;
    bola.velocidadeX = 3;
    bola.velocidadeY = -3;
    barraPrincipal.x = 175;
    barraPrincipal.y = 480;

    barraInimiga1.existe = true;
    barraInimiga2.existe = true;
    barraInimiga3.existe = true;

    loop();
}




document.addEventListener("click", (e) => {
    if (gameOver == true) {
        location.reload()
    }
})

document.addEventListener("keydown", (e) => {
    if (e.code == "ArrowRight") {
        barraPrincipal.moverDireita()
    }
})

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowRight") {
        barraPrincipal.naoMoverDireita()
    }
})

document.addEventListener("keydown", (e) => {
    if (e.code == "ArrowLeft") {
        barraPrincipal.moverEsquerda()
    }
})

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        barraPrincipal.naoMoverEsquerda()
    }
})

class Jogo {
    constructor(x, y, largura, altura) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura
    }
    desenhar = function (ctx, cor) {
        ctx.fillStyle = cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}

class BarraPrincipal extends Jogo {
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
        this.velocidade = 0
        this.direita = false
        this.esquerda = false
    }
    moverDireita = function () {
        this.velocidade = 5
        this.direita = true
    }
    naoMoverDireita = function () {
        this.velocidade = 0
        this.direita = false
    }
    moverEsquerda = function () {
        this.velocidade = 5
        this.esquerda = true
    }
    naoMoverEsquerda = function () {
        this.velocidade = 0
        this.esquerda = false
    }
    atualizar = function () {
        if (this.direita == true) {
            this.x += this.velocidade
        }
        if (this.esquerda == true) {
            this.x -= this.velocidade
        }

    }
}

class BarrasInimigas extends Jogo {
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
        this.existe = true
    }
    desenharBarrasInimigas1 = function (posicao) {
        if (this.existe) {
            for (posicao = 0; posicao < 400; posicao += 70) {
                ctx.fillStyle = 'red'
                ctx.fillRect(posicao, this.y, this.largura, this.altura)
            }
        }
    }
    desenharBarrasInimigas2 = function (posicao) {
        if (this.existe) {
            for (posicao = 0; posicao < 400; posicao += 70) {
                ctx.fillStyle = 'orange'
                ctx.fillRect(posicao, this.y, this.largura, this.altura)
            }
        }
    }
    desenharBarrasInimigas3 = function (posicao) {
        if (this.existe) {
            for (posicao = 0; posicao < 400; posicao += 70) {
                ctx.fillStyle = 'blue'
                ctx.fillRect(posicao, this.y, this.largura, this.altura)
            }
        }
    }
}

class Bola extends Jogo {
    constructor(x, y, r) {
        super(x, y)
        this.r = r
        this.velocidadeX = 3;
        this.velocidadeY = -3
    }
    desenharBola() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }
    mover() {
        this.x += this.velocidadeX
        this.y += this.velocidadeY

        if (this.x + this.r > canvas.width || this.x - this.r < 0) {
            this.velocidadeX = -this.velocidadeX;
        }
        if (this.y - this.r < 0) {
            this.velocidadeY = -this.velocidadeY;
        }

        if (this.y + this.r > barraPrincipal.y &&
            this.x > barraPrincipal.x &&
            this.x < barraPrincipal.x + barraPrincipal.largura) {
            this.velocidadeY = -this.velocidadeY;
        }
        barrasInimigas.forEach(barra => {
            if (barra.existe &&
                this.y - this.r < barra.y + barra.altura &&
                this.y + this.r > barra.y) {
                this.velocidadeY = -this.velocidadeY;
                barra.existe = false;
            }
        });
    }
    bolaFora() {
        if (this.y > canvas.height) {
            reiniciarJogo()
        }
    }
}

const barraPrincipal = new BarraPrincipal(175, 480, 50, 10)

const barraInimiga1 = new BarrasInimigas(10, 10, 50, 10)
const barraInimiga2 = new BarrasInimigas(10, 30, 50, 10)
const barraInimiga3 = new BarrasInimigas(10, 50, 50, 10)

const barrasInimigas = [barraInimiga1, barraInimiga2, barraInimiga3]

const bola = new Bola(canvas.width / 2, canvas.height - 40, 10);

function loop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        barraPrincipal.desenhar(ctx, 'white')
        barraPrincipal.atualizar()
        barraInimiga1.desenharBarrasInimigas1()
        barraInimiga2.desenharBarrasInimigas2()
        barraInimiga3.desenharBarrasInimigas3()
        bola.desenharBola()
        bola.mover()
        bola.bolaFora()
        requestAnimationFrame(loop)

    }
}

loop()
