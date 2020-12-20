let arc = require('@architect/functions')
const AWS = require('aws-sdk');
const Excel = require('exceljs');

exports.handler = async function http (req) {

  var params = {
    Bucket: "study-123",
    Key: "study-123.xlsx"
  };

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-2"
  })
  const s3 = new AWS.S3()
  const myBucket = params.Bucket
  const myKey = params.Key
  const signedUrlExpireSeconds = 60 * 5

  try {
    const url = await new Promise((resolve, reject) => {
      s3.getSignedUrl('getObject', params, (err, url) => {
        err ? reject(err) : resolve(url);
      });
    });
    console.log(url)
    return {
      statusCode: 301,
      body: JSON.stringify(url)
    }  
  } catch (err) {
    if (err) {
      console.log(err)
    }
  }
  return {
    statusCode: 200
  }
}
