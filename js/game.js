const state = () => {
	fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
 method : "POST"        // l’API (games/state)
	})
.then(response => response.json())
.then(data => {
    switch(data) {
        case "WAITING":
            showErrorMessage(data);
            break;
        case "LAST_GAME_WON":
            showErrorMessage(data);
            break;
        case "LAST_GAME_LOST":
            showErrorMessage(data);
            break;
        default:
            setCardInZone(data.board, ".player-board");
            setCardInZone(data.hand, ".player-hand", data["mp"]);
            setCardInZone(data["opponent"]["board"], ".opponent-board");
            showLatestAction(data["latestActions"]);
            setOpponentInfo(data["opponent"]);
            setPicTurn(data["yourTurn"]);
            setPlayerInfo(data["mp"], data["hp"], data["remainingCardsCount"]);
            setTurnTime(data["remainingTurnTime"]);
            setInfoSide(data["opponent"], data["heroClass"]);
    }
    

    

	setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
	})

}
window.addEventListener("load", () => {
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
    });

const actionGame = (type, callType) => {
	let formData = new FormData();

	formData.append("type", type);
	formData.append("callType", callType);

	fetch("ajax.php", {
		method: "post",
		body: formData
	})
	.then(response => response.json())
    .then(data => {
        console.log(data);
        switch(data) {
            case "WRONG_TURN":
                showErrorMessage(data);
                break;
            default:
                updateState(data);
        }
    })
}

const actionCard = () => {
    let formData = new FormData();

	formData.append("type", type);
    formData.append("uid", uid);
    formData.append("targetuid", targetuid);

    fetch("ajax-action.php", {
        method : "POST",
        body : formData
})
.then(response => response.json())
.then(data => {
    switch(data) {
        case "INVALID_KEY":
        case "INVALID_ACTION":
        case "ACTION_IS_NOT_AN_OBJECT":
        case "NOT_ENOUGH_ENERGY":
        case "BOARD_IS_FULL":
        case "CARD_NOT_IN_HAND":
        case "CARD_IS_SLEEPING":
        case "MUST_ATTACK_TAUNT_FIRST":
        case "OPPONENT_CARD_NOT_FOUND":
        case "OPPONENT_CARD_HAS_STEALTH":
        case "CARD_NOT_FOUND":
        case "ERROR_PROCESSING_ACTION":
        case "INTERNAL_ACTION_ERROR":
        case "HERO_POWER_ALREADY_USED":
            showErrorMessage(data);
            break;
        default:
            updateState(data);
    }
})
}
const updateState = (data) => {
    if(data["yourTurn"]) {
        setCardInZone(data.board, ".player-board");
        setCardInZone(data.hand, ".player-hand", data["mp"]);
        setCardInZone(data["opponent"]["board"], ".opponent-board");
        showLatestAction(data["latestActions"]);
        setOpponentInfo(data["opponent"]);
        setPicTurn(data["yourTurn"]);
        setPlayerInfo(data["mp"], data["hp"], data["remainingCardsCount"]);
        setTurnTime(data["remainingTurnTime"]);
        setInfoSide(data["opponent"], data["heroClass"]);
        uid = null;
        targetuid = null;
    }
}

const addCardDB = (id_card, player) => {
    let formData = new FormData();
    formData.append("id_card", id_card);
    formData.append("player", player);

    fetch("ajax-data.php", {
        method: "post",
        body: formData
    })
}

const showErrorMessage = (message) => {
    let node = document.getElementsByClassName("errorMessage")[0];
    node.innerHTML = message;
    node.style.display = "block";

    setTimeout(function() {
        node.style.display = "none";

        if(message == "LAST_GAME_WON" || message  == "LAST_GAME_LOST") 
            location.href = "lobby.php";

    }, 3000);
}

const toggleActions = () => {
    let node = document.getElementsByClassName("latestAction")[0];
    if (node.style.display == "none")
        node.style.display = "block";
    else 
        node.style.display = "none";
}

function toggleChat() {
    var chatBox = document.querySelector('.chat-container'); 

    // If chat is visible, slide it out
    if(chatBox.style.left !== "-700px") { 
        chatBox.style.left = "-1000px"; 
    } else {
        chatBox.style.left = "0"; // slide back in
    }
}