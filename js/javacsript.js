const applyStyles = iframe => {
	let styles = {
		fontColor : "#333",
		backgroundColor : "rgba(87, 41, 5, 0.2)",
		fontGoogleName : "Sofia",
		fontSize : "20px",
		hideIcons : false ,
		inputBackgroundColor : "pink",
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


const updateCards = (data) => {
    let parent = document.querySelector(".favorites-container");
    let row = document.createElement("tr");
    let table = document.createElement("table");
    let head = ["player", "id", "usage", "percentage"];

    let total = 0;

    for (let i = 0; i < data.length; i++) {
        total += data[i]["cards_by_id"];
    }

    parent.innerHTML = ""

    for(let i = 0; i < head.length; i++) {
        let th = document.createElement("th");
        th.className = "item-node";
        let txt = document.createTextNode(head[i]);
        th.append(txt);
        row.append(th);
    }

    table.append(row);

    for (let item in data) {
        let row = document.createElement("tr");

        let cell1 = document.createElement("td");
        let cell2 = document.createElement("td");
        let cell3 = document.createElement("td");
        let cell4 = document.createElement("td")

        cell1.className = "item-node";
        cell2.className = "item-node";
        cell3.className = "item-node";
        cell4.className = "item-node";

        let player = document.createTextNode(data[item].player);
        let idCard = document.createTextNode(data[item].id_card)
        let cardId = document.createTextNode(data[item].cards_by_id)
        let percentage = document.createTextNode((data[item].cards_by_id/total * 100).toFixed(2) + " %")

        if(data[item].player == null) {
            cell1.append("n/a");
        }
        else {
            cell1.append(player);
        }

        cell2.append(idCard);
        cell3.append(cardId)
        cell4.append(percentage)

        row.append(cell1);
        row.append(cell2);
        row.append(cell3);
        row.append(cell4);

        table.append(row);
    }

    parent.append(table);
}


var localUsername = localStorage.getItem("local_username");

var usernamePlaceholder = document.getElementById('username-placeholder');
if (usernamePlaceholder) {
    usernamePlaceholder.innerText = localUsername || '';
}