var middlewareObj = {};

middlewareObj.uploadAWS = function(req,res,next){
	// res.setHeader("Content-Type", "text/html");
	// res.end();
		// Load the SDK and UUID
	const fs = require('fs');
	var AWS = require('aws-sdk');
	const fileName = "C:\\Users\\rchen\\Desktop\\test.xlsx";

	var uuid = require('uuid');
	// Create name for uploaded object key
	var keyName = "C:\\Users\\rchen\\Desktop\\test.xlsx";
	fs.readFile(fileName, (err, data) => {
     if (err) throw err;
     const params = {
         Bucket: 'excelstorage', // pass your bucket name
         Key: 'test.xlsx', // file will be saved as testBucket/contacts.csv
         Body: data
     };
     s3.upload(params, function(s3Err, data) {
         if (s3Err){
			 return;
		 }
		 console.log("File uploaded successfully");
     });
  });
}

module.exports = middlewareObj;
