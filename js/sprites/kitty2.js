class heartkitty {
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
		console.log("test2")

		this.tiledImage = new TiledImage("images/heartkitty.png", columnCount, rowCount, refreshDelay, loopColumns, this.scale, null);

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
		console.log("is passing");

		return this.opacity > 0.1;
	}

}