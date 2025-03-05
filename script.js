const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')

let gameOver = false

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

}

const barraPrincipal = new BarraPrincipal(175, 480, 50, 10)
const barraInimiga = new BarrasInimigas(10, 10, 50, 10)

function loop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        barraPrincipal.desenhar(ctx, 'white')
        barraPrincipal.atualizar()
        barraInimiga.desenhar(ctx, 'red')
        requestAnimationFrame(loop)
    }
}

loop()
