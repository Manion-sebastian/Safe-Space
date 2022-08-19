

// DOM Init Farm
// Named

const rightDisplay = document.querySelector('#right-aside')
const leftDisplay = document.querySelector('#left-aside')
const canvas = document.querySelector('canvas')
const startMenu = document.querySelector('.startMenu')
const optionMenu = document.querySelector('.optionsMenu')
const instructionMenu = document.querySelector('.instructionsMenu')
const startButton = document.getElementById('play')
const optionButton = document.getElementById('options')
const instructionButton = document.getElementById('inst')
const mainMenuButton = document.querySelector('.mainMenuButton')

// Anon

document.addEventListener('keydown', movementHandler)
// canvas.addEventListener('click', (e) => {
//     console.log(e.offsetX, e.offsetY)
// })

// Canvas Init

const ctx = canvas.getContext('2d')
// canvas.setAttribute('height', getComputedStyle(canvas)['height'])
// canvas.setAttribute('width', getComputedStyle(canvas)['width'])
// Hardcoded size for now. -- would like to be reactive soon. 
canvas.width = 600
canvas.height = 400


// Class Init Farm

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

class Pillar extends Player {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color)


    }

    turnOn(color) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ableToKill = true

    }
}

// Object Init Farm

const dot = new Player(10, 10, 30, 30, 'white')
// const bob = new Player(50, 50, 20, 20, 'red') 

// Named Functions 

function startOptions() {
    startMenu.style.display = "grid"
    startButton.addEventListener('click', () => {
        startMenu.style.display = 'none'
        game()
    })

    optionButton.addEventListener('click', () => {
        optionMenu.style.display = 'grid'
        startMenu.style.display = 'none'
    })

    instructionButton.addEventListener('click', () => {
        instructionMenu.style.display = 'grid'
        startMenu.style.display = 'none'
    })

    mainMenuButton.addEventListener('click', () => {
        startMenu.style.display = 'grid'
        instructionMenu.style.display = 'none'
        optionMenu.style.display = 'none'
    })
}

function game() {
    setInterval(gameloop, 60)
} 

function gameloop() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    dot.render()
    // bob.render() 
}

function movementHandler(e) {
    // const currentDirection = false dash
    const speed = 10
    switch (e.key) {
        case('w'):
            dot.y -= speed
            break
        case('a'):
            dot.x -= speed
            break
        case('s'):
            dot.y += speed
            break
        case('d'):
            dot.x += speed
            break
    }
    
}



// Headache Reducer. :)

document.addEventListener('DOMContentLoaded', () => {
    startOptions()
})