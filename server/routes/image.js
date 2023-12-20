const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const sharp = require('sharp');
const ExifParser = require('exif-parser');
const { open } = require('node:fs/promises');


router.get("/getdetails", (req, res) => {
    res.send("swdnfinf the data");
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images'); 
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    },
  });
  
const upload = multer({ storage: storage });

  router.post('/upload', upload.single('image'), (req, res, next) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    console.log('File uploaded successfully.')
    res.send('File uploaded successfully.');
  });

  const imagesFolder = path.join(__dirname, '../images');

  router.get('/metadata', async (req, res) => {
    try {
      const files = await fs.readdir(imagesFolder);
  
      const imageMetadata = [];

      try {
        for (const file of files) {
            const imagePath = path.join(imagesFolder, file);
      
            const imageBuffer = await sharp(imagePath).toBuffer();
      
            const exifParser = ExifParser.create(imageBuffer);
            const exifResult = exifParser.parse();
      
            const metadata = {
              fileName: file,
              width: exifResult.imageSize.width,
              height: exifResult.imageSize.height,
              exifData: exifResult.tags 
            };
      
            imageMetadata.push(metadata);
          }
        
      } catch (error) {
        console.log(error);
      }
  
      
  
      res.json(imageMetadata);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving image metadata');
    }
  });

  router.post('/singlemetadata', async (req, res) => {
    try {  
      const imageMetadata = [];

      const {filename} = req.body;

      try {
            const imagePath = path.join(imagesFolder, filename);
      
            const imageBuffer = await sharp(imagePath).toBuffer();
      
            const exifParser = ExifParser.create(imageBuffer);
            const exifResult = exifParser.parse();
      
            const metadata = {
              fileName: filename,
              width: exifResult.imageSize.width,
              height: exifResult.imageSize.height,
              exifData: exifResult.tags 
            };
      
            imageMetadata.push(metadata);
        
      } catch (error) {
        console.log(error);
      }
  
      
  
      res.json(imageMetadata);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving image metadata');
    }
  });


  router.get("/download/:filename", (req, res) => { 
    const imagePath = path.join(imagesFolder, req.params.filename);
    res.download(
      imagePath, 
        "image.jpg", // Remember to include file extension
        (err) => {
            if (err) {
                res.send({
                    error : err,
                    msg   : "Problem downloading the file"
                })
            }
    });
});

  



module.exports = router;