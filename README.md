
# Care Frontend
 ## Introduction
 The Care frontend has been designed to create medicines and assign them to users. Further, you are able to search for all the registered medicines of a specific users. For more information regarding the project and the architecture can it be found at **[Medicine-Tracker](https://github.com/vcaf/Medicine-Tracker)** repository. 
 
For a preview of the frontend can it be found on my Netlify without the backend: https://63d937e4dad96400098b355d--papaya-quokka-f19d30.netlify.app/

This readme file will cover how to run the frontend locally and build the image on docker.

## Running the frontend
 1. Pull the project from GitHub on your device in the IDE you are working with. (I will be using Visual Studio Code)
 
2.  run the command <pre><code>npm start</code></pre> to run the project locally.


## Building the image locally
 
1.  locate to the folder where the image is stored.
2. run the command <pre><code>docker build -t image_name .</code></pre>
3. the container should now be running
