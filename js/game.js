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
    
    console.log(chatBox.style.left);
    if(chatBox.style.left !== "-700px") { 
        chatBox.style.left = "-1000px"; 
    } else {
        chatBox.style.left = "0"; // slide back in
        console.log(chatBox.style.left);
    }
    console.log(chatBox.style.left);
}

const setCardInZone = (zone, query, mp) => {
    let handNode = document.querySelector(query);
    handNode.innerHTML = "";

    for (let card in zone) {
        let cardNode = document.createElement("div");
        let numberNode = document.createElement("div");
        let hpNode = document.createElement("div");
        let atkNode = document.createElement("div");
        let costNode = document.createElement("div");
        let mechParent = document.createElement("div");
        let mechNode = document.createElement("div");
        let hp = document.createElement("p");
        let atk = document.createElement("p");
        let cost = document.createElement("p");
        let iconNode1 = document.createElement("div");
        let iconNode2 = document.createElement("div");
        let iconNode3 = document.createElement("div");
        let iconParent = document.createElement("div");

        hp.innerHTML = zone[card].hp;
        atk.innerHTML = zone[card].atk;
        cost.innerHTML = zone[card].cost;
        mechNode.innerHTML = zone[card].mechanics;

        cardNode.className = "cardNode";
        numberNode.className = "numberNode";
        hpNode.className = "hpCard";
        atkNode.className = "atkCard";
        costNode.className = "costCard";
        mechNode.className = "mechCard";
        iconParent.className = "icon-parent";
        mechParent.className = "mech-parent";
        
        cardNode.style.backgroundImage = "url('./image/cards/carte" + zone[card].id + ".png')";

        hpNode.append(hp);
        atkNode.append(atk);
        costNode.append(cost);

        numberNode.append(hpNode);
        numberNode.append(atkNode);
        numberNode.append(costNode);

        if(zone[card].mechanics.includes("Charge")) {
            iconNode1.style.backgroundImage = "url('./image/icons/fist.png')";
            iconNode1.className = "icon-card";
        }

        if (zone[card].mechanics.length > 0) {
            if(zone[card].mechanics[0].includes("Deathrattle")) {
                iconNode2.style.backgroundImage = "url('./image/icons/skull.png')";
                iconNode2.className = "icon-card";
            }
        }
            
        if(zone[card].mechanics.includes("Taunt")) {
            iconNode3.style.backgroundImage = "url('./image/icons/shield.png')";
            iconNode3.className = "icon-card";
        }


        if(query == ".player-hand") {
            if (mp >= zone[card].cost) 
                cardNode.style.boxShadow = "0 0 4px 3px rgba(204, 227, 244, 0.8)";
            else
                cardNode.style.opacity = "0.5"

            cardNode.append(mechNode);

            if(iconNode1.className == "icon-card")
                iconParent.append(iconNode1);

            if(iconNode3.className == "icon-card")
                iconParent.append(iconNode3);

            if(iconNode2.className == "icon-card")
                iconParent.append(iconNode2);
            
            cardNode.append(iconParent);
            cardNode.append(numberNode);

            cardNode.onclick = () => {
                updateBoard = true;
                uid = zone[card].uid;
                type = "PLAY";
                actionCard();
            }
        }
        else if (query == ".player-board") {
            if (zone[card].state == "SLEEP")
                cardNode.style.opacity = "0.5"

            if (zone[card].uid == uid)
                cardNode.style.boxShadow = "0 0 5px 6px rgba(243, 190, 34, 1)";

            cardNode.append(mechNode);

            if(iconNode1.className == "icon-card")
                iconParent.append(iconNode1);

            if(iconNode3.className == "icon-card")
                iconParent.append(iconNode3);

            if(iconNode2.className == "icon-card")
                iconParent.append(iconNode2);

            cardNode.append(iconParent);
            cardNode.append(numberNode);

            cardNode.onclick = () => {
                if (zone[card].state == "SLEEP") {
                    showErrorMessage("CARD_IS_SLEEPING");
                }
                else {
                    uid = zone[card].uid;
                    cardNode.style.boxShadow = "0 0 5px 6px rgba(243, 190, 34, 1)";
                }
            }
        }
        else if (query == ".opponent-board") {
            if(zone[card].mechanics.includes("Stealth")) {
                cardNode.style.backgroundImage = "url('./image/icons/back.png')";
                cardNode.style.opacity = "0.5"
            }
            else {
                cardNode.append(mechNode);

                if(iconNode1.className == "icon-card")
                    iconParent.append(iconNode1);

                if(iconNode3.className == "icon-card")
                    iconParent.append(iconNode3);

                if(iconNode2.className == "icon-card")
                    iconParent.append(iconNode2);

                cardNode.append(iconParent);
                cardNode.append(numberNode);
            }
            
            cardNode.onclick = () => {
                targetuid = zone[card].uid;
                type = "ATTACK";
                updateBoard = true;
                actionCard();
            }
        }
    
        handNode.append(cardNode);
    }
}

