// Register the service worker if available.
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('sw.js').then(function(reg) {
//     }).catch(function(err) {
//         console.warn('Error whilst registering service worker', err);
//     });
// }

window.addEventListener("load", () => {
	
	spriteList.push(new Kitty());
    spriteList.push(new kitty2());
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