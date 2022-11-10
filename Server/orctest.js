var fs = require('fs');
var imageAsBase64 = fs.readFileSync('C:/Users/simon/OneDrive/Documents/codesurance/mbsProject/utilit/testimg.jpeg', 'base64');

async function quickstart() {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    // Performs label detection on the image file
    const [result] = await client.textDetection('C:/Users/simon/OneDrive/Documents/codesurance/mbsProject/utilit/testimg.jpeg');
    const detection = result.textAnnotations;
    //console.log('Text:');
    //detection.forEach(text => console.log(text.description));
    console.log(detection[0].description)
  }
  quickstart(imageAsBase64);