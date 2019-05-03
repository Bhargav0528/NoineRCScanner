from PIL import Image
import pytesseract
import cv2
import os
import sys
import numpy as np
from cv2 import boundingRect, countNonZero, cvtColor, drawContours, findContours, getStructuringElement, imread, morphologyEx, pyrDown, rectangle, threshold

def imgTest(preimage):
        #rgb = pyrDown(image)
        # apply grayscale
        #preimage = cvtColor(rgb, cv2.COLOR_BGR2GRAY)
        preimage = cv2.fastNlMeansDenoisingColored(preimage,None,10,10,7,20)
        #cv2.imwrite('noise.jpg', preimage)
        preimage = cv2.cvtColor(preimage, cv2.COLOR_BGR2GRAY)
        preimage = cv2.adaptiveThreshold(preimage, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 5, 1)
        #preimage = cv2.threshold(preimage, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
        preimage = cv2.medianBlur(preimage, 3)
        
        filename = "{}.png".format(os.getpid())
        cv2.imwrite(filename, preimage)

        text = pytesseract.image_to_string(Image.open(filename))
        #os.remove(filename)
        return text

def firstRead(preimage, width, ratio):
        height = int(width / ratio)
        image = cv2.resize(preimage, (width, height))

        preimage = cv2.cvtColor(preimage, cv2.COLOR_BGR2GRAY)
        preimage = cv2.threshold(preimage, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
        preimage = cv2.medianBlur(preimage, 3)

        preimage = Image.fromarray(preimage)
        
        text = pytesseract.image_to_string(preimage)

        return text

def readRC(testImage):
        h, w = testImage.shape[:2]
        ratio = w/h
        

        read_one = firstRead(testImage, 1750, ratio)
        #print(read_one)


        bestRead = ""
        bestAvg = 0

        for width in range(1700,1801,25):
                lineSum = 0
                height = int(width / ratio)
                image = cv2.resize(testImage, (width, height))
                try:    
                        tempRead = imgTest(image)

                        temp = tempRead.replace(" ","")
                        tempList = temp.split("\n")

                        for line in tempList:
                                lineSum = lineSum + len(line)
                        
                        tempAvg = lineSum/len(line)

                        print("----------------------", width)
                        print(tempRead)


                        if(tempAvg>bestAvg):
                                bestRead = tempRead
                                bestAvg = tempAvg

                except UnicodeEncodeError:
                        print('UnicodeError')

        return read_one, bestRead
