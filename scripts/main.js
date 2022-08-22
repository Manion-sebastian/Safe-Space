

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
const mainMenuButton = document.querySelector('#mainMenuButton')
const asideMenuButton = document.querySelector('#asideMenuButton')
const seconds = document.querySelector('#seconds')
const tSecs = document.querySelector('#tenthOfSecond')
const hSecs = document.querySelector('#hundOfSecs')

const pillars = []
let inPlay = false
// Anon

document.addEventListener('keydown', movementHandler)
canvas.addEventListener('click', (e) => {
    console.log(e.offsetX, e.offsetY)
})

// Canvas Init

const ctx = canvas.getContext('2d')
// canvas.setAttribute('height', getComputedStyle(canvas)['height'])
// canvas.setAttribute('width', getComputedStyle(canvas)['width'])
// Hardcoded size for now. -- would like to be reactive soon. 
// canvas.width = innerWidth
// canvas.height = innerHeight
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

    update() {
        this.render()
        // if time is up 
        //change color
    }
}


// Object Init Farm

const dot = new Player(10, 10, 30, 30, 'white')

// Named Functions 


function startOptions() {
    startMenu.style.display = "grid"
    startButton.addEventListener('click', () => {
        startMenu.style.display = 'none'
        dangerZone(1, 1, 'yellow')
        animate()
        timer(3)
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
// maybe a pause function
function game() {
    asideMenuButton.addEventListener('click', () => {
        ctx.clearRect(0,0, canvas.width, canvas.height)
        startMenu.style.display = 'grid'
        
        
    })
} 


function animate() {
    inPlay = true
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    dot.render()
    pillars.forEach(pillar => {
        pillar.render()
    })
}

function dangerZone(columns, rows, color) {
    let xSpace = canvas.width/columns
    let ySpace = canvas.height/rows
    let columnCountInc = 0
    let rowCountInc = 0
    for (let i = 0; i < columns; i++) {
        const x = Math.floor(Math.random() * xSpace + (xSpace * columnCountInc))
        const y = 0
        const width = 20
        const height = canvas.height
        pillars.push(new Pillar(x,y,width,height,color))
        columnCountInc++
    
        
    }
    for (let j = 0; j < rows; j++) {
        const x = 0
        const y = Math.floor(Math.random() * ySpace + (ySpace * rowCountInc))
        const width = canvas.width
        const height = 20
        pillars.push(new Pillar(x,y,width,height,color))
        rowCountInc++
    }
    
}

function timer(length) {
    let ticks = 0
    let tocks = 0
    let tonk = 0
    let seconds = length
    let decSec = length * 10
    let hunSec = length * 100
    setInterval(() => {
        ticks++
        if (ticks % 10 === 0) {
            tocks++
        }
        if (tocks % 10 === 0) {
            tonk++
        }

        seconds.innerText = seconds
        tSecs.innerText = decSec
        hSecs.innerText = hunSec
    }, 10)

    if(seconds === 0 && decSec === 0 && hunSec === 0) {
        console.log('time up')
    }
}

// add diagonal movement. -- requires pythag. make an internal function to calculate. STRETCH
function movementHandler(e) {
    // const currentDirection = false dash STRETCH
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


// Headache Reducer. :)

document.addEventListener('DOMContentLoaded', () => {
    startOptions()
})