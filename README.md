<h1>Image Processor</h1>

Overview: To process the images on the backend and send the details to the front end. 

<h2>Languages:</h2>
--> Frontend: React.js<br/>
--> Backend: Node.js and Express.js<br/>
--> Database: MongoDB<br/>

<h2>How to start:</h2>
Backend (server folder): npm start<br/>
Frontend (client folder): npm run dev <br/>

<h2>APIs: </h2>

localhost:3000

<h4>/api/image/upload :</h4> This api helps in uploading the image two the backend. The api scans the image saves the data to the backend and will convert the image to a lower quality to show it to the front end of the project. Keeping the data of the image saved in the database.

<img width="1470" alt="image" src="https://github.com/imOmsingh/Image-processor/assets/94113510/70847db0-457b-45a5-ae6a-6124c401f201"><br/>

<h4>/api/image/getFileName :</h4> This api helps to get all the image names to the frontend of the app to display all the images on the browser. And also it sends the data of the first file in the folder to display data of the first image.

<img width="1470" alt="image" src="https://github.com/imOmsingh/Image-processor/assets/94113510/cfe187c2-f653-42e8-aef1-7678bc759592"><br/>

<h4>/api/image/singlemetadata :</h4> This api sends the metadata of the images stored on the mongoDB.

<img width="1470" alt="image" src="https://github.com/imOmsingh/Image-processor/assets/94113510/733f9906-2965-4e54-9403-7fdfea05fa92"><br/>


<h2>Working:</h2>
Frontend from the figma design.

<img width="1470" alt="image" src="https://github.com/imOmsingh/Image-processor/assets/94113510/8c68ade8-4e01-43dc-ba45-2576a415f16d">


<h2>Problem:</h2>
--> The only problem is how to display such large images in the front end of the project.

--> Solution: Using cloudmersive API or other to convert the larger RAW image to jpeg images in the express backend and store them in place of the large file so data of the file can be easily fetched from the mongoDb and image displayed will a a low quality jpeg files. 

Why this project is not using it : Cloudmersive free API allows 3mb image upload which is very small for any raw image and paid version can not be bought right now.
