

// DOM Init Farm

const rightDisplay = document.querySelector('#right-aside')
const leftDisplay = document.querySelector('#left-aside')
const canvas = document.querySelector('canvas')

// Object Init Farm


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

// Object Init Farm

const dot = new Player(10, 10, 30, 30, 'white')
const bob = new Player(50, 50, 20, 20, 'red')

// Named Functions 

function game() {
    setInterval(gameloop, 60)
} 

function gameloop() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    dot.render()
    bob.render()
}

// testing start button functionality. 
// eventualy try to apply this to the canvas  and have three. 
// Start, info, and Options. 

function openingMenu() {
        const btn = document.createElement('button')
        btn.innerText = "test"
        btn.classList.add('test')
        leftDisplay.append(btn)
        // console.log('working') 
    
    const btnEvent = document.querySelectorAll('button')
    btnEvent.forEach(btn => {
        btn.addEventListener('click', () => {
            game()
            leftDisplay.removeChild(btn)
        })  
    })
}

canvas.addEventListener('click', (e) => {
    console.log(e.offsetX, e.offsetY)
})

// Headache Reducer. :)

document.addEventListener('DOMContentLoaded', () => {
    openingMenu()
})