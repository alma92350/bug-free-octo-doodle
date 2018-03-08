"use strict";
var page = require('webpage').create(),
    system = require('system'),
    address;

if (system.args.length === 1) {
	console.log("Latest news by duckduckgo.com");
    console.log('Usage: news.js <some keyword>');
    phantom.exit(1);
} else {
    address = "https://duckduckgo.com?q=" + system.args[1] + "&t=h_&iar=news&ia=news";

    page.onConsoleMessage = function(msg){
	//console.log(msg);
        system.stderr.writeLine('console: ' + msg);
    };

    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('FAIL to load the address');
        }

		setTimeout(pEval, 1000);
		
		window.setTimeout(function () {
			page.render("photo.png");

			console.log("ok");

			
			phantom.exit();
		}, 2500);
        
    });
}

function pEval(){
    return page.evaluate(function() {	
		
		var a = document.querySelectorAll("a.result__a");
		console.log(a.length);
		var results=[];
		for(var i=0;i<a.length;i++){
			 results.push({"text":a[i].textContent,"url":a[i].href});
		};
		console.log(results.length);
		for(var i=0;i<results.length;i++){
			console.log(results[i].text);
			console.log(results[i].url);
		};
	return ;
	});
}

