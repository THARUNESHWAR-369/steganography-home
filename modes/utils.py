import numpy as np
import cv2

from io import BytesIO
from base64 import b64encode


class IMG_CONVERTER:

    def buffToImg(self, buff) -> np.ndarray:
        img = np.asarray(bytearray(buff.read()), dtype=np.uint8)
        try:
            img = cv2.imdecode(img, cv2.IMREAD_COLOR)
        except:
            img = cv2.imdecode(img, cv2.IMREAD_COLOR)
        return img

    def imgToBuf(self, img):
        buff = BytesIO()
        img.save(buff)
        buff.seek(0)
        return buff

    def numpyArrayToBytesIO(self, numpyArray):
        return BytesIO(cv2.imencode(".jpg", numpyArray)[-1])

    def htmlFormat(self, buff):
        return b64encode(buff.getvalue()).decode("utf-8")
