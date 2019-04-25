var express = require("express"),
    app     = express(),
	path    = require("path");
	Swiper  = require("swiper")
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine","ejs");
app.get("/",function(req,res){
	res.render("homepage");
});

app.listen(3000);
