# USAGE
# python ocr.py --image images/example_01.png 
# python ocr.py --image images/example_02.png  --preprocess blur

# import the necessary packages
from PIL import Image
import pytesseract
import argparse
import cv2
import os
import sys

def imgTest(image):
        preimage = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        preimage = cv2.threshold(preimage, 0, 255,
        cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
        preimage = cv2.medianBlur(preimage, 3)

        # write the grayscale image to disk as a temporary file so we can
        # apply OCR to it
        filename = "{}.png".format(os.getpid())
        cv2.imwrite(filename, preimage)

        # load the image as a PIL/Pillow image, apply OCR, and then delete
        # the temporary file
        text = pytesseract.image_to_string(Image.open(filename))
        os.remove(filename)
        return text

def readRC(testImage):     
        #testImage = cv2.imread('images/'+sys.argv[1])
        h, w = testImage.shape[:2]
        ratio = w/h
        
        for width in range(25,2701,25):
                height = int(width / ratio)
                image = cv2.resize(testImage, (width, height))
                try:
                        print(width,'x',height,':',imgTest(image))
                except UnicodeEncodeError:
                        print('UnicodeError')
