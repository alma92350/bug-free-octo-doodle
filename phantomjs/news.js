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

    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('FAIL to load the address');
        }
		var results = page.evaluate(function() {	
			var a = document.querySelectorAll("a.result__a");
			var res=[];
			for(var i=0;i<a.length;i++){
				 res.push({"text":a[i].text,"url":a[i].href});
			};

			return res;
		});
		window.setTimeout(function () {
			page.render("photo.png");

			for(var i=0;i<results.length;i++){
				console.log(results[i].text);
				console.log(results[i].url);
			};
			
			phantom.exit();
		}, 500);
		
		
		
		//phantom.exit();
        
    });
}
