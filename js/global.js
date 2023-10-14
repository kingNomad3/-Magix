const spriteList = [];
let ctx = null;
let canvasWidth = 0;
let canvasHeight = 0;
let mainTickCounter = 0;

window.addEventListener("load", () => {
	if (document.querySelector("#canvas") != null) {
		ctx = document.querySelector("#canvas").getContext("2d");

		if (document.querySelector("#canvas").getAttribute("data-full") === "true") {
			canvasWidth = window.innerWidth;
			canvasHeight = window.innerHeight;
			document.querySelector("#canvas").width = canvasWidth;
			document.querySelector("#canvas").height = canvasHeight;
		}
		else {
			canvasWidth = document.querySelector("#canvas").width;
			canvasHeight = document.querySelector("#canvas").height;
		}
	}

	tick();
});

const getX = percent => {
	return percent/100.0 * canvasWidth;
}

const getY = percent => {
	return percent/100.0 * canvasHeight;
}

const tick = () => {
	mainTickCounter++;
	if (ctx != null) ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	for (let i = 0; i < spriteList.length; i++) {
		const sprite = spriteList[i];

		if (!sprite.tick()) {
			spriteList.splice(i, 1);
			i--;
		}
	}

	window.requestAnimationFrame(tick);
}