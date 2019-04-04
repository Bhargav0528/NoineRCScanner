from PIL import Image
import pytesseract
import cv2
import os
import sys
import numpy as np
    
def imgTest(image):
        preimage = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        preimage = cv2.threshold(preimage, 0, 200,
        cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]

        #cv2.imshow('sd', img)
        #j=cv2.waitKey(0)
       
        filename = "{}.png".format(os.getpid())
        cv2.imwrite(filename, preimage)

        text = pytesseract.image_to_string(Image.open(filename))
        #os.remove(filename)
        return text

def main():     
        testImage = cv2.imread(sys.argv[1])
        h, w = testImage.shape[:2]
        ratio = w/h

        img = Image.open('test2.jpg')
        data = np.array(img)

        converted = np.where(data == 0, 255, 0)

        img = Image.fromarray(converted.astype('uint8'))
        img.save('new_pic.jpg')
        
        for width in range(1000,2701,25):
                height = int(width / ratio)
                image = cv2.resize(testImage, (width, height))
                try:
                        print("-------------------------------------------------------------------------------------------------------")
                        print("-------------------------------------------------------------------------------------------------------")      
                        print(width,'x',height,':',imgTest(image))
                except UnicodeEncodeError:
                        print('UnicodeError')

main()

