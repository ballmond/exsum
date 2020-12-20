let arc = require('@architect/functions')
const AWS = require('aws-sdk');

exports.handler = async function http (req) {
  const study = req.queryStringParameters.study
  var params = {
      Bucket: `exsum-reports/${study}`,
      Key: `${study}.xlsm`
  };
  
  AWS.config.update({
    region: "us-east-1"
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
