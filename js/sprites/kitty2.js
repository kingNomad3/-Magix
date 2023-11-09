class heartkitty {
	constructor() {
        let columnCount = 10; 
        let rowCount = 1;
        let refreshDelay = 100; 
        let loopColumns = true;
        this.scale = 1.30;
        this.x = 55;
        this.y = 70;
        this.opacity = 1.0;

        let node = document.createElement("div"); 
        document.querySelector("#canvas").append(node); 

        this.tiledImage = new TiledImage("images/heartkitty.png", columnCount, rowCount, refreshDelay, loopColumns, this.scale, node);
        this.tiledImage.setFlipped(true);

        this.tiledImage.setFullImageLoop(10); 
    }

    tick() {

        this.tiledImage.tick(getX(this.x), getY(this.y) - this.tiledImage.getActualHeight()/2, ctx);
        return true;
    }
}