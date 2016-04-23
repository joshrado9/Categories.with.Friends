
//the submit function

function submit() {
	//alert("Submitted!");
	var thing = document.getElementById("one").value;
	document.getElementById("five").value = thing;
}

function checkTime(time) {
	
	var updateTime = (new Date()).getMilliseconds();
	while((updateTime - time) < 120000) {
		
	}
	
}

//this gets the random letter from the server
function getLetter() {
	
}
var currTime = (new Date()).getMilliseconds();
checkTime(currTime);
