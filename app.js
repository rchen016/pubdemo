var express = require("express"),
    app     = express(),
	path    = require("path"),
	Swiper  = require("swiper"),
	popper  = require("popper.js"),
	debounce = require("debounce"),
	middleware = require("./middleware/aws.js"),
	ejs        = require("ejs");
var Excel = require('exceljs');

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
	var AWS = require('aws-sdk');
	var csvContent = [];
	var csvHeaders = [];
	var xlsx = require("node-xlsx");
	//var buffer = new Buffer();
	AWS.config.update({
	    accessKeyId: "AKIAYYZAVOCMN2EX2GA5",
	    secretAccessKey: "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",
	});
	var s3 = new AWS.S3();
	var params = {
        Bucket: "excelstorage",
        Key: "taggingcar.xlsx"
    };

    var file = s3.getObject(params).createReadStream();
    var buffers = [];

    file.on('data', function (data) {
        buffers.push(data);
    });

    file.on('end', function () {
        var buffer = Buffer.concat(buffers);
        var workbook = xlsx.parse(buffer);
        console.log("workbook", typeof workbook[0].data);
		res.render("dashboard",{content:workbook[0].data});
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
