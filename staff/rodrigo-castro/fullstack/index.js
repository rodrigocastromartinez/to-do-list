const STEP = 5
const LAPSE = 200

class Car {
    constructor(icon) {
        this.icon = icon

        this.pos = 0
        this.time = 0
    }

    move() {
        this.pos += Math.round(STEP * (1 - Math.random()))
    }

    status() {
        console.log(`${this.icon}, pos = ${this.pos}, time =${this.time}`)
    }

    render() {
        console.log(' '.repeat(this.pos), this.icon)
    }
}

let pos = 0, time = 0

const taxi = new Car('🚖')
const thief = new Car('🚘')
const police = new Car('🚔')

const interval = setInterval(() => {
    console.clear()
    time += LAPSE

    if(taxi.pos < 100) {
        taxi.render()
        taxi.move()
        taxi.time = time
    }

    if(thief.pos < 100) {
        thief.render()
        thief.move()
        thief.time = time
    }

    if(police.pos < 100){
        police.render()
        police.move()
        police.time = time
    }

    if (taxi.pos >= 100 && thief.pos >= 100 && police.pos >= 100)
        clearInterval(interval)

        taxi.status()
        thief.status()
        police.status()
}, LAPSE)