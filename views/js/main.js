
//Database setup
var db = null;

var mysql = require('mysql');

db = mysql.createConnection(
{
	host: 'us-cdbr-iron-east-03.cleardb.net',
	port: '3306',
	user: 'b949f5a82f36fb',
	password: '3b81693c',
	database: 'ad_3063a2f467afe38'
});

db.connect();

//get random category
var high = 2;
var low = 1;
var cat = Math.floor(Math.random() * (high - low) + low);

db.query('SELECT name FROM categories WHERE id = ' + cat, function(err, rows)
{
	//if (err) throw err;
	
	console.log('1');
	console.log('Data received from Db:\n');
	console.log(rows);
});

db.end();

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
var time = 120;
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
   if(time == -1) {
   		clearInterval(vari);
   		alert('Time is up! ');
   		//switch pages now!!   		
   }

}

var branch;
function start() {
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



