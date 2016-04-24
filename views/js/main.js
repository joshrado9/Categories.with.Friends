
//the submit function
function submit() {
	//alert("Submitted!");
	var thing = document.getElementById("one").value;
	document.getElementById("five").value = thing;
}

var vari;
function checkTime() {

	var d = new Date();
	var value = 0;
	console.log("Ti");
	vari = setInterval(changeTime, 1000, value);
	//clearInterval(vari);

}
var time = 0;
function changeTime(value) {
	
   console.log("Time Diff"+  time);
   //format correctly
   	 
   
   //update UI
   document.getElementById("timer").value = time;
   time++;
   if(time == 121) {
   		clearInterval(vari);
   		
   }

}


function start() {
	//hide the button and the title
	document.getElementById("ready").style.display = "none";
	document.getElementById("cate").style.display = "none";

	//document.getElementById("score").style.display = "block";

	
	//display the relevent things
	$("#score").fadeIn();
	$("#power").fadeIn();
	$("#inputting").fadeIn();
	
	
//	console.log(d.toLocaleTimeString()+" "+ document.getElementById("score").innnerHTML);
	setTimeout(checkTime, 1000);


}



//this gets the random letter from the server
function getLetter() {
	
}



