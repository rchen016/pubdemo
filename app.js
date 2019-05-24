var express = require("express"),
    app     = express(),
	path    = require("path"),
	Swiper  = require("swiper"),
	popper  = require("popper.js"),
	debounce = require("debounce"),
	middleware = require("./middleware/aws.js"),
	ejs        = require("ejs");
var Excel = require('exceljs');
var xlsx = require("node-xlsx");
var AWS = require('aws-sdk');

app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine","ejs");

app.get("/",function(req,res){

	res.render("homepage");
});

app.get("/categorylanding",function(req,res){
	res.render("categorylanding");
});

app.get("/upload",middleware.uploadAWS,function(req,res){
	// var workbook = new Excel.Workbook();
	// workbook.xlsx.readFile("C:\\Users\\rchen\\Desktop\\test.xlsx")
	// 	.then(function() {
	// 	var worksheet = workbook.getWorksheet("Sheet1");
	// 		worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
	// 		console.log("Row " + rowNumber + " = " + JSON.stringify(row.values));
	// 		res.render("dashboard",{value:JSON.stringify(row.values)});
	// 		return;
	// 	});;
	// });
	res.redirect("dashboard");
});

app.get("/getDetail",function(req,res){

	var buffer = null;
	var buffers = null;
	var workbook2 = null;
	buffers = [];

	AWS.config.update({
	    accessKeyId: "AKIAYYZAVOCMN2EX2GA5",
	    secretAccessKey: "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",
	});

	var s3 = new AWS.S3();
	var params = {
        Bucket: "excelstorage",
        Key: "1234.xlsx"
    };
	//grab xlxs from aws
    var file = s3.getObject(params).createReadStream();

    file.on('data', function (data) {
        buffers.push(data);
    });
	//parse and send it to ejs to render
    file.on('end', function () {
		console.log("parse it");
        buffer = Buffer.concat(buffers);
        workbook2 = xlsx.parse(buffer);
        console.log("workbook", workbook2[0]);
		var x= JSON.stringify(workbook2[0].data);
		console.log(x[0].length);
		var buildTable = [];
		for(var i=0;i<x.length;i++){
			if(i==0){
				buildTable["headers"] = x[i];
			}
			else{
				buildTable["row"+i] = x[i];
			}
		}
		console.log(buildTable);
		res.render("dashboard",{content:workbook2[0].data,content2:buildTable});
    });

});

app.get("/dashboard",function(req,res){
	res.render("dashboard");
});

app.get("/modelpage",function(req,res){
	res.render("modelpage");
});

app.listen(process.env.PORT||3000, process.env.IP, function(){
  console.log("Server Up...");
});
