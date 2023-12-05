
let user = null;
let targetEnnemie = null;
let type = null;
let updateHand = true;
let updateBoard = false;
// let firstUpdate = true;
let carteSelectionne = null;
let idDB = 0;

let heroPower = document.getElementById("heroPower");

heroPower.onclick = () => {
    action('HERO_POWER', 'games/action')
    updateBoard = true;
}


const state = () => {

	fetch("ajax-state.php", {   
 method : "POST"       
	})
.then(response => response.json())
.then(data => {
    console.log(data)
    switch(data) {
        case "WAITING":
            messageErreur("la partie n'a pas encore commencé");
            break;
        case "LAST_GAME_WON":
            messageErreur("Vous avez gagner");
            break;
        case "LAST_GAME_LOST":
            messageErreur("Vous avez perdu");
            break;
        default:
            setCardBoard(data.board, ".player-board");
            setCardBoard(data.hand, ".player-hand", data["mp"]);
            setCardBoard(data["opponent"]["board"], ".opponent-board");
            showLatestAction(data["latestActions"]);
           
            setUserInfo(data["mp"], data["hp"], data["remainingCardsCount"]);
            setTemps(data["remainingTurnTime"]);
            setInfo(data["opponent"], data["heroClass"]);
    }
    

    
	setTimeout(state, 1000); 
	})

}
window.addEventListener("load", () => {
    setTimeout(state, 1000); 
    }
    
);
const updateState = (data) => {
    if(data["yourTurn"]) {
        setCardBoard(data.board, ".player-board");
        setCardBoard(data.hand, ".player-hand", data["mp"]);
        setCardBoard(data["opponent"]["board"], ".opponent-board");
        showLatestAction(data["latestActions"]);
        setOpponentInfo(data["opponent"]);
        setPicTurn(data["yourTurn"]);
        setUserInfo(data["mp"], data["hp"], data["remainingCardsCount"]);
        setTemps(data["remainingTurnTime"]);
        setInfo(data["opponent"], data["heroClass"]);
        user = null;
        targetEnnemie = null;
    }
}
    

const action = (type, callType) => {
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
                messageErreur(data);
                break;
            default:
                updateState(data);
        }
    })
}

const actionCarte = (type,user) => {
    let formData = new FormData();

	formData.append("type", type);
    formData.append("uid", user);
    formData.append("targetuid", targetEnnemie);

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
            messageErreur(data);
            break;
        default:
            updateState(data);
    }
})
}


const showLatestAction = (actions) => {
    let node = document.getElementsByClassName("latestAction")[0];

    node.innerHTML = "";

    if (actions.length > 0) {
        if (actions[actions.length -1]["id"] != idDB) {

            idDB = actions[actions.length -1]["id"];

            if (actions[actions.length -1]["action"]["type"] == "PLAY") 
                addCardDB(actions[actions.length -1]["action"]["id"], actions[actions.length -1]["from"]);
        }
    }

    for (let i in actions) {
        let p = document.createElement("p");
        item = actions[i];
        p.append(item.from + " : " + item["action"].type)
        node.append(p);
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




// const addCardDB = (id_card, player) => {
//     let formData = new FormData();
//     formData.append("id_card", id_card);
//     formData.append("player", player);

//     fetch("ajax-data.php", {
//         method: "post",
//         body: formData
//     })
// }

const messageErreur = (message) => {
    let node = document.getElementsByClassName("errorMessage")[0];
    node.innerHTML = message;
    node.style.display = "block";

    setTimeout(function() {
        node.style.display = "none";

        if(message == "LAST_GAME_WON" || message  == "LAST_GAME_LOST") 
            location.href = "lobby.php";

    }, 2000);
}


const toggleChat = () => {
    let node = document.getElementsByClassName("chat-container")[0];
    if (node.style.display == "none"){ 
        node.style.display = "block";
        chatBox.style.top = "700px"; 
    }
    else{ 
        node.style.display = "none";
        chatBox.style.left = "0";
    } 
}

const toggleActions = () => {
    let node = document.getElementsByClassName("latestAction")[0];
    if (node.style.display == "none")
        node.style.display = "block";
    else 
        node.style.display = "none";
}

const setCardBoard = (zone, query, mp) => {
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
        
        cardNode.style.backgroundImage = "url('./images/DeckCards/carte" + zone[card].id + ".png')";
           


        hpNode.append(hp);
        atkNode.append(atk);
        costNode.append(cost);

        numberNode.append(hpNode);
        numberNode.append(atkNode);
        numberNode.append(costNode);

        if(zone[card].mechanics.includes("Charge")) {
            // iconNode1.style.backgroundImage = "url('./image/icons/fist.png')";
            iconNode1.className = "icon-card";
        }

        if (zone[card].mechanics.length > 0) {
            if(zone[card].mechanics[0].includes("Deathrattle")) {
                // iconNode2.style.backgroundImage = "url('./image/icons/skull.png')";
                iconNode2.className = "icon-card";
            }
        }
            
        if(zone[card].mechanics.includes("Taunt")) {
            // iconNode3.style.backgroundImage = "url('./image/icons/shield.png')";
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
                user = zone[card].uid;
                type = "PLAY";
                actionCarte(type,user);
                console.log("click go ")
            }
        }
        else if (query == ".player-board") {
            if (zone[card].state == "SLEEP")
                cardNode.style.opacity = "0.5"

            if (zone[card].uid == user)
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
                    messageErreur("CARD_IS_SLEEPING");
                }
                else {
                    user = zone[card].uid;
                    cardNode.style.boxShadow = "0 0 5px 6px rgba(243, 190, 34, 1)";
                }
            }
        }
        else if (query == ".opponent-board") {
            if(zone[card].mechanics.includes("Stealth")) {
                // cardNode.style.backgroundImage = "url('./image/icons/back.png')";
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
                targetEnnemie = zone[card].uid;
                type = "ATTACK";
                updateBoard = true;
                actionCarte();
            }
        }
    
        handNode.append(cardNode);
    }
}


const setInfo = (opponent, playerClass) => {
    let opponentNameNode = document.querySelector(".opponent-name");
    let opponentPicNode = document.querySelector(".opponent-pic");
    let opponentClassNode = document.querySelector(".opponent-class");
    let playerClassNode = document.querySelector(".player-class");

    opponentPicNode.onclick = () => {
        targetEnnemie = 0;
        updateBoard = true;
        type = "ATTACK";
        actionCarte();
    }

    opponentNameNode.innerHTML = "";
    opponentClassNode.innerHTML = "";
    playerClassNode.innerHTML = "";

    opponentNameNode.append(opponent["username"]);
    opponentClassNode.append(opponent["heroClass"]);
    playerClassNode.append(playerClass);
}

const setOpponentInfo = (infos) => {
   
    
  
    let handNode = document.querySelector(".opponent-hand");
    handNode.innerHTML = "";

    for (let i = 0; i < infos["handSize"]; i++) {
        let cardNode = document.createElement("div");
        cardNode.className = "oCardNode";
        handNode.append(cardNode);
    }


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




const setTemps = (time) => {
    let tempsNode = document.querySelector(".time-node");
    tempsNode.innerHTML = "";
    tempsNode.append(time);
}

const setUserInfo = (heroMp, hp, deckCount, ) => {
    let vieNode = document.querySelector(".player-health");
    let deckNode = document.querySelector(".player-deck");
    let heroMpNode = document.querySelector(".player-mp");

    vieNode.innerHTML = "";
    deckNode.innerHTML = "";
    heroMpNode.innerHTML = "";

    vieNode.append(hp);
    deckNode.append(deckCount);
    heroMpNode.append(heroMp);
}

