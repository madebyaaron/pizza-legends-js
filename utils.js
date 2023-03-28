const utils = {
    withGrid(n) {
        return n * 16
    },

    asGridCols(x, y) {
        return `${x*16},${y*16}`
    },

    nextPosition(initialX, initialY, direction) {
        let x = initialX
        let y = initialY
        const size = 16

        if (direction === "left") x = x - size
        if (direction === "right") x = x + size
        if (direction === "up") y = y - size
        if (direction === "down") y = y + size
        return {x, y}
    }
}