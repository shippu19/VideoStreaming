const AWS = require("aws-sdk");
const fs = require('fs');
const s3 = new AWS.S3({
    accessKeyId: "AKIAY2IYXIS2VSVKJ5M5" ,
    secretAccessKey: "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"
});

// (async ()=>{
//     await s3
//     .putObject({
//         Body: "Hello world",
//         Bucket: "myawsbucket670",
//         Key: "myfile.jpj"
//     })

// .promise();
// })();

exports.uploadFile=(fileName)=>{
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: "myawsbucket670",
        Key: "myfile.jpg", // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

