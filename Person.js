class Person extends GameObject {
    constructor(config) {
        super(config)
        this.movingProgressRemaining = 0;

        this.isPlayerControlled = config.isPlayerControlled || false

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1]
        }
    }

    updatePosition() {
            const[property, change] = this.directionUpdate[this.direction]
            this[property] += change
            this.movingProgressRemaining -= 1
    }

    updateSprite() {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation(`walk-${this.direction}`)
            return
        }
        
        this.sprite.setAnimation(`idle-${this.direction}`)
    }

    update(state) {
        if (this.movingProgressRemaining) {
            this.updatePosition()
        } else {
            
            // Case: We're keyboard ready and have an arrow pressed
            if (this.isPlayerControlled && state.arrow) {
                this.startBehavior(state,
                    {
                        type: "walk",
                        direction: state.arrow
                    }
                )
            }
            this.updateSprite(state)
        }
        
        
        
    }

    startBehavior(state, behavior) {
        // Set character direction to whatever behavior has
        this.direction = behavior.direction
        if (behavior.type === "walk") {
            
            // Prevent movement if next space is blocked
            const isNextSpaceTaken = state.map.isSpaceTaken(this.x, this.y, this.direction)
            if (isNextSpaceTaken) return
            
            // Move character
            state.map.moveWall(this.x, this.y, this.direction)
            this.movingProgressRemaining = 16
        }
    }
}