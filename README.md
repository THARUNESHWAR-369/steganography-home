[![python](https://img.shields.io/badge/Python-3.9-3776AB.svg?style=flat&logo=python&logoColor=white)](https://www.python.org)
[![Maintenance](https://img.shields.io/badge/Python-flask-white.svg)](https://www.python.org/downloads/release/python-390/) 
[![Maintenance](https://img.shields.io/badge/Render-hosting-green.svg)](https://render.com/) 
[![Maintenance](https://img.shields.io/badge/Python-Stepic-red.svg)](https://pypi.org/project/stepic/) 


# Image Steganography Web App

### This is a simple web application that allows users to encode and decode hidden messages in images using steganography.

## Features
1. Encode text messages into images
2. Decode hidden messages from steganographed images
3. Drag and drop image uploading
4. Download encoded image
5. Clean and responsive UI

## Usage
1. Select between encoding and decoding modes
2. Upload an image by drag and drop or file selection
3. Enter secret text to encode
4. Upload steganographed image to decode

## Encoding
### To encode a hidden message:

1. Select the "Encode" option
2. Upload an image file
3. Enter your secret text message
4. Click "Upload" to encode the image
5. Download the encoded image with your hidden message


## Decoding
### To decode a hidden message:
1. Select the "Decode" option
2. Upload the steganographed image containing the hidden message
3. The decoded secret message will be displayed


## Built With
1. Flask - Python web framework
2. StepIC - Image steganography library
3. jQuery - JavaScript library for AJAX and DOM manipulation
4. HTML/CSS/JS - Frontend UI


Future Scope
1. Support video steganography in addition to images
2. Add user accounts and authentication to allow saving encoded media
3. Implement more advanced encoding algorithms like LSB steganography
