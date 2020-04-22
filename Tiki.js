let board = [];
let tikis = [
				[
					{name:"Lokahi", color:""},
					{name:"Nui", color:""}, 
					{name:"Akamai", color:""}
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
	{name:"Tiki up 1"},
	{name:"Tiki up 1"},
	{name:"Tiki up 2"},
	{name:"Tiki up 3"},
	{name:"Tiki Topple"},
	{name:"Tiki Toast"},
	{name:"Tiki Toast"}

];

let chosenCard;
let chosenTiki;

function setupGame(){
	placeTikis();
	showDeck();

}

var x = document.getElementById("body");
x.addEventListener("click", enableButton);

function enableButton() {
	if(chosenTiki != null && chosenCard != null){
		let button = document.getElementById("playButton").disabled=false;
	}
  
}

function clickPlay(){
	alert("you played "+chosenCard+" on "+chosenTiki );
	chosenTiki=null;
	chosenCard=null;
	let button = document.getElementById("playButton").disabled=true;

}



function placeTikis(){
	let usedNumber = [];
	
	while(board.length < 9){
		let num = Math.floor(Math.random() * 3); 
		
		if(usedNumber.includes(num)){
			console.log("already in"+ num);
		}else{
			usedNumber.push(num);
			let usedTiki = [];
			while(usedTiki.length < 3){
				let numTiki = Math.floor(Math.random() * 3);

				if(usedTiki.includes(numTiki)){
					console.log("already tiki in" + numTiki);
				}else{
					usedTiki.push(numTiki);
					board.push(tikis[num][numTiki]);
				}
			}
		}
		
		
		

	}
	console.log("Finished" + board + " board length:" + board.length);
showBoard()
}

function showBoard(){
	
	for(let counter = 0; counter < board.length; counter++){
		let tiki = document.createElement("div");
		tiki.setAttribute("id", board[counter].name);
		tiki.setAttribute("class", "tikiPiece");
		tiki.setAttribute("onclick", "setSelectedTiki(this)")
		let tikiContent = document.createTextNode(board[counter].name);
		tiki.appendChild(tikiContent);
		document.getElementById("boardContainer").appendChild(tiki);


	}
	
}

function showDeck(){
	for(let counter = 0; counter < deck.length; counter++){
		let card = document.createElement("div");
		card.setAttribute("id", deck[counter].name);
		card.setAttribute("onclick", "setSelectedCard(this)");
		card.setAttribute("class", "actionCard");
		let cardContent = document.createTextNode(deck[counter].name);
		card.appendChild(cardContent);
		document.getElementById("pack").appendChild(card);

	}
}

function setSelectedTiki(tiki){
	chosenTiki = tiki.id;
	let clickedTiki = document.getElementsByClassName("tikiPiece");
	for (var i = clickedTiki.length - 1; i >= 0; i--) {
		if(clickedTiki[i].classList.contains("active")){
			clickedTiki[i].classList.remove("active");
		}
	}
	chosenTiki = tiki.id;
	tiki.classList.add("active");
}

function setSelectedCard(card){
	let actionCard = document.getElementsByClassName("actionCard");
	for (let loop = 0; loop < actionCard.length;loop++) {
		if(actionCard[loop].classList.contains("active")){
			actionCard[loop].classList.remove("active");
		}
	}
	chosenCard = card.id;
	card.classList.add("active");
}


