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

app.get("/:report/getDetail",function(req,res){
	console.log(req.params.report);
	var buffer = null;
	var buffers = null;
	var workbook2 = null;
	buffers = [];

	var s3 = new AWS.S3();
	var params = {
        Bucket: "excelstorage",
        Key: req.params.report+".xlsx"
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
		var x = JSON.stringify(workbook2[0].data);
		var buildTable = [];
		var maxColCount = 0;

		for(var i=0;i<workbook2[0].data.length;i++){
			if(maxColCount<workbook2[0].data[i].length) maxColCount = workbook2[0].data[i].length;
			if(i==0){
				buildTable["headers"] = workbook2[0].data[i];
			}
			else{
				//console.log("store ",x[i]);
				buildTable["row"+i] = workbook2[0].data[i];
			}
		}
		console.log("col: ",maxColCount);
		res.render("detail",{template:req.params.report,content2:buildTable,maxColCount: maxColCount});
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
