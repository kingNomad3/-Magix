window.addEventListener("load", () => {
	
	
    spriteList.push(new heartkitty());
	
	document.querySelector(".canvas-container").onclick = () => {
		document.querySelector(".canvas-container").style.opacity = 1;
	}
	tick();
});

window.addEventListener('online', function(e) {
    document.querySelector("#offline-msg").style.display = "none";
}, false);

window.addEventListener('offline', function(e) {
    document.querySelector("#offline-msg").style.display = "block";
}, false);
