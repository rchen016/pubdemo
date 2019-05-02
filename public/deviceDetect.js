$(document).ready(function() {
	console.log("Start");
	//globallyAccessibleNamespace.dynamicAd();
    var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	var mainObj = {
		isMobile: false,
		device: "desktop",
		jamData: {
			"sitename": "pubdemo.jumpstartauto.net",
			"site": "jam.pubdemo.home.dfp",
			"adunit": "",
			"prod": "homepage",
			"subprod": "",
			"yr": "2019",
			"mak": "",
			"mod": "",
			"type": "",
			"style": "",
			"fuel": "",
			"pub": "jumpstart",
			"pubtemplate": "homepage",
			"test": "jumpstart",
			"content": ""
		},
		adflowDesk: {
			"homepage": [[[728,90],[970,250],[970,90]],[300,250],[300,120]]
		},
		adflowMob:{
			"homepage": [[[320,50],[300,250],[300,300]],[[320,50],[300,250],[300,300],[320,51],[300,251],[300,301]]]
		}
	};
	if(width <= 414){
		mainObj.isMobile = true;
		mainObj.jamData["site"] = "jam.pubdemo.home.mob";
	}
	if(mainObj.isMobile){
		console.log("Mobile");
		googletag.cmd.push(function() {
			for(var i=0;i<mainObj.adflowMob[mainObj.jamData["pubtemplate"]].length;i++){
				console.log("div-gpt-ad-"+(i+1));
				googletag.defineSlot("/36117602/jam.pubdemo.home.mob",mainObj.adflowMob[mainObj.jamData["pubtemplate"]][i], "div-gpt-mob-ad-"+(i+1))
						.addService(googletag.pubads())
						.setTargeting("prod",mainObj.jamData.prod)
						.setTargeting("test",mainObj.jamData.test)
						.setTargeting("yr",mainObj.jamData.yr)
						.setTargeting("jamtest","rickydemo");
			}
			googletag.enableServices();
			//googletag.pubads().enableSingleRequest();
		});
		for(var i = 0;i < mainObj.adflowMob[mainObj.jamData["pubtemplate"]].length;i++){
		    (function(){
		        var ii = i;
		        setTimeout(function(){
					console.log("div-gpt-ad-"+(ii+1));
		            googletag.cmd.push(function() {
						googletag.display("div-gpt-mob-ad-"+(ii+1));
					});
		        },100);
		    })();
		}
	}
	else{
		console.log("Desktop");
		googletag.cmd.push(function() {
			for(var i=0;i<mainObj.adflowDesk[mainObj.jamData["pubtemplate"]].length;i++){
				console.log("div-gpt-ad-"+(i+1));
				googletag.defineSlot("/36117602/jam.pubdemo.home.dfp",mainObj.adflowDesk[mainObj.jamData["pubtemplate"]][i], "div-gpt-ad-"+(i+1))
						.addService(googletag.pubads())
						.setTargeting("prod",mainObj.jamData.prod)
						.setTargeting("test",mainObj.jamData.test)
						.setTargeting("yr",mainObj.jamData.yr)
						.setTargeting("jamtest","rickydemo");
			}
			googletag.enableServices();
			//googletag.pubads().enableSingleRequest();
		});

		for(var i = 0;i < mainObj.adflowDesk[mainObj.jamData["pubtemplate"]].length;i++){
		    (function(){
		        var ii = i;
		        setTimeout(function(){
					console.log("div-gpt-ad-"+(ii+1));
		            googletag.cmd.push(function() {
						googletag.display("div-gpt-ad-"+(ii+1));
					});
		        },100);
		    })();
		}
	}
});
