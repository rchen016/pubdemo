var express = require("express"),
    app     = express(),
	path    = require("path"),
	Swiper  = require("swiper"),
	popper  = require("popper.js"),
	debounce = require("debounce");
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine","ejs");
app.get("/",function(req,res){
	res.render("homepage");
});

app.listen(process.env.PORT||3000, process.env.IP, function(){
  console.log("Server Up...");
});
