

// DOM Init Farm
// Named
const canvas = document.querySelector('canvas')
const startMenu = document.querySelector('.startMenu')
const optionMenu = document.querySelector('.optionsMenu')
const instructionMenu = document.querySelector('.instructionsMenu')
const startButton = document.getElementById('play')
const optionButton = document.getElementById('options')
const instructionButton = document.getElementById('inst')
const mainMenuButton = document.querySelector('#mainMenuButton')
const seconds = document.querySelector('#seconds')
const phaseUpdate = document.getElementById('phase')
const levelUpdate = document.getElementById('level')
const winScreen = document.querySelector('.winScreen')
const playAgain = document.getElementById('pAgainBtn')

// let for init convenience -- i know its dangerous
let pillars = []
let interactX = []
let interactY = []
let inPlay = false
let round = 1
let speed = 15
let level = 0
let phase = 0

// Deathless
let deathless = false

const dSpan = document.querySelector('.dSpan') 

dSpan.addEventListener('click', () => {
    if (!deathless) {
        deathless = true
        dSpan.innerText = 'ON'
        dSpan.style.color = 'gold'
    } else if (deathless) {
        deathless = false
        dSpan.innerText = 'OFF'
        dSpan.style.color = 'white'
    }

})

// Endless
let endless = false

const eSpan = document.querySelector('.eSpan') 

eSpan.addEventListener('click', () => {
    if (!endless) {
        endless = true
        eSpan.innerText = 'ON'
        eSpan.style.color = 'gold'
    } else if (endless) {
        endless = false
        eSpan.innerText = 'OFF'
        eSpan.style.color = 'white'
    }

})

// Audio
let audioOn = true

const mSpan = document.querySelector('.mSpan')
mSpan.addEventListener('click', () => {
    if (audioOn) {
        audioOn = false 
        mSpan.innerText = 'OFF'
        mSpan.style.color = 'gold'
    } else if (!audioOn) {
        audioOn = true
        mSpan.innerText = 'ON'
        mSpan.style.color = 'white'
    }
    
})

// https://opengameart.org/content/theremin-laser-sfx
let laserDown = new Audio('media/sounds/Smooth 7.wav')
let laserActivate = new Audio('media/sounds/Space 5.wav')
let playerKilled = new Audio('media/sounds/Space 1.wav')
// https://opengameart.org/content/victory-2
let victory = new Audio('media/sounds/Victory!.wav')

// Anon

document.addEventListener('keydown', movementHandler)
canvas.addEventListener('click', (e) => {
    console.log(e.offsetX, e.offsetY)
    console.log(round)
})

// Canvas Init

const ctx = canvas.getContext('2d')
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

// for naming purposes, has no diff from player.
class Pillar extends Player {
    constructor(x,y,width,height,color) {
        super(x,y,width,height,color)
    }
}

// dot init for gameloop.
let randomX = Math.floor(Math.random() * 300) + 100
let randomY = Math.floor(Math.random() * 200) + 50
let dot = new Player(randomX, randomY, 30, 30, 'white')

// Named Functions 

// start screen.

function startOptions() {
    startMenu.style.display = "grid"
    startButton.addEventListener('click', () => {
        startMenu.style.display = 'none'
        gameStart()
    })

    optionButton.addEventListener('click', () => {
        optionMenu.style.display = 'grid'
        startMenu.style.display = 'none'
    })

    instructionButton.addEventListener('click', () => {
        instructionMenu.style.display = 'grid'
        startMenu.style.display = 'none'
    })
    
    const menuReturn = document.querySelectorAll('#mainMenuButton')
    menuReturn.forEach( button => {
        button.addEventListener('click', () => {
            startMenu.style.display = 'grid'
            instructionMenu.style.display = 'none'
            optionMenu.style.display = 'none'
        })
    })
    
} 

// animation Loop.

function animate() {
    if(inPlay) {
        requestAnimationFrame(animate)
        ctx.clearRect(0,0,canvas.width,canvas.height)
        pillars.forEach(pillar => {
            pillar.render()
        })
        dot.render()
        if(!dot.alive) {
            setTimeout(() => {
            location.reload()
    
            }, 1500) 

        }
    }

}

// creates and pushes columns to screen and to their array for coll testing.

