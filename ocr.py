from PIL import Image
import pytesseract
import cv2
import os
import sys
import numpy as np
from cv2 import boundingRect, countNonZero, cvtColor, drawContours, findContours, getStructuringElement, imread, morphologyEx, pyrDown, rectangle, threshold

def imgTest(image):

        #rgb = pyrDown(image)
        
        # apply grayscale
        #preimage = cvtColor(rgb, cv2.COLOR_BGR2GRAY)
        
        preimage = cv2.fastNlMeansDenoisingColored(image,None,20,20,7,20)
        #cv2.imwrite('noise.jpg', preimage)
        preimage = cv2.cvtColor(preimage, cv2.COLOR_BGR2GRAY)
        preimage = cv2.adaptiveThreshold(preimage, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 5, 3)
        #preimage = cv2.threshold(preimage, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
        preimage = cv2.medianBlur(preimage, 3)
        
        filename = "{}.png".format(os.getpid())
        cv2.imwrite(filename, preimage)

        text = pytesseract.image_to_string(Image.open(filename))
        #os.remove(filename)
        return text

def main():     
        testImage = cv2.imread(sys.argv[1])
        h, w = testImage.shape[:2]
        ratio = w/h
        
        
        print(imgTest(testImage))
        

        for width in range(1700,2000,25):
                height = int(width / ratio)
                image = cv2.resize(testImage, (width, height))
                try:
                        print("--------------------------------------------------------------------------------------------------")
                        print("--------------------------------------------------------------------------------------------------")
                        print(width,'x',height,':',imgTest(image))
                except UnicodeEncodeError:
                        print('UnicodeError')

        cv2.imshow("sd",testImage)
        cv2.waitKey(0)
main()