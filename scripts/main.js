
// MISC FUNCTIONALITY START --------------

// DOM Selectors
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
const lossScreen = document.querySelector('.lossScreen')
const playAgain = document.getElementById('pAgainBtn')
const statBar = document.querySelector('.info')



// init for base components.
let pillars = []
let interactX = []
let interactY = []
let inPlay = false
let round = 1
let speed = 15
let level = 0
let phase = 0

// MISC FUNCTIONALITY START --------------

// OPTION FUNCTIONALITY START --------------

// Darkmode
let beamInitColor = 'rgba(255,215,0,0.6)'
let beamActColor = 'red'
let dotColor = 'rgba(0,0,0,0)'
let darkMode = false

const darkSpan = document.querySelector('.darkSpan')
darkSpan.addEventListener('click', () => {
    if (!darkMode) {
        darkMode = true
        darkSpan.innerText = 'ON'
        darkSpan.style.color = 'gold'
        beamInitColor = 'rgba(255,255,255,0.6)'
        beamActColor = 'red'
        canvas.style.backgroundColor = 'black'
    } else if (darkMode) {
        darkMode = false
        darkSpan.innerText = 'OFF'
        darkSpan.style.color = 'white'
        beamInitColor = 'rgba(255,215,0,0.6)'
        beamActColor = 'red'
        canvas.style.backgroundColor = 'midnightBlue'
    }
})


// Diff Mod
let difficulty = false
let timeScale = 1
const diffSpan = document.querySelector('.diffSpan')
diffSpan.addEventListener('click', () => {
    if (!difficulty) {
        timeScale = .5
        diffSpan.innerText = 'HARD'
        diffSpan.style.color = 'gold'
        difficulty = true
    } else if (difficulty) {
        timeScale = 1
        diffSpan.innerText = 'NORMAL'
        diffSpan.style.color = 'white'
        difficulty = false
    }
})


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
let audioOn = false

const mSpan = document.querySelector('.mSpan')
mSpan.addEventListener('click', () => {
    if (audioOn) {
        audioOn = false 
        mSpan.innerText = 'ON'
        mSpan.style.color = 'white'
    } else if (!audioOn) {
        audioOn = true
        mSpan.innerText = 'OFF'
        mSpan.style.color = 'gold'
    }
})

// https://opengameart.org/content/theremin-laser-sfx
const laserDown = new Audio('media/sounds/Smooth 7.wav')
const laserActivate = new Audio('media/sounds/Space 5.wav')
const playerKilled = new Audio('media/sounds/Space 1.wav')
// https://opengameart.org/content/victory-2
const victory = new Audio('media/sounds/Victory!.wav')
// https://opengameart.org/content/game-over-theme-ii
const failure = new Audio('media/sounds/Game Over II ~ v1.mp3')

// OPTION FUNCTIONALITY END --------------

// CANVAS FUNCTIONALITY START --------------
// Anon dev check

document.addEventListener('keydown', movementHandler)
// canvas.addEventListener('click', (e) => {
//     console.log(e.offsetX, e.offsetY)
//     console.log(round)
// })

// Canvas Init

const ctx = canvas.getContext('2d')
canvas.width = 1200
canvas.height = 800

// CANVAS FUNCTIONALITY END --------------

// OBJECT FUNCTIONALITY START --------------

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
let randomX = 0
let randomY = 0
let dot = new Player(randomX, randomY, 30, 30, dotColor)
let dotPicture = new Image()
dotPicture.src = 'media/art/playerSprite.png'

// OBJECT FUNCTIONALITY END --------------

// SCREEN FUNCTIONALITY START --------------

// start screen.

function startOptions() {
    statBar.style.display = 'none'
    startMenu.style.display = "grid"
    startButton.addEventListener('click', () => {
        startMenu.style.display = 'none'
        // inPlay = true
        gameStart()
        animate()
        levelHandler()
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
            winScreen.style.display = 'none'
            lossScreen.style.display = 'none' 
        })
    })  
} 

