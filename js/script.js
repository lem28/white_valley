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
var reg_text = {
	"reg_username":document.getElementById("reg_username") ,
	"reg_password":document.getElementById("reg_password") ,
	"reg_firstName":document.getElementById("reg_firstName") ,
	"reg_lastName":document.getElementById("reg_lastName") ,
	"reg_email":document.getElementById("reg_email")
};

var log_text = {
	"log_username":document.getElementById("log_username") ,
	"log_password":document.getElementById("log_password")
};

function AJAX_Handler(cmd, str)
{
	var xhttp = new XMLHttpRequest();
	var obj = JSON.parse(str);
	xhttp.open("POST", "../php/handler.php?" + cmd + " " + obj, true);
	xhttp.send();
}

function register()
{
	AJAX_Handler(register, reg_text);
}

function login()
{
	AJAX_Handler(login, log_text);
}