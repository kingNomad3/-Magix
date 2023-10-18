const applyStyles = iframe => {
	let styles = {
		fontColor : "#333",
		backgroundColor : "rgba(87, 41, 5, 0.2)",
		fontGoogleName : "Sofia",
		fontSize : "20px",
		hideIcons : false ,
		inputBackgroundColor : "red",
		inputFontColor : "blue",
		height : "700px",
		memberListFontColor : "#ff00dd",
		memberListBackgroundColor : "white"
	}
	
	setTimeout(() => {
		iframe.contentWindow.postMessage(JSON.stringify(styles), "*");	
}, 100);
}

const carte = () =>{
	
	let node = document.createElement("div"); 
	document.querySelector("#hand").append(node); 

	node.push
	// data.hand pour prendre la carte voir fruit help 
	// data.carte.push
	

}


const chooseGame = (type, callType) => {
	let formData = new FormData();

	formData.append("type", type);
	formData.append("callType", callType);

	fetch("ajax.php", {
		method: "post",
		body: formData
	})
	.then(response => response.json())
	.then(data => {
		switch(data) {
			case 
			"INVALID_KEY", 
			"INVALID_KEY", 
			"INVALID_GAME_TYPE",
			"MAX_DEATH_THRESHOLD_REACHED":
				let node = document.querySelector("#contenantError");
				let textNode = document.createTextNode(data);
				console.log(data);
				node.append(textNode);
			default:
				location.href = "jeu.php";
		}
	})
}

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