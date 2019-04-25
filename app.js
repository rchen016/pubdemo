var express          = require("express"),
    app              = express();

app.set("view engine","ejs");
app.get("/",function(req,res){
	res.render("homepage");
});

app.listen(3000);
