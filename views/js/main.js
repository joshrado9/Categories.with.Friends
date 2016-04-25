

var time = 120;
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
	
	clearTimeout(branch);
	
	vari = setInterval(changeTime, 1000, value);

	//clearInterval(vari);

}

function changeTime(value) {
	
   console.log("Time Diff"+  time);
   //format correctly
   var min =Math.floor(time/60);
   var sec = time%60;
   //add th ezero padding
   if(sec < 10)
     sec = "0"+sec;
   
   //update UI
   document.getElementById("timer").value = min+":"+sec;
   time--;
   if(time == ) {
   		clearInterval(vari);
   		alert('Time is up! ');
   		//switch pages now!!  
   		window.location.href = "http://stackoverflow.com";

   }

}

var branch;
function start() {
	
	//db calls
	
	
	//hide the button and the title
	document.getElementById("ready").style.display = "none";
	//document.getElementById("cate").style.display = "none";

	//document.getElementById("score").style.display = "block";

	
	//display the relevent things
	$("#score").fadeIn();
	$("#scoreT").fadeIn();	
	$("#power").fadeIn();
	$("#inputting").fadeIn();
	
	
//	console.log(d.toLocaleTimeString()+" "+ document.getElementById("score").innnerHTML);
	branch = setTimeout(checkTime, 1000);


}



//this gets the random letter from the server
function getLetter() {
	
}



