// date and time
function makeArray()
{
	for(i = 0; i < makeArray.arguments.length; i++) this[i + 1] = makeArray.arguments[i];
}
function date()
{
	var months = new makeArray('january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december');
	var date = new Date();
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var yy = date.getYear();
	var year = (yy < 1000) ? yy + 1900 : yy;
	document.getElementById('date').innerHTML = "<h2>" + months[month] + " " + day + ", " + year;
}
function startTime()
{
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('time').innerHTML = "<p>" + h + ":" + m + ":" + s;
	var t = setTimeout(function()
	{
		startTime()
	}, 500);
}
function checkTime(i)
{
	if(i < 10)
	{
		i = "0" + i
	};
	return i;
}
// AJAX solution
var xhttp = new XMLHttpRequest();
function ajaxHandler()
{
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			document.getElementById("demo").innerHTML = xhttp.responseText;
		}
	};
	xhttp.open("POST", "ajax_info.txt", true);
	xhttp.send();
}