// pulls up win wscreen

function screenSelect(screen) {
    phaseUpdate.innerText = 0
    levelUpdate.innerText = 0
    statBar.style.display = 'none'

    if (screen === 'win') {
        if (audioOn) {
            victory.play()
        }
        winScreen.style.display = 'grid'

    } else if (screen === 'lose') {
        if (audioOn) {
            failure.play()
         }
         lossScreen.style.display = 'grid'
    }
}

// clears screen for other functions

function clearScreen() {
    inPlay = false
    ctx.clearRect(0,0,canvas.width,canvas.height)
    round = 1
}

// SCREEN FUNCTIONALITY END --------------

// GAMELOOP FUNCTIONALITY START --------------

// animation Loop.

function animate() {
    if(inPlay) {
        requestAnimationFrame(animate)
        ctx.clearRect(0,0,canvas.width,canvas.height)
        dot.render()
        ctx.drawImage(dotPicture, 0, 0, 32, 32, dot.x, dot.y, 32, 32)
        pillars.forEach(pillar => {
            pillar.render()
        }) 
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
    let color = beamInitColor

    for (let i = 0; i < columns; i++) {
        const x = Math.floor(Math.random() * xSpace + (xSpace * columnCountInc))
        const y = 0
        const width = 60
        const height = canvas.height
        pillars.push(new Pillar(x,y,width,height,color))
        zonePush(x, x+width, 'x')
        columnCountInc++
    }

    for (let j = 0; j < rows; j++) {
        const x = 0
        const y = Math.floor(Math.random() * ySpace + (ySpace * rowCountInc))
        const width = canvas.width
        const height = 60
        pillars.push(new Pillar(x,y,width,height,color))
        zonePush(y, y+height, 'y' )
        rowCountInc++
    }

}

// calls next round. clears old data.

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
            pillar.color = beamActColor
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
            timer(Math.floor(timeScale * 5))
                break
            case(2):
            level++
            dangerZone(4,0)
            timer(Math.floor(timeScale * 4))
                break
            case(3):
            level++
            dangerZone(5,0)
            timer(Math.floor(timeScale * 3))
                break
            case(4):
            phase++
            level = 1
            dangerZone(5,3)
            timer(Math.floor(timeScale * 5))
                break
            case(5):
            level++
            dangerZone(5,4)
            timer(Math.floor(timeScale * 4))
                break
            case(6):
            level++
            dangerZone(5,5)
            timer(Math.floor(timeScale * 3))
                break
            case(7):
            phase++
            level = 1
            dangerZone(6,6)
            timer(Math.floor(timeScale * 5))
                break
            case(8):
            level++
            dangerZone(7,7)
            timer(Math.floor(timeScale * 4))
                break
            case(9):
            if(endless) {
                round = 8
            }
            level++
            dangerZone(8,8)
            timer(Math.floor(timeScale * 3))
                break
            case(10):
            inPlay = false
            ctx.clearRect(0,0,canvas.width,canvas.height)
            round = 1
            screenSelect('win')
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
                if (!deathless) {
                    dot.alive = false
                }
            }
        }

        for (let i = dot.y; i < dot.y + dot.height; i++) {
            if(interactY.includes(i)) {
                if (!deathless) {
                    dot.alive = false
                }
            }
        }

        if (!dot.alive) {
            if (audioOn) {
                playerKilled.play()
            }
            setTimeout(() => {
                clearScreen()
                screenSelect('lose')
        
            }, 1500)
    
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
    randomX = Math.floor(Math.random() * 1000) + 100
    randomY = Math.floor(Math.random() * 500) + 50
    dot = new Player(randomX, randomY, 30, 30, dotColor)
    inPlay = true
    dot.alive = true
    statBar.style.display = 'flex'

}



// GAMELOOP FUNCTIONALITY END --------------

// Headache Reducer. :)

document.addEventListener('DOMContentLoaded', () => {
    startOptions()
})
