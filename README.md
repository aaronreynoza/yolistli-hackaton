# Yolistli

Yolisti is a WebVR experience to promote Cihuatán, the pre-Columbian archaeological site in central El Salvador. Yolistli is nahuatl and means Life.
Some of the features of this application are:

- Cross compatibility across HTC Vive, Oculus Rift/Go, Gear VR, iOS and Android devices.
- Spatial Audio, 3D Views, Controllers, Teleport.
- Local development server that can be viewed on external devices in realtime (helpful for debugging on iOS/Android)
- All code is integrated into the Aframe Entity and Component system for best performance 
- Dependencies are loaded through Webpack modules and NPM

___
## Installation

    git clone https://github.com/Kalaston/yolistli.git
    cd yolistli
    npm install

## File Structure + Descriptions

    ├── build                  # Webpack Production build output 
    ├── src                    # Source files
        ├── components         # Folder for Aframe components (JS)
        └── templates          # Folder for resuseable Aframe entities (HTML)
    ├── .firebaserc            # Connects your project to Firebase Hosting 
    ├── firebase.json          # Specifies which directory to upload to Firebase
    ├── package.json           # NPM
    ├── postcss.config         # Post configuration for CSS
    ├── webpack.config.js      # Main Webpack Config
    ├── webpack.config.prod.js # Webpack Config file for dev production builds
    ├── webpack.config.dev.js  # Webpack Config file for dev server builds
    
## Development Stage

To spin up a localhost site, run the following command then point a WebVR friendly browser to http://localhost:8080/

    npm run dev

To view the dev server on an external device find out your local IP address (Type 'ipconfig' in any terminal) and view the 8080 port. This may look like:

    192.168.1.165:8080

 ## Building 
 
 To build and optimze your HTML/JS run:
     
     npm run build
 
 This will Webpack build your ./src folder into the ./build directory with the specifications made in the _webpack.config.js_ file.

## Deploying

Yolistli uses Firebase for quick and easy static-asset hosting. If you haven't already, install Firebase by running:

    npm install -g firebase-tools
    
After installing Firebase, run _init_ and setup a hosting connection:

    firebase init 
    
The _firebase.json_ file tells Firebase Hosting to use the _./build directory. Find out more about Firebase Hosting [Here](https://firebase.google.com/docs/hosting/quickstart)

Once Firebase is installed and initialized, run the following code to build and deploy your code:

    npm run deploy
