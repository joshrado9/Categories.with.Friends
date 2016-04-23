
//the submit function
function submit() {
	//alert("Submitted!");
	var thing = document.getElementById("one").value;
	document.getElementById("five").value = thing;
}
function checkTime() {
	var d = new Date();
	var currTime = d.getMilliseconds();
	document.getElementById("score").innnerHTML = d.toLocaleTimeString();
	
}

function start() {
	//hide the button and the title
	document.getElementById("ready").style.display = "none";
	document.getElementById("cate").style.display = "none";

	document.getElementById("score").style.display = "block";

	
	//display the relevent things
	//$("#score").fadeIn();
	//$("#power").fadeIn();
	//$("#inputting").fadeIn();
	
	
		
	var inner = document.getElementById("score");
	var d = new Date();
	inner.innnerHTML = d.toLocaleTimeString();	
	
	console.log(d.toLocaleTimeString()+" "+ document.getElementById("score").innnerHTML);


}



//this gets the random letter from the server
function getLetter() {
	
}



