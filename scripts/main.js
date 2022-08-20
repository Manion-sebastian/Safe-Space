

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

// Named Functions 

function startOptions() {
    let inPlay = false
    startMenu.style.display = "grid"
    startButton.addEventListener('click', () => {
        startMenu.style.display = 'none'
        inPlay = true
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
    const game = setInterval(gameloop, 50)
    asideMenuButton.addEventListener('click', () => {
        ctx.clearRect(0,0, canvas.width, canvas.height)
        clearInterval(game)
        startMenu.style.display = 'grid'
        
        
    })
} 


function gameloop() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    dot.render()
    // dangerZone(3,3)
    // detectHit(dot, pillar1)
}

function dangerZone(columns, rows, color) {
    let xSpace = canvas.width/columns
    let ySpace = canvas.height/rows
    let columnCountInc = 0
    let rowCountInc = 0
    for (let i = 0; i < columns; i++) {
        ctx.fillStyle = color
        ctx.fillRect(Math.floor(Math.random() * xSpace + (xSpace * columnCountInc)), 0, 20, canvas.height )
        columnCountInc++
        
    }
    for (let j = 0; j < rows; j++) {
        ctx.fillStyle = color
        ctx.fillRect(0, Math.floor(Math.random() * ySpace + (ySpace * rowCountInc)), canvas.width, 20)
        rowCountInc++
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

// function detectHit(player, enemy) {
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

//     const playerY = this.player.y + this.player.height
//     const playerX = this.player.x + this.player.width

//     const pillarY = this.enemy.y + this.enemy.height
//     const pillarX = this.enemy.x + this.enemy.width

//     if (playerY >= this.Pillar.y && playerY <= pillarY) {
//         if (playerX >= this.Pillar.x && playerX <= pillarX) {
//             this.Player.alive = false
            
//         }
//     }
//     if(this.Player.alive = false) {
//         console.log('working, dot is dead.')
//     }
// }



// Headache Reducer. :)

document.addEventListener('DOMContentLoaded', () => {
    startOptions()
    dangerZone(9, 9, 'red')
})