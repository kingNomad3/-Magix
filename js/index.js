// Register the service worker if available.
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('sw.js').then(function(reg) {
//     }).catch(function(err) {
//         console.warn('Error whilst registering service worker', err);
//     });
// }

window.addEventListener("load", () => {
	
	// spriteList.push(new Kitty());
	spriteList.push(new kitty2());
    spriteList.push(new heartkitty());
	
	document.querySelector(".login-container").onclick = () => {
		document.querySelector(".login-container").style.opacity = 1;
	}
});

window.addEventListener('online', function(e) {
    document.querySelector("#offline-msg").style.display = "none";
}, false);

window.addEventListener('offline', function(e) {
    document.querySelector("#offline-msg").style.display = "block";
}, false);

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