const setInfoSide = (opponent, playerClass) => {
    let opponentNameNode = document.querySelector(".opponent-name");
    let opponentPicNode = document.querySelector(".opponent-pic");
    let opponentClassNode = document.querySelector(".opponent-class");
    let playerClassNode = document.querySelector(".player-class");

    opponentPicNode.onclick = () => {
        targetuid = 0;
        updateBoard = true;
        type = "ATTACK";
        actionCard();
    }

    opponentNameNode.innerHTML = "";
    opponentClassNode.innerHTML = "";
    playerClassNode.innerHTML = "";

    opponentNameNode.append(opponent["username"]);
    opponentClassNode.append(opponent["heroClass"]);
    playerClassNode.append(playerClass);
// }


const setOpponentInfo = (infos) => {
    // 13.	welcomeText: "None shall pass"
    
        // Les cartes dans sa main
        let handNode = document.querySelector(".opponent-hand");
        handNode.innerHTML = "";
    
        for (let i = 0; i < infos["handSize"]; i++) {
            let cardNode = document.createElement("div");
            cardNode.className = "oCardNode";
            handNode.append(cardNode);
        }
    
        // Les infos vitales
        let healthNode = document.querySelector(".opponent-health");
        let deckNode = document.querySelector(".opponent-deck");
        let heroMpNode = document.querySelector(".opponent-mp");
    
        healthNode.innerHTML = "";
        deckNode.innerHTML = "";
        heroMpNode.innerHTML = "";
    
        healthNode.append(infos["hp"]);
        deckNode.append(infos["remainingCardsCount"]);
        heroMpNode.append(infos["mp"]);
    }

    const setPicTurn = (turn) => {
        let picNode = document.querySelector(".turn-pic");
    
        if(turn) {
            // picNode.style.backgroundImage = "url('./image/cards/player.png')";
        }
        else {
            // picNode.style.backgroundImage = "url('./image/cards/opponent.png')";
        }
    }
    
    const setTurnTime = (time) => {
        let timeNode = document.querySelector(".time-node");
        timeNode.innerHTML = "";
        timeNode.append(time);
    }
    
    const setPlayerInfo = (heroMp, hp, deckCount, ) => {
        let healthNode = document.querySelector(".player-health");
        let deckNode = document.querySelector(".player-deck");
        let heroMpNode = document.querySelector(".player-mp");
    
        healthNode.innerHTML = "";
        deckNode.innerHTML = "";
        heroMpNode.innerHTML = "";
    
        healthNode.append(hp);
        deckNode.append(deckCount);
        heroMpNode.append(heroMp);
    }
    
    




window.addEventListener("load", () => {
    let node = document.querySelector("input");
    node.onkeyup = () => {
        let formData = new FormData();
        formData.append("opponentSide", node.value);

        fetch("ajax.php", {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            let newNode = document.createElement("div");
            newNode.innerText = data;

            let parentNode = document.querySelector("#opponent-side");
            parentNode.append(newNode);
            console.log(data);    
        })
    }
})
}