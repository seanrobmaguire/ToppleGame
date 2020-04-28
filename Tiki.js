
let players = [];
let board = [];
let score = 0;

let tikis = [
				[
					{name:"Lokahi"},
					{name:"Nui"}, 
					{name:"Akamai"}
				], 
				[
					{name:"Hookipa"}, 
					{name:"Kapu"}, 
					{name:"Eepo"}
				], 
				[
					{name:"Nami"}, 
					{name:"Huhu"}, 
					{name:"Wikiwiki"}
				]
			];
let deck = [
//add instruction
	{name:"Tiki up 1", id: "card1"},
	{name:"Tiki up 1", id: "card2"},
	{name:"Tiki up 2", id: "card3"},
	{name:"Tiki up 3", id: "card4"},
	{name:"Tiki Topple", id: "card5"},
	{name:"Tiki Toast", id: "card6"},
	{name:"Tiki Toast", id: "card7"}

];

let secretTikiCard = [];

let chosenCard;
let chosenTiki;

/*--------------------------------------
			RUN 
---------------------------------------*/

function setupGame(){
	console.log("setup");
	
	board = placeTikis(9, 3);
	togglePlayerModal();
	console.log("return to setup");

	showBoard();
	//showSecretTikiCard();

	

}

/*--------------------------------------
			SETUP GAME
---------------------------------------*/

//set player number
function togglePlayerModal(){
	let modal = document.getElementById("playerNoModal");
		modal.classList.toggle("show");
}

function setPlayerNo(){
	players.length = document.getElementById("playerNo").value;
	togglePlayerModal();
	createPlayers();
}

//create player and area
function createPlayers(){
	console.log("createPlayers");
	for(let counter = 0; counter < players.length; counter++){
		let player = {};
		player.id = (counter+1);
		player.secretCard=placeTikis(3, 1);
		
		// player.secretTikiCard = [...output];
		players[counter] = player;
		player.actionCards = [...deck];
		player.score = 0;
		console.log(players[counter]);
		createPlayerArea(players[counter]);
	}

	
}

function createPlayerArea(player){
	//create secret tiki card
	//create playbutton
	//create action deck
	

	let playerArea= document.createElement("div");
	playerArea.setAttribute("id", "player"+player.id);
	playerArea.setAttribute("class", "player");

	//player name
	let playerHeader = document.createElement("div");
	playerHeader.setAttribute("class", "playerHeader");
	playerHeader.setAttribute("id", "player"+player.id+"Header");

	let playerHeaderName 
	let headerText = document.createTextNode("Player "+player.id);
	
	playerHeader.appendChild(headerText);

	//player score
	let playerHeaderScore = document.createElement("div");
	playerHeaderScore.setAttribute("class", "playerHeaderScore");
	let headerScore = document.createTextNode("Score: "+player.id);
	playerHeaderScore.appendChild(headerScore);

	playerHeader.appendChild(playerHeaderScore);

	let playerBody= document.createElement("div");
	playerBody.setAttribute("class", "playerBody");
	playerBody.setAttribute("id", "player"+player.id+"Body");
	
	//top area contains secret card and play button
	let playerAreaTop = document.createElement("div");
	playerAreaTop.setAttribute("id", "player"+player.id+"Top");
	playerAreaTop.setAttribute("class", "playerTop");

	//make secret card
	let secretCard = showSecretTikiCard(player.secretCard);
	
	playerAreaTop.appendChild(secretCard);

	//make play button
	let button = document.createElement("input");
	button.setAttribute("type", "button");
	button.setAttribute("id", player.id+"PlayButton");
	button.setAttribute("onclick", "clickPlay()");  //this should pass player and card and tiki
	button.setAttribute("value", "Play");
	playerAreaTop.appendChild(button);

	//botom area contains action deck
	let playerAreaBottom = document.createElement("div");
	playerAreaBottom.setAttribute("id", "player"+player.id+"bottom");
	playerAreaBottom.setAttribute("class", "playerBottom");
	
	//make action deck
	let actionDeck = showActionDeck(player.actionCards);

	playerAreaBottom.appendChild(actionDeck);
	
	playerArea.appendChild(playerHeader);
	playerArea.appendChild(playerBody);
	playerBody.appendChild(playerAreaTop);
	playerBody.appendChild(playerAreaBottom);

	// let card = document.createElement("div");
	// 	card.setAttribute("id", deck[counter].id);
	// 	card.setAttribute("onclick", "setSelectedCard(this)");
	// 	card.setAttribute("class", "actionCard");
	// 	let cardContent = document.createTextNode(deck[counter].name);
	// 	card.appendChild(cardContent);
		
	document.getElementById("playArea").appendChild(playerArea);

}

