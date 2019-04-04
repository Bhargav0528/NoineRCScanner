import numpy as np
import cv2
import urllib


from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from pyimagesearch.transform import four_point_transform

import OCR

app = Flask(__name__)
api = Api(app)

class Main(Resource):

    def get(self):

        url = request.args.get('url')
        token = request.args.get('token')
        correctorOn = True
        url = url + '&token=' + token

        url_response = urllib.request.urlopen(url)
        img_array = np.array(bytearray(url_response.read()), dtype=np.uint8)
        plateImg = cv2.imdecode(img_array, -1)
        height, width = plateImg.shape[:2]
        warped = four_point_transform(plateImg, np.array([(0,0),(width,0),(width,height),(0,height)]))

        h, w = warped.shape[:2]
        ratio = w/h
        height = int(300 / ratio)
        imgPlate = cv2.resize(warped, (300, height))
        #cv2.imshow('lol',imgPlate)
        #cv2.waitKey(0)

        textRead = OCR.readRC(warped)
        #print(len(validChars))

        plateText = OCR.readPlate(validChars,correctorOn)
        print(plateText)
        if plateText != 'ignore':
            return jsonify(plate = plateText)
        else:
            return jsonify(plate='Try Again!')

api.add_resource(Main, '/plate')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
