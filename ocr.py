import cv2
import os
import sys


def main():     
        testImage = cv2.imread(sys.argv[1])
        h, w = testImage.shape[:2]
        ratio = w/h
        
        height = int(width / ratio)
        image = cv2.resize(testImage, (width, height))
        try:
                #print(width,'x',height,':',imgTest(image))
        except UnicodeEncodeError:
                print('UnicodeError')

main()