function showActionDeck(actionCards){
	let deck = document.createElement("div");
	deck.setAttribute("class", "pack");
	for(let counter = 0; counter < actionCards.length; counter++){
		
		let card = document.createElement("div");
		card.setAttribute("id", actionCards[counter].id);
		card.setAttribute("onclick", "setSelectedCard(this)");
		card.setAttribute("class", "actionCard");
		let cardContent = document.createElement("div");
		cardContent.setAttribute("class", "cardContent");
		let sideText = document.createElement("h4");
		sideText.setAttribute("class", "sideText");
		let sideTextContent = document.createTextNode(actionCards[counter].name);
		sideText.appendChild(sideTextContent);
		card.appendChild(sideText);

		card.appendChild(cardContent);
		deck.appendChild(card);
		
	}
	return deck;
}

function showSecretTikiCard(secretCard){
	console.log("SECRETCARD" +secretCard);
		let secretTikiCard = document.createElement("div");
		secretTikiCard.setAttribute("class", "secretTikiCard");

	for(let counter = 0; counter < secretCard.length; counter++){
		
		let secretCardRow = document.createElement("div");
		secretCardRow.setAttribute("class", "secretCardRow");

		secretCardRow.setAttribute("id", secretCard[counter].name);
		

		let secretContent = document.createTextNode(secretCard[counter].name);
		secretCardRow.appendChild(secretContent);
		secretTikiCard.appendChild(secretCardRow);
	
	}
	return secretTikiCard;
}



function placeTikis(sizeOuter, sizeInner){ //lengths
	console.log("place tikis");
	let output=[];
	let usedNumber = [];
	while(output.length < sizeOuter){
		let num = Math.floor(Math.random() * 3); 
		
		if(usedNumber.includes(num)){
			continue;
		}else{
			usedNumber.push(num);
			let usedTiki = [];
			while(usedTiki.length < sizeInner){
				let numTiki = Math.floor(Math.random() * 3);

				if(usedTiki.includes(numTiki)){
					continue;
				}else{
					usedTiki.push(numTiki);
					output.push(tikis[num][numTiki]);
				}
			}
		}
	}
	console.log(output);
	return output;
	
}

//Function to place tikis on the board or create secret tiki card
//pass board and board length or secret tiki card and no of slots
// function placeTikis(destination, sizeOuter, sizeInner){
// 	let usedNumber = [];
// 	while(destination.length < sizeOuter){
// 		let num = Math.floor(Math.random() * 3); 
		
// 		if(usedNumber.includes(num)){
// 			continue;
// 		}else{
// 			usedNumber.push(num);
// 			let usedTiki = [];
// 			while(usedTiki.length < sizeInner){
// 				let numTiki = Math.floor(Math.random() * 3);

// 				if(usedTiki.includes(numTiki)){
// 					console.log("already tiki in" + numTiki);
// 				}else{
// 					usedTiki.push(numTiki);
// 					destination.push(tikis[num][numTiki]);
// 				}
// 			}
// 		}
// 	}
// }

function showBoard(){
	for(let counter = 0; counter < board.length; counter++){
		console.log("Board: "+counter + " "+ board[counter].name);
		let tiki = document.createElement("div");
		tiki.setAttribute("id", board[counter].name);
		tiki.setAttribute("class", "tikiPiece");
		tiki.setAttribute("onclick", "setSelectedTiki(this)")
		let tikiContent = document.createTextNode(board[counter].name);
		tiki.appendChild(tikiContent);
		document.getElementById("boardContainer").appendChild(tiki);
	}
}





//SCORE TRACK
function createScoreTrack(){
	for(let counter = 0; counter<= 35; counter++){
		let number = (counter == 0) ? "Start" : counter;
	
		scoreTrack[counter] = {
			num: number,
			player: null
		}
	}
}

function showScoreTrack(){
	for(let counter = 0; counter< scoreTrack.length; counter++){
		let score = document.createElement("div");
		score.setAttribute("id", "scoreTrack"+scoreTrack[counter].num);
		score.setAttribute("class", "scoreTrackSquare");
		let scoreContent = document.createTextNode(scoreTrack[counter].num);
		score.appendChild(scoreContent);

		document.getElementById("scoreTrack").appendChild(score);
	}
	
}


/*--------------------------------------
			GAMEPLAY
---------------------------------------*/
// var x = document.getElementById("body");
// x.addEventListener("click", enableButton);

function enableButton() {
	if(chosenTiki != null && chosenCard != null){
		document.getElementById("playButton").disabled=false;
	}else{
		document.getElementById("playButton").disabled=true;
	}
  
}

function clickPlay(){
	playCard();
	chosenTiki=null;
	chosenCard=null;
	let button = document.getElementById("playButton").disabled=true;

}

function setSelectedTiki(tiki){
	//if tikitopple selected remove card as it only applies to last tiki
	if(chosenCard == "card7" || chosenCard == "card6"){
		unsetCard();
		chosenCard=null;
	}
	//clicked already active to remove active status
	if(tiki.id == chosenTiki){
		tiki.classList.remove("active");
		chosenTiki = null;
	}else{
		//remove active from all others.
		unsetSelectedTiki()
	chosenTiki = tiki.id;
	tiki.classList.add("active");
	}
}

