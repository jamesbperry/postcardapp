// Polymer app
var myApp = document.querySelector('#my-app');

// myApp defaults
myApp.title = "Postcards";
myApp.route = "home"; // default route but will redirect to 'login' if no app.username set
myApp.api = "http://localhost:5000/api/";
myApp.url = myApp.api + "cards/";

// myApp session vars
myApp.username = "";

// default logging function to call
var log = function(message) {
	console.log(message);
};

// Setup debug mode once Polymer template is bound
myApp.addEventListener('dom-change', function() {
	console.log("Config - development:" + IS_DEVELOPMENT + " debug:" + IS_DEBUG);
	if (IS_DEBUG) {
		myApp.debugButton = document.querySelector("#debugButton");
		myApp.debugConsole = document.querySelector("#debugConsoleLog");
		myApp.isDebugConsoleOpen = false;
		myApp.debugLineNo = 0;
		if(myApp.debugButton) {
			myApp.debugButton.removeAttribute("hidden");
			myApp.debugButton.addEventListener("click", toggleDebugConsole);
		}
		if (myApp.debugConsole) {
			log = logText;
			log("Welcome to Postcard");
		}
	}
	// auto-refresh content when card changed 
	socket.on("cardChanged", function (data) {
    	console.log("client received card changes");
    	console.log(data);
    	var event = new CustomEvent('card-changed', { 'detail': data });
    	document.querySelector('page-home').dispatchEvent(event);
	});

});

function toggleDebugConsole(e) {
	myApp.isDebugConsoleOpen = !myApp.isDebugConsoleOpen;
	if(myApp.isDebugConsoleOpen) {
		myApp.debugConsole.removeAttribute("hidden");
	} else {
		myApp.debugConsole.setAttribute("hidden", true);
	}
}

// drop-in logging function for debug mode 
function logText(message) {
	myApp.debugConsole.value = myApp.debugLineNo +': '+ message +"\n"+ myApp.debugConsole.value;
	myApp.debugLineNo++;
}

// myApp client-side route handler
function getURL(route, paramArray){
	if(route == myApp.route) {
		console.log("== page already routed '"+ route +"' ==");
		return false;
	}

    // client-side routing handled using page.js
	var path = '/'+route;
	if(paramArray && paramArray.length>0) {
		for(var i=0; i<paramArray.length; i++) {
			path = path + '/' + paramArray[i]; // eg. '/editor/1'
		}
	}

	console.log("=> getURL route: " + route);
	page(path);
}

// generate unique id for postcard
function generateUUID() {
    return uuid.v4(); // using node-uuid
}

function isFunction(functionToCheck) {
	var getType = {};
	return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}