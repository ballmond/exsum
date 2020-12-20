let arc = require('@architect/functions')
const AWS = require('aws-sdk');
let express = require('express')

let app = express()
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log(req.queryStringParameters)
    var params = {
        Bucket: "study-123",
        Key: "study-123.xlsx"
      };
    
      AWS.config.update({
        accessKeyId: process.env.ACCESS_KEY_ID, 
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        region: "us-east-2"
      })
      console.log(process.env.ACCESS_KEY_ID)
      const s3 = new AWS.S3()
      const myBucket = params.Bucket
      const myKey = params.Key
      const signedUrlExpireSeconds = 60 * 5
    
      const url = s3.getSignedUrl('getObject', {
        Bucket: myBucket,
        Key: myKey,
        Expires: signedUrlExpireSeconds
    });
    console.log(url)
    res.writeHead(301,
        {Location: url}
    );
    res.end();
})

// app.get('/', (req, res) => {
//     var params = {
//         Bucket: "exsum-reports",
//         Key: "Zymeworks i-1008125.xlsm"
//       };
    
//       AWS.config.update({
//         accessKeyId: process.env.ACCESS_KEY_ID, 
//         secretAccessKey: process.env.SECRET_ACCESS_KEY,
//         region: "us-east-2"
//       })
//       console.log(process.env.ACCESS_KEY_ID)
//       const s3 = new AWS.S3()
//       const myBucket = params.Bucket
//       const myKey = params.Key
//       const signedUrlExpireSeconds = 60 * 5
    
//       const url = s3.getSignedUrl('getObject', {
//         Bucket: myBucket,
//         Key: myKey,
//         Expires: signedUrlExpireSeconds
//     });
//     console.log(url)
//     res.writeHead(301,
//         {Location: url}
//     );
//     res.end();
// })

exports.handler = arc.http.express(app)