function unsetSelectedTiki(){
	//remove active from all others.
		let clickedTiki = document.getElementsByClassName("tikiPiece");
		for (var i = clickedTiki.length - 1; i >= 0; i--) {
			if(clickedTiki[i].classList.contains("active")){
			clickedTiki[i].classList.remove("active");
		}
	}
}

function setSelectedCard(card){
	//tiki toast auto set last tiki
	if(card.id == "card7" || card.id == "card6"){
		let clickedTiki = document.getElementsByClassName("tikiPiece");
		setSelectedTiki(clickedTiki[clickedTiki.length-1]);
	}
	if(card.id == chosenCard){
		card.classList.remove("active");
		chosenCard=null;
	}else{
		unsetCard();
		chosenCard = card.id;
		card.classList.add("active");
	}
	
}

function unsetCard(){
	let actionCard = document.getElementsByClassName("actionCard");
		for (let loop = 0; loop < actionCard.length;loop++) {
			if(actionCard[loop].classList.contains("active")){
				actionCard[loop].classList.remove("active");
			}
		}
}
function tikiToast(){
 	let clickedTiki = document.getElementsByClassName("tikiPiece");
 	clickedTiki[clickedTiki.length - 1].classList.add("active");
}

function playCard(){
	let indexTiki = board.findIndex(getTikiIndex);
	console.log("indexTiki "+ board[indexTiki].name );
	switch (chosenCard){
		case "card7": //tiki toast
			board.pop();
			removeCard();
			break;
		case "card6"://tiki toast
			board.pop();
			removeCard();
			break;
		case "card5": //tikitopple
			let remove = board[indexTiki];
			board.splice(indexTiki, 1);
			board.push(remove);
			removeCard();
			break;
		case "card4": //up 3
			if(indexTiki <3){
				alert("NO");
			}else{
				let move = board[indexTiki];
				board.splice(indexTiki, 1);
				board.splice((indexTiki - 3),0, move);
				removeCard();
			}
			break;
		case "card3": //up2
			if(indexTiki < 2){
				alert("No");
			}else{
				let move = board[indexTiki];
				board.splice(indexTiki, 1);
				board.splice((indexTiki - 2),0,move);
				removeCard();
			}
			break;
		case "card2": //up 1
			if(indexTiki < 1){
				alert("No");
			}else{
				let move = board[indexTiki];
				board.splice(indexTiki, 1);
				board.splice((indexTiki - 1),0,move);
				removeCard();
				console.log("chosentiki :"+chosenTiki+ ' chosenCard '+ chosenCard);
			}
			break;
		case "card1": //up1
			if(indexTiki < 1){
				alert("No");
			}else{
				let move = board[indexTiki];
				board.splice(indexTiki, 1);
				board.splice((indexTiki - 1),0,move);
				removeCard();
				console.log("chosentiki :"+chosenTiki+ ' chosenCard '+ chosenCard);
			}
			break;

	}
	
	document.getElementById('boardContainer').innerHTML = '';
	showBoard();

	
}


//remove played card from deck
function removeCard(){
	let index = deck.findIndex(getCardIndex);
	deck.splice(index, 1);
	document.getElementById('pack').innerHTML = '';
	showActionDeck();
	
}
// find the index
function getCardIndex(card){
  return card.id == chosenCard;
}
function getTikiIndex(tiki){
	return tiki.name == chosenTiki;
}

//Show secret card
function showSecretCard(card){
	card.classList.add("show");
}

function hideSecretCard(card){
	card.classList.remove("show");
}


/*---------------------------------------------
		SCORING
----------------------------------------------*/
function calculateScore(){
	console.log("score" + secretTikiCard);
	//comapre positions of tiki to secret card
	console.log(secretTikiCard[0].name +", "+secretTikiCard[1].name +", "+ secretTikiCard[2].name);
	if(secretTikiCard[0] == board[0]){
		score += 9;
	}
	if(secretTikiCard[1] == board[1] || secretTikiCard[1] == board[0] ){
		score+=5;
	}
	if(secretTikiCard[2] == board[2] || secretTikiCard[2] == board[1]  || secretTikiCard[2] == board[0]  ){
		score+=2;
	}
	document.getElementById('scoreDisplay').innerHTML = score;
	

}


/*==================================
		TEST
==================================*/
function front(testCard){
	console.log(testCard.id);
	let testCards = document.getElementsByClassName("testCard");
	for(let counter = 0; counter < testCards.length; counter++){
		if(testCards[counter].classList.contains("front")){
			testCards[counter].classList.remove("front");
		}
	}
	
	

	document.getElementById(testCard.id).classList.add("front");
}

