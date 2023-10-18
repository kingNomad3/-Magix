const state = () => {
	fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
 method : "POST"        // l’API (games/state)
	})
.then(response => response.json())
.then(data => {
	// console.log(data); // contient les cartes/état du jeu.
    // console.log(data.opponent.username);

    let opponentUsername;
    opponentUsername = data.opponent.username
    // $_SESSION["opponentUsername"] = console.log();
    console.log(opponentUsername);
    
    // 
  

	setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
	})

}

window.addEventListener("load", () => {
setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});

function toggleChat() {
    var chatBox = document.querySelector('.chat-container'); 

    // If chat is visible, slide it out
    if(chatBox.style.left !== "-700px") { // assuming chat-box width is 700px
        chatBox.style.left = "-700px"; 
    } else {
        chatBox.style.left = "0"; // slide back in
    }
}

// window.addEventListener("load", () => {
//     let node = document.querySelector("input");
//     node.onkeyup = () => {
//         let formData = new FormData();
//         formData.append("opponentSide", node.value);

//         fetch("ajax.php", {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => response.json())
//         .then(data => {
//             let newNode = document.createElement("div");
//             newNode.innerText = data;

//             let parentNode = document.querySelector("#opponent-side");
//             parentNode.append(newNode);
//             console.log(data);    
//         })
//     }
// })