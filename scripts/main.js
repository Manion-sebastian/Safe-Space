

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
const mainMenuButton = document.querySelector('#mainMenuButton')
const seconds = document.querySelector('#seconds')
const phaseUpdate = document.getElementById('phase')
const levelUpdate = document.getElementById('level')

let pillars = []
let interactX = []
let interactY = []
let inPlay = false
let round = 1
let speed = 9
let level = 0
let phase = 0


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

class Pillar extends Player {
    constructor(x,y,width,height,color) {
        super(x,y,width,height,color)
    }
}

// Object Init Farm
const randomX = Math.floor(Math.random() * 300) + 100
const randomY = Math.floor(Math.random() * 200) + 50
const dot = new Player(randomX, randomY, 30, 30, 'white')

// Named Functions 


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

function animate() {
    if(inPlay) {
        requestAnimationFrame(animate)
        ctx.clearRect(0,0,canvas.width,canvas.height)
        dot.render()
        pillars.forEach(pillar => {
            pillar.render()
        })

    }

    if(!dot.alive) {
        setTimeout(() => {
        // inPlay = false
        // ctx.clearRect(0,0,canvas.width,canvas.height)
        // round = 1
        // startOptions()
        location.reload()

        }, 1500)
        
    }
    
    

}

function dangerZone(columns, rows) {
    let xSpace = canvas.width/columns
    let ySpace = canvas.height/rows
    let columnCountInc = 0
    let rowCountInc = 0
    let color = 'rgba(112,112,112,0.4)'
    for (let i = 0; i < columns; i++) {
        const x = Math.floor(Math.random() * xSpace + (xSpace * columnCountInc))
        const y = 0
        const width = 10
        const height = canvas.height
        pillars.push(new Pillar(x,y,width,height,color))
        zonePush(x, x+width, 'x')
        columnCountInc++
    
        
    }
    for (let j = 0; j < rows; j++) {
        const x = 0
        const y = Math.floor(Math.random() * ySpace + (ySpace * rowCountInc))
        const width = canvas.width
        const height = 10
        pillars.push(new Pillar(x,y,width,height,color))
        zonePush(y, y+height, 'y' )
        rowCountInc++
    }
    
}

function nextRound() {
    round++
    pillars = []
    interactX = []
    interactY = []
    levelHandler()
}

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

// add diagonal movement. -- requires pythag. make an internal function to calculate. STRETCH
function movementHandler(e) {
    // const currentDirection = false dash STRETCH
    
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
            level++
            dangerZone(8,8)
            timer(3)
                break
            case(10):
            inPlay = false
            ctx.clearRect(0,0,canvas.width,canvas.height)
            round = 1
            location.reload()
                break
        }
    }
}


function zonePush(start, end, axis) {
    for (let i = start; i <= end; i++) {
        if (axis === 'x') {
            interactX.push(i)
        } else if (axis === 'y') {
            interactY.push(i)
        }
    }
}

function isHit() {

        for (let i = dot.x; i < dot.x + dot.width; i++) {
            if(interactX.includes(i)) {
                // console.log('Hit x')
                dot.alive = false
                return
                
            }
        }
        for (let i = dot.y; i < dot.y + dot.height; i++) {
            if(interactY.includes(i)) {
                // console.log('Hit y')
                dot.alive = false
                return
                
            }
        }
    }

function gameStart() {
    inPlay = true
    dot.alive = true
    animate()
    levelHandler(round)
}

function gameOver() {
    inPlay = false
    pillars = []
    interactX = []
    interactY = 
    ctx.clearRect(0,0,canvas.width,canvas.height)
    round = 1
    // startMenu.style.display = 'grid'
}


// Headache Reducer. :)

document.addEventListener('DOMContentLoaded', () => {
    startOptions()
})