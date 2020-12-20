let arc = require('@architect/functions')
const AWS = require('aws-sdk');

exports.handler = async function http (req) {
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
  return {
    statusCode: 301,
    headers: {
      "Location": url
    }
  }
}