function dangerZone(columns, rows) {
    if (audioOn) {
        laserDown.play()
    }
    let xSpace = canvas.width/columns
    let ySpace = canvas.height/rows
    let columnCountInc = 0
    let rowCountInc = 0
    let color = 'rgba(255,215,0,0.4)'
    for (let i = 0; i < columns; i++) {
        const x = Math.floor(Math.random() * xSpace + (xSpace * columnCountInc))
        const y = 0
        const width = 30
        const height = canvas.height
        pillars.push(new Pillar(x,y,width,height,color))
        zonePush(x, x+width, 'x')
        columnCountInc++


    }
    for (let j = 0; j < rows; j++) {
        const x = 0
        const y = Math.floor(Math.random() * ySpace + (ySpace * rowCountInc))
        const width = canvas.width
        const height = 30
        pillars.push(new Pillar(x,y,width,height,color))
        zonePush(y, y+height, 'y' )
        rowCountInc++
    }

}

// calls next round.

function nextRound() {
    round++
    pillars = []
    interactX = []
    interactY = []
    levelHandler()
}

// timer function, updates phase and level as well. 

function timer(secs) {
    phaseUpdate.innerText = phase
    levelUpdate.innerText = level
    seconds.innerText = secs
    const countDown = setInterval(() => {
        secs--
        seconds.innerText = secs
        if (secs === 0) {
            clearInterval(countDown)
        }
    }, 1000)
    let time = secs * 1000
    setTimeout(() => {
        pillars.forEach(pillar => {
            pillar.color = 'red'
            if (audioOn) {
                laserActivate.play()
            }
            speed = 0
            isHit()
        })
        setTimeout(() => {
            if(dot.alive) {
                speed = 9
                nextRound()
            }
        }, secs + 1000)

    }, time)

}

// handles the movement of character. 

function movementHandler(e) {    
    if (!dot.alive) {
        speed = 0
    }
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

// handles flow of game. 

function levelHandler() {
    if(dot.alive){
        switch(round) {
            case(1):
            phase++
            level++
            dangerZone(3,0)
            timer(5)
                break
            case(2):
            level++
            dangerZone(4,0)
            timer(4)
                break
            case(3):
            level++
            dangerZone(5,0)
            timer(3)
                break
            case(4):
            phase++
            level = 1
            dangerZone(5,3)
            timer(5)
                break
            case(5):
            level++
            dangerZone(5,4)
            timer(4)
                break
            case(6):
            level++
            dangerZone(5,5)
            timer(3)
                break
            case(7):
            phase++
            level = 1
            dangerZone(6,6)
            timer(5)
                break
            case(8):
            level++
            dangerZone(7,7)
            timer(4)
                break
            case(9):
            if(endless) {
                round = 8
            }
            level++
            dangerZone(8,8)
            timer(3)
                break
            case(10):
            inPlay = false
            ctx.clearRect(0,0,canvas.width,canvas.height)
            round = 1
            winScreenStart()
                break
        }
    }
}

// pushes to array for checking
function zonePush(start, end, axis) {
    for (let i = start; i <= end; i++) {
        if (axis === 'x') {
            interactX.push(i)
        } else if (axis === 'y') {
            interactY.push(i)
        }
    }
}

// detects whether or not player is hit
function isHit() {
        for (let i = dot.x; i < dot.x + dot.width; i++) {
            if(interactX.includes(i)) {
                // console.log('Hit x')
                if (!deathless) {
                    if (audioOn) {
                        playerKilled.play()
                    }
                    dot.alive = false
                }
                return
                
            }
        }
        for (let i = dot.y; i < dot.y + dot.height; i++) {
            if(interactY.includes(i)) {
                // console.log('Hit y')
                if (!deathless) {
                    if (audioOn) {
                        playerKilled.play()
                    }
                    dot.alive = false
                }
                return
                
            }
        }
    }

// starts game
function gameStart() {
    pillars = []
    interactX = []
    interactY = []
    level = 0
    phase = 0
    round = 1
    speed = 15
    randomX = Math.floor(Math.random() * 300) + 100
    randomY = Math.floor(Math.random() * 200) + 50
    dot = new Player(randomX, randomY, 30, 30, 'white')
    inPlay = true
    dot.alive = true
    animate()
    levelHandler(round)
}

// pulls up win wscreen
function winScreenStart() {
    if (audioOn) {
        victory.play()
    }
    winScreen.style.display = 'grid'
    playAgain.addEventListener('click', () => {
        winScreen.style.display = 'none'
        gameStart()
    })
}


// Headache Reducer. :)

document.addEventListener('DOMContentLoaded', () => {
    startOptions()
})