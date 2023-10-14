class Kitty {
	constructor() {
		let columnCount = 4;
		let rowCount = 4;
		let refreshDelay = 100;
		let loopColumns = true;
		this.scale = 1.0;
		this.x = -10;
		this.y = 70;
		this.opacity = 1.0;

		let node = document.createElement("div");
		document.querySelector("#canvas").append(node);

		this.tiledImage = new TiledImage("images/hellokitty.png", columnCount, rowCount, refreshDelay, loopColumns, this.scale, node);

		this.tiledImage.setFullImageLoop(16, () => {
		});
	}

	tick() {
		if (this.x < 68) {
			this.x += 0.1;
		}
		else {
			this.opacity -= 0.01;
			this.tiledImage.setOpacity(this.opacity);
		}

		this.tiledImage.tick(getX(this.x), getY(this.y) - this.tiledImage.getActualHeight()/2, ctx);

		return this.opacity > 0.1;
	}

}