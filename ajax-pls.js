var request;
function send_request()
{
	var delivery = 
	request = new XMLHttpRequest();
	request.open("POST", "a.txt", true);
	request.send(delivery);
}

function handle_response()
{
	document.getElementById("test").innerHTML = request.responseText;
}

