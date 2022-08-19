

// DOM Init Farm
// Named

// keep as farm until MVP is done, then consolidate into scopes. 
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

// was this needed?
class Pillar extends Player {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color)


    }
    // implement this working by tomorrow sat 20th 9pm.
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
        // not working, dont know why. figure out tomorrow.
        startMenu.style.display = 'grid'
        instructionMenu.style.display = 'none'
        optionMenu.style.display = 'none'
    })
}

// can be done better
function game() {
    setInterval(gameloop, 60)
} 

// should be init as anon inside game() not its own. 
function gameloop() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    dot.render()
    // bob.render() 
}

// add diagonal movement. -- requires pythag. make an internal function to calculate.
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

// not adapted to this game currently. 

function detectHit() {
    // collision detection 
        // dot has a constant check output of location. 
        // to save on logic the collision could be determined at the point of init for the pillars
        // x/y coord + width. check for each pillar on the field == should work. 
            // pillar 1 spawns at x = 50 y = 0 width is 14px if dot is touching 50 - 50+14 dot is killed. 
            // dont need a y coord for this type of syttem i would think.

    // const ogreLeft = hero.x + hero.width >= ogre.x
    // const ogreRight = hero.x <= ogre.x + ogre.width
    // const ogreTop =  hero.y + hero.height >= ogre.y
    // const ogreBottom = hero.y <= ogre.y + ogre.height
    // console.log(ogreLeft, ogreRight, ogreTop, ogreBottom)
    // if (ogreRight && ogreLeft && ogreTop && ogreBottom) {
    //     ogre.alive = false
    //     statusDisplay.innerText = 'You killed Shrek!'
    // }
}



// Headache Reducer. :)

document.addEventListener('DOMContentLoaded', () => {
    startOptions()
})