
**NoineRCScanner** is a Mobile Application which uses Artificial Intelligence algorithms and Image processing to obtain the digital format of the RC Card. It converts all the readable elements in the RC Card of different states and creates an effienct data model to store it in the database. 
The datastructure is common for all the RC Cards from different states.

Vehicle Registration Certificate is a comprehensive document containing 60 fields which can either be human readable or machine readable. The amount of information in such a document make it extremely tedious to record and maintain data. General procedure followed by people these days is either noting down the required info or just taking photo of the document. First approach requires effort and gives chances for human errors. The second one needs information to be extracted later on through processes that are not automated.

 We aim to solve this problem by automatically extracting the required information from a simple scan of the document. This is done by the use of an app on the officer’s devices that scans the document and uses AI tools to extract the essential details and structure it in a common format in order to create a accurate and detailed database based on a novel data model.

## Requirements
* [Libraries](#Libraries)
* [Installation](#installation)
* [Using NoineRCScanner](#using-noinercscanner)
* [Comparision of RC Cards from different states](#comparision)

## Libraries

### OpenCV2

OpenCV (Open Source Computer Vision Library) is released under a BSD license and hence it’s free for both academic and commercial use. It has C++, Python and Java interfaces and supports Windows, Linux, Mac OS, iOS and Android. OpenCV was designed for computational efficiency and with a strong focus on real-time applications. Written in optimized C/C++, the library can take advantage of multi-core processing. Enabled with OpenCL, it can take advantage of the hardware acceleration of the underlying heterogeneous compute platform.

#### Website: https://opencv.org/

### pytesseract

Python-tesseract is an optical character recognition (OCR) tool for python. That is, it will recognize and “read” the text embedded in images.

Python-tesseract is a wrapper for Google’s Tesseract-OCR Engine. It is also useful as a stand-alone invocation script to tesseract, as it can read all image types supported by the Python Imaging Library, including jpeg, png, gif, bmp, tiff, and others, whereas tesseract-ocr by default only supports tiff and bmp. Additionally, if used as a script, Python-tesseract will print the recognized text instead of writing it to a file.

#### Github Repo : https://pypi.org/project/pytesseract/

## Installation

### OpenCV2
####       pip install opencv-python

###pytesseract
####       sudo apt-get install tesseract-ocr
####       pip install pytesseract


### Workflow

The user interfaces with the platform through the app NoineRCApp built using React Native
# To run the app use Expo client or use Android or IOS emulator

Photos clicked through the app goes to the model running on the Heroku servers containing the model to extract text and parse the text into the JSON format which is returned to the user.

### Files and Folders
1. NoineRCApp -> React Native App
2. RCApi -> Contains flask Api and the text extraction and parsing code
## RCApi/
    1. Main.py -> main file to call other modules
    2. OCR.py -> Text extraction model from images. Opencv for preprocessing images and PyTesseract for OCR
    3. parseRC.py -> parsing code for the text output of the OCR model. Takes the text, parses it and returns it in JSON format
    4. requirements.txt -> Requirements needed for the models to work


