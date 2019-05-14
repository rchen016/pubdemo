$(document).ready(function() {
    var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	var sitesection = document.querySelector("meta[name='sitesection']").getAttribute("content")
	var mainObj = {
		isMobile: false,
		device: "n/a",
		jamData: {
			"sitename": "",
			"site": "",
			"adunit": "",
			"prod": "",
			"subprod": "",
			"yr": "",
			"mak": "",
			"mod": "",
			"type": "",
			"style": "",
			"fuel": "",
			"pub": "",
			"pubtemplate": "",
			"test": "",
			"content": ""
		},
		adflowDesk: {
			"homepage": [[[728,90],[970,250],[970,90]],[300,250],[300,120]],
			"category": [[728,90],[[300,250],[300,600]],[[300,251],[300,250]]]
		},
		adflowMob:{
			"homepage": [[[320,50],[300,250],[300,300]],[[320,50],[300,250],[300,300],[320,51],[300,251],[300,301]]],
			"category": [[[320,50],[300,250],[300,300]],[[320,50],[300,250],[300,300],[320,51],[300,251],[300,301]]]
		}
	};
	//determine site section
	if(sitesection=="homepage"){
		mainObj.jamData = {
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
		}
	}
	else if(sitesection=="category"){
		mainObj.jamData = {
			"sitename": "pubdemo.jumpstartauto.net",
			"site": "jam.pubdemo.new.dfp",
			"adunit": "/bg/ct",
			"prod": "buyersguide",
			"subprod": "",
			"yr": "2019",
			"mak": "",
			"mod": "",
			"type": "categorylanding",
			"style": "",
			"fuel": "",
			"pub": "jumpstart",
			"pubtemplate": "category",
			"test": "jumpstart",
			"content": ""
		}
	}else{
		console.log("unfound sitesection");
	}


	//Determine mobile desktop
	if(width <= 414){
		mainObj.isMobile = true;
		mainObj.jamData["site"] = "jam.pubdemo.home.mob";
	}
	if(mainObj.isMobile){
		console.log("Mobile");
		googletag.cmd.push(function() {
			googletag.pubads()
				.setTargeting("prod",mainObj.jamData.prod)
				.setTargeting("subprod",mainObj.jamData.subprod)
				.setTargeting("pub",mainObj.jamData.pub)
				.setTargeting("fuel",mainObj.jamData.fuel)
				.setTargeting("type",mainObj.jamData.type)
				.setTargeting("style",mainObj.jamData.style)
				.setTargeting("mak",mainObj.jamData.mak)
				.setTargeting("mod",mainObj.jamData.mod)
				.setTargeting("yr",mainObj.jamData.yr)
				.setTargeting("test",mainObj.jamData.test)
				.setTargeting("jamtest","rickydemo");
			for(var i=0;i<mainObj.adflowMob[mainObj.jamData["pubtemplate"]].length;i++){
				googletag.defineSlot("/36117602/"+mainObj.jamData.site+mainObj.jamData.adunit,mainObj.adflowMob[mainObj.jamData["pubtemplate"]][i], "div-gpt-mob-ad-"+(i+1))
						.addService(googletag.pubads());
			}
			googletag.pubads().enableSingleRequest();
			googletag.enableServices();
			for(var i = 0;i < mainObj.adflowMob[mainObj.jamData["pubtemplate"]].length;i++){
			    (function(){
			        var ii = i;
			        setTimeout(function(){
						googletag.display("div-gpt-mob-ad-"+(ii+1));
			        },100);
			    })();
			}
		});
	}
	else{
		console.log("Desktop");
		googletag.cmd.push(function() {
			googletag.pubads()
				.setTargeting("prod",mainObj.jamData.prod)
				.setTargeting("subprod",mainObj.jamData.subprod)
				.setTargeting("pub",mainObj.jamData.pub)
				.setTargeting("fuel",mainObj.jamData.fuel)
				.setTargeting("type",mainObj.jamData.type)
				.setTargeting("style",mainObj.jamData.style)
				.setTargeting("mak",mainObj.jamData.mak)
				.setTargeting("mod",mainObj.jamData.mod)
				.setTargeting("yr",mainObj.jamData.yr)
				.setTargeting("test",mainObj.jamData.test)
				.setTargeting("jamtest","rickydemo");
			for(var i=0;i<mainObj.adflowDesk[mainObj.jamData["pubtemplate"]].length;i++){
				googletag.defineSlot("/36117602/"+mainObj.jamData.site+mainObj.jamData.adunit,mainObj.adflowDesk[mainObj.jamData["pubtemplate"]][i], "div-gpt-ad-"+(i+1))
						.addService(googletag.pubads());
			}
			googletag.pubads().enableSingleRequest();
			googletag.enableServices();
			for(var i = 0;i < mainObj.adflowDesk[mainObj.jamData["pubtemplate"]].length;i++){
			    (function(){
			        var ii = i;
			        setTimeout(function(){
						googletag.display("div-gpt-ad-"+(ii+1));
			        },100);
			    })();
			}
		});
	}
	//globallyAccessibleNamespace.dynamicAd();
});
