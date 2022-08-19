
// document.addEventListener('DOMContentLoaded', () => {


// })
// DOM Init Farm

const rightDisplay = document.querySelector('#right-aside')
const leftDisplay = document.querySelector('#left-aside')
const canvas = document.querySelector('canvas')

// Object Init Farm


// Canvas Init



const ctx = canvas.getContext('2d')
// canvas.setAttribute('height', getComputedStyle(canvas)['height'])
// canvas.setAttribute('width', getComputedStyle(canvas)['width'])
canvas.width = 600
canvas.height = 400

// Canvas Functions

// Object Init Farm

class Player {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = true

    }

    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

const dot = new Player(10, 10, 30, 30, 'white')
const gameLoopInterval = setInterval(gameloop, 60)

function gameloop() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    dot.render()
    
}

canvas.addEventListener('click', (e) => {
    console.log(e.offsetX, e.offsetY)
})