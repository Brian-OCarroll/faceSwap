'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
var CloudmersiveImageApiClient = require('cloudmersive-image-api-client');
var fs = require('fs');
const { createCanvas,
  loadImage, } = require('canvas');
const sharp = require('sharp');

// http.createServer(function (req, res) {
// res.writeHead(200, { 'Content-Type': 'text/plain' });
async function run() {
  var imageFile = Buffer.from(fs.readFileSync('./test.png').buffer);
  var face = Buffer.from(fs.readFileSync('./face.png').buffer);

  let image = sharp(imageFile)
  let size = await image.metadata()
    .then(metaData => {
      return {
        x: metaData.width,
        y: metaData.height
      }
    })
  let faceImage = await sharp(face).resize({ width: 925, height: 925 }).toBuffer()
  
  let newImage = await image.composite([{input: faceImage, top:390, left: 698}]).toFile('./return.png')


  // loadImage(imageFile).then(image => {
  //    canvas = createCanvas(image.width, image.height);
  //   ctx = canvas.getContext('2d');
  //   console.log(image.width)
  //   console.log(image.height)
  //   ctx.drawImage(image, 0, 0, image.width, image.height)
  //   return loadImage('./face.png')
  // }).then(image => {
  //   ctx.drawImage(image, 37, 65 , 125, 124)
  // }).then(() => {
  //   var buf = canvas.toBuffer();
  // fs.writeFileSync("return.png", buf);
  // })
  //   .catch(err => {
  //     console.log(err)
  //   });


  var defaultClient = CloudmersiveImageApiClient.ApiClient.instance;

  // Configure API key authorization: Apikey
  var Apikey = defaultClient.authentications['Apikey'];
  Apikey.apiKey = "50d00d85-4681-4c27-999c-1f4b5327d1e3" // Get your own key at https://account.cloudmersive.com



  var apiInstance = new CloudmersiveImageApiClient.FaceApi()




  var callback = function (error, data, response) {
    if (error) {
      console.error(error);
    } else {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    }
  };

  // apiInstance.faceLocateWithLandmarks(imageFile, callback);
}
run()
// }).listen(port);
