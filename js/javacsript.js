const applyStyles = iframe => {
	let styles = {
		fontColor : "#333",
		backgroundColor : "rgba(87, 41, 5, 0.2)",
		fontGoogleName : "Sofia",
		fontSize : "20px",
		hideIcons : false (or ,true),
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

const state = () => {
	fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
 method : "POST"        // l’API (games/state)
	})
.then(response => response.json())
.then(data => {
	console.log(data); // contient les cartes/état du jeu.

	setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
	})
}

window.addEventListener("load", () => {
setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});
