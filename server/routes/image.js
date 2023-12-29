const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const util = require('util'),
    request = util.promisify(require('request')),
    fs = require('fs'),
    fsp = fs.promises;
const sharp = require('sharp');
const exiftoolBin = require('dist-exiftool');
const exiftool =  require('node-exiftool');
const ImageModel = require('../models/image.js')
const fetch = require('node-fetch');
const ExifParser = require('exif-parser');
const exif = require('node-exif');
const base64Img = require('base64-img');
const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const dcraw = require('dcraw');
const { exec } = require('child_process');



// Endpoint to retrieve metadata

const imagesFolder = path.join(__dirname, '../images');
const imagesComFolder = path.join(__dirname, '../comimages');

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

  router.post('/upload', upload.single('image') ,async (req, res, next) => {
    
        // const buf = fs.readFileSync(imagesFolder, 'image-1703393909202.PEF');
        // dcraw(buf, { verbose: true, identify: true });
        // const tiffFile = dcraw(buf, { exportAsTiff: true });
        // fs.writeFileSync(New_PHOTO_PATH, tiffFile)


        // const convertRawToJpg = (rawImagePath, outputImagePath) => {
        //   return new Promise((resolve, reject) => {
        //         exec(`python path/to/python_script.py ${rawImagePath} ${outputImagePath}`, (error, stdout, stderr) => {
        //             if (error) {
        //                 console.error(`Error executing Python script: ${error}`);
        //                 reject(error);
        //             } else {
        //                 console.log(`Python script output: ${stdout}`);
        //                 resolve(stdout);
        //             }
        //         });
        //     });
        // };

        // convertRawToJpg(PHOTO_PATH, New_PHOTO_PATH)
        // .then(() => console.log('Conversion completed'))
        // .catch(error => console.error(`Conversion failed: ${error}`));

        // /Users/omsingh/Desktop/image processor/server/images/
        // /Users/omsingh/Desktop/image processor/server/images/
        // (async () => {
        //   const files = await imagemin(['images/*.CR3'], {
        //     destination: New_PHOTO_PATH,
        //     plugins: [
        //       imageminMozjpeg({quality: 80})
        //     ]
        //   });
        // })();

        // sharp(PHOTO_PATH)
        // .toFormat('jpg')
        // .toFile(New_PHOTO_PATH);

// const imageminMozjpeg = require("imagemin-mozjpeg");
// (async () => {
//   const files = await imagemin(["./img/*.{jpeg,jpg,png}"], {
//     destination: "./output/",
//     plugins: [imageminMozjpeg({ quality: 80 })],
//   });

//   console.log(files);
//   //=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
// })();

      // try {

      //   if (!req.file) {
      //     return res.status(400).send('No file uploaded.');
      //   }
      //       const New_PHOTO_PATH = path.join(imagesComFolder, 'newiiefilllie');
            
    
      //       let results = [];
      //       const PHOTO_PATH = path.join(imagesFolder,'');

      //   const rs = fs.createReadStream(PHOTO_PATH)
      //     const ep = new exiftool.ExiftoolProcess(exiftoolBin)
      //     ep.open()
      //       .then(() => ep.readMetadata(rs, ['-File:all']))
      //       .then(async (result) => {
      //         results = result;

      //         const newData = new ImageModel({
      //           fileName:req.file.filename,
      //             information:result.data[0]
      //           }
      //         );
              
      //         const metadata = await newData.save();
      //         console.log(result.data[0])

      //         if(!metadata){
      //             return res.status(500).json({success:false,message:"Activity can not created"});
      //         }

      //       res.status(200).json({success:true,message:"created"});


      //     })
        
      // } catch (error) {
      //   console.log(error)
      // }

      try {
        if(!req.file){
          return res.status(404).send({message:"File Not Found",status:404})
        }
        // const PHOTO_PATH = path.join(__dirname, '../public/upload/'+req.file.filename)
        const PHOTO_PATH = path.join(imagesFolder,req.file.filename);
        const rs = fs.createReadStream(PHOTO_PATH)
        const ep = new exiftool.ExiftoolProcess(exiftoolBin)
        ep.open()
          .then(() => ep.readMetadata(rs, ['-File:all']))
          .then(async (result) => {
              
              const newData = new ImageModel({
                fileName:req.file.filename,
                  information:result.data[0]
                }
              );
              
              const metadata = await newData.save();
              if(!metadata){
                return res.status(500).json({success:false,message:"Activity can not created"});
              }

              res.status(200).json({success:true,message:"created",metadata});

              // console.log(result.data[0])
              // return res.send(metadata);
        })
        .then(() => ep.close(), () => ep.close())
        .catch(console.error);

        } catch (error) {
            next(error);
        }

          



          // sharp(PHOTO_PATH)
          // .rotate(180)
          // .resize(200)
          // .toBuffer()
          // .then( data => {
          //     fs.writeFileSync(New_PHOTO_PATH, data);
          // })
          // .catch( err => {
          //     console.log(err);
          // });												
          

          // const files = await imagemin(["image-1703068628462.jpeg"], {
          //   destination: New_PHOTO_PATH,
          //   plugins: [
          //     imageminMozjpeg({quality: 50})
          //   ]
          // });
          

//           const image = res.req.file;
// console.log(image.buffer)
// res.send(res.req.file);
          

          // const imageUrl = 'https://drive.google.com/file/d/1a-fDqeVKb1fPrwuXprBS98FWuIB7e6BB/view?usp=drive_link';

        // fetch(imageUrl)
        //   .then(response => {
        //     if (!response.ok) {
        //       throw new Error(`Failed to fetch the image. Status code: ${response.status}`);
        //     }
        //     return response.buffer();
        //   })
        //   .then(imageBuffer => {
        //     // The 'imageBuffer' now contains the binary data of the image.
        //     // console.log('Image data buffered successfully!');

        //     const compressedImage =  sharp(image.buffer).resize(1024, 768).toBuffer();
        
        //     fs.writeFileSync(New_PHOTO_PATH, compressedImage);
        

        //   })
        //   .catch(error => {
        //     console.error('Error fetching the image:', error);
        //   });


          // const image = sharp(PHOTO_PATH); // path to the stored image
          // image.metadata() // get image metadata for size
          // .then(function(metadata) {
          //   if (metadata.width > 1800) {
          //     return image.resize({ width: 1800 }).toBuffer(); // resize if too big
          //   } else {
          //     return image.toBuffer();
          //   }
          // })

          

        // const New_PHOTO_PATH = path.join(imagesComFolder, res.req.file.filename);
                        // sharp(req.file).resize(200,200)
                        // .jpeg({quality : 50}).toFile(New_PHOTO_PATH);
        // const image = sharp(PHOTO_PATH);
        // await image.jpeg().toFile(New_PHOTO_PATH);

          // await sharp(PHOTO_PATH)
          // .dcr({ quality: 60 })
          // .toFile(New_PHOTO_PATH)
          // .then(() => {
          //   console.log(`Compressed successfully`);
          
          // });


          // const cr3FilePath = PHOTO_PATH; // Replace with your .cr3 file path

          // fs.readFile(cr3FilePath, (err, data) => {
          //   if (err) {
          //     res.status(500).send('Error reading file');
          //     return;
          //   }
          

          //   const base64String = Buffer.from(data).toString('base64');

          //   console.log(cr3FilePath)
          //   // console.log(base64String)
          //   res.send(base64String)

            // base64Img.img(base64String, '.', 'output', (err, New_PHOTO_PATH) => {
            //   if (err) {
            //     res.status(500).send('Error converting Base64 to image');
            //     return;
            //   }
            // })

        // })
        // console.log(PHOTO_PATH)

        // const { buffer } = await sharp(PHOTO_PATH).jpeg({ quality: 80 });
        //   console.log(buffer)
        // Generate a unique filename with timestamp
        // const filename = req.file.filename;
        // const filepath = path.join(__dirname, 'uploads', filename); // Specify target directory
    
        // await fs.writeFileSync(New_PHOTO_PATH, buffer); // Write buffer to file

  });



  // router.get('/metadata', async (req, res) => {
  //   try {
  //     const files = await fs.readdir(imagesFolder);
  
  //     const imageMetadata = [];

  //     try {
  //       for (const file of files) {
  //           const imagePath = path.join(imagesFolder, file);
      
  //           const imageBuffer = await sharp(imagePath).toBuffer();
      
  //           const exifParser = ExifParser.create(imageBuffer);
  //           const exifResult = exifParser.parse();
      
  //           const metadata = {
  //             fileName: file,
  //             width: exifResult.imageSize.width,
  //             height: exifResult.imageSize.height,
  //             exifData: exifResult.tags 
  //           };
      
  //           imageMetadata.push(metadata);
  //         }
        
  //     } catch (error) {
  //       console.log(error);
  //     }
  
  //     res.json(imageMetadata);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send('Error retrieving image metadata');
  //   }
  // });



  router.get('/getFileName', async (req, res) => {
    try {

      const fileNames = [];
      const metadata = [];
      const files =  fs.readdirSync(imagesFolder);

        for (const file of files) {
            const imagePath = path.join(imagesFolder, file);
            fileNames.push(file);
          }


          const fileName = fileNames[0];
          const data = await ImageModel.find({fileName});
          res.send({fileNames:fileNames,metadata:data})



    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving image metadata');
    }
  });



  router.post('/singlemetadata',async (req, res) => {
    try {

        const fileName = req.body.fileName;
        const data =await ImageModel.find({fileName});
        res.send({metadata:data})

    } catch (error) {
        console.log(error);
    }
})

