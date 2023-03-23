class Overworld {
  constructor(config) {
    this.element = config.element
    this.canvas = this.element.querySelector(".game-canvas")
    this.ctx = this.canvas.getContext("2d")
  }

  init() {
    const mapImage = new Image()
    mapImage.onload = () => {
      this.ctx.drawImage(mapImage, 0, 0)
    }
    mapImage.src = "/images/maps/DemoLower.png"

    // Place some game objects
    const hero = new GameObject({
      x: 5,
      y: 6,
      src: "/images/characters/people/hero.png"
    })

    const npc1 = new GameObject({
      x: 7,
      y: 9,
      src: "/images/characters/people/npc1.png"
    })

    setTimeout(() => {
      hero.sprite.draw(this.ctx)
      npc1.sprite.draw(this.ctx)
    }, 200);
  }
}