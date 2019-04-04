from PIL import Image
import pytesseract
import cv2
import os
import sys
import numpy as np
    
def imgTest(image):
        #preimage = cv2.fastNlMeansDenoisingColored(image,None, 20,20, 7, 21)
        img = cv2.bilateralFilter(image,9,90,75)
        preimage = cv2.cvtColor( img, cv2.COLOR_BGR2GRAY)
        preimage = cv2.threshold(preimage, 0, 255,
        cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
        
        cv2.imshow('sd', img)
        j=cv2.waitKey(0)

       
        filename = "{}.png".format(os.getpid())
        cv2.imwrite(filename, preimage)

        #text = pytesseract.image_to_string(Image.open(filename))
        #os.remove(filename)
        return 'text'

def main():     
        testImage = cv2.imread(sys.argv[1])
        h, w = testImage.shape[:2]
        ratio = w/h

        
        hsv = cv2.cvtColor(testImage, cv2.COLOR_BGR2HSV)

        hsv_channels = cv2.split(hsv)

        rows = testImage.shape[0]
        cols = testImage.shape[1]

        for i in range(0, rows):
            for j in range(0, cols):
                h = hsv_channels[0][i][j]

                if h > 90 and h < 130:
                    hsv_channels[2][i][j] = 255
        
        cv2.imshow("show", hsv_channels[0])
        cv2.imshow("show2", hsv_channels[2])


        cv2.waitKey(0)

        '''
        for width in range(1000,2701,25):
                height = int(width / ratio)
                image = cv2.resize(testImage, (width, height))

                try:
                        print("-------------------------------------------------------------------------------------------------------")
                        print("-------------------------------------------------------------------------------------------------------")      
                        print(width,'x',height,':',imgTest(image))
                except UnicodeEncodeError:
                        print('UnicodeError')
                        
'''
main()