router.post('/singlemetadata', (req, res) => {
  try {
      const {filename} = req.body;
      const PHOTO_PATH = path.join(imagesFolder, filename);
      const rs = fs.createReadStream(PHOTO_PATH)
      const ep = new exiftool.ExiftoolProcess(exiftoolBin)
      ep.open()
        .then(() => ep.readMetadata(rs, ['-File:all']))
        .then(async (result) => {
            res.send(result.data);
      })

  } catch (error) {
      console.log(error);
  }
})

// router.get('/final', async (req, res) => {
//       try {
//         const files = await fs.readdir(imagesFolder);
    
//         const imageMetadata = [];
  
//         try {
//           for (const file of files) {
//               const PHOTO_PATH = path.join(imagesFolder, file);
//               // const PHOTO_PATH = path.join(imagesFolder, filename);
//               const rs = fs.createReadStream(PHOTO_PATH)
//               const ep = new exiftool.ExiftoolProcess(exiftoolBin)
//               ep.open()
//                 .then(() => ep.readMetadata(rs, ['-File:all']))
//                 .then(async (result) => {
//                   res.send(result.data[0]);
//               })
                  
//             }
          
//         } catch (error) {
//           console.log(error);
//         }
    
        
    
//         res.json(imageMetadata);
//       } catch (error) {
//         console.error(error);
//         res.status(500).send('Error retrieving image metadata');
//       }

// })


  // router.post('/singlemetadata', async (req, res) => {
  //   try {  
  //     const imageMetadata = [];

  //     const {filename} = req.body;

  //     try {
  //       // console.log(filename)

  //           const imagePath = path.join(imagesFolder, filename);
      
  //           const imageBuffer = await sharp(imagePath).toBuffer();
      
  //           const exifParser = ExifParser.create(imageBuffer);
  //           const exifResult = exifParser.parse();
      
  //           const metadata = {
  //             fileName: filename,
  //             width: exifResult.imageSize.width,
  //             height: exifResult.imageSize.height,
  //             exifData: exifResult.tags 
  //           };
      
  //           imageMetadata.push(metadata);
        
  //     } catch (error) {
  //       console.log(error);
  //     }
  
      
  
  //     res.json(imageMetadata);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send('Error retrieving image metadata');
  //   }
  // });


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