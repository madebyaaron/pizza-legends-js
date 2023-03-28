class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects
        this.walls = config.walls || {}
        
        this.lowerImage = new Image()
        this.lowerImage.src = config.lowerSrc
        
        this.upperImage = new Image()
        this.upperImage.src = config.upperSrc
    }

    drawLowerImage(ctx, cameraAnchor) {
        ctx.drawImage(
            this.lowerImage,
            utils.withGrid(10.5) - cameraAnchor.x,
            utils.withGrid(6) - cameraAnchor.y
        )
    }

    drawUpperImage(ctx, cameraAnchor) {
        ctx.drawImage(
            this.upperImage,
            utils.withGrid(10.5) - cameraAnchor.x,
            utils.withGrid(6) - cameraAnchor.y    
        )
    }

    isSpaceTaken(currentX, currentY, direction) {
        const { x, y } = utils.nextPosition(currentX, currentY, direction)
        console.log(this.walls, x, y)
        return this.walls[`${x},${y}`] || false
    }

    mountObjects() {
        Object.values(this.gameObjects).forEach(o => {
            o.mount(this)
        })
    }

    addWall(x, y) {
        this.walls[`${x},${y}`] = true
    }
    
    removeWall(x, y) {
        delete this.walls[`${x},${y}`]
    }

    moveWall(fromX, fromY, direction) {
        this.removeWall(fromX, fromY)
        const { x, y } =  utils.nextPosition(fromX, fromY, direction)
        this.addWall(x, y)
    }

}

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "/images/maps/DemoLower.png",
        upperSrc: "/images/maps/DemoUpper.png",
        gameObjects: {
            hero: new Person({
                x: utils.withGrid(5),
                y: utils.withGrid(6),
                src: "/images/characters/people/hero.png",
                isPlayerControlled: true
            }),
            npcA: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "/images/characters/people/npc1.png",
            })
        },
        walls: {
            [utils.asGridCols(7, 6)]: true,
            [utils.asGridCols(7, 7)]: true,
            [utils.asGridCols(8, 6)]: true,
            [utils.asGridCols(8, 7)]: true,

            [utils.asGridCols(6, 3)]: true,
            [utils.asGridCols(6, 4)]: true,
            [utils.asGridCols(8, 3)]: true,
            [utils.asGridCols(8, 4)]: true,
            
            [utils.asGridCols(1, 3)]: true,
            [utils.asGridCols(2, 3)]: true,
            [utils.asGridCols(3, 3)]: true,
            [utils.asGridCols(4, 3)]: true,
            [utils.asGridCols(5, 3)]: true,
            [utils.asGridCols(8, 3)]: true,
            [utils.asGridCols(9, 3)]: true,
            [utils.asGridCols(10, 3)]: true,
            
            [utils.asGridCols(0, 4)]: true,
            [utils.asGridCols(0, 5)]: true,
            [utils.asGridCols(0, 6)]: true,
            [utils.asGridCols(0, 7)]: true,
            [utils.asGridCols(0, 8)]: true,
            [utils.asGridCols(0, 9)]: true,
            [utils.asGridCols(7, 1)]: true,
            
            
            [utils.asGridCols(1, 10)]: true,
            [utils.asGridCols(2, 10)]: true,
            [utils.asGridCols(3, 10)]: true,
            [utils.asGridCols(4, 10)]: true,
            [utils.asGridCols(5, 11)]: true,
            [utils.asGridCols(6, 10)]: true,
            [utils.asGridCols(7, 10)]: true,
            [utils.asGridCols(8, 10)]: true,
            [utils.asGridCols(9, 10)]: true,
            [utils.asGridCols(10, 10)]: true,
            [utils.asGridCols(11, 9)]: true,
            [utils.asGridCols(11, 8)]: true,
            [utils.asGridCols(11, 7)]: true,
            [utils.asGridCols(11, 6)]: true,
            [utils.asGridCols(11, 5)]: true,
            [utils.asGridCols(11, 4)]: true,
        }
    },
    Kitchen: {
        lowerSrc: "/images/maps/KitchenLower.png",
        upperSrc: "/images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(5),
                src: "/images/characters/people/hero.png"
            }),
            npcA: new Person({
                x: utils.withGrid(9),
                y: utils.withGrid(6),
                src: "/images/characters/people/npc2.png"
            }),
            npcB: new Person({
                x: utils.withGrid(10),
                y: utils.withGrid(8),
                src: "/images/characters/people/npc3.png"
            })
        }
    },
}