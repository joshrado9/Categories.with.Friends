
//TODO display the score
function score()
{
	//calculate the score 
	var score = 0;
	
	
	//parse the elements in HTML
	var str1 = document.getElementById("cpu1").innerHTML;
	var str2 = document.getElementById("cpu2").innerHTML;
	var str3 = document.getElementById("cpu3").innerHTML;
	
	//add them up
	if(str1 == "+1")
		score++;
	if(str2 == "+1")	
		score++;
	if(str3 == "+1")
		score++;
		
	//display the score column
	$(".scores").fadeIn();
	$("#playagain").fadeIn();
}