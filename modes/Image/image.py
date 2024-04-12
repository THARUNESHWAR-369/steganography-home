from flask import Blueprint, render_template, request, redirect, flash, send_file, jsonify
from PIL import Image
from io import BytesIO
import stepic
from modes.utils import IMG_CONVERTER
import cv2
import numpy as np

image = Blueprint(
    "image", __name__, static_folder="static", template_folder="templates"
)
img_cvt = IMG_CONVERTER()

@image.route("/encode-result", methods=["POST", "GET"])
def image_encode_result():
    """
    A route for encoding the result of an image. Handles both POST and GET methods. 
    If a POST request is received, it encodes the image with provided data using stepic library, 
    saves the encoded image as PNG, and returns it along with the status and filename. 
    If any errors occur during the process, it returns status as False. 
    For all other requests, it renders the 'home.html' template.
    """
    if request.method == "POST":
        if "image" not in request.files:
            flash("No image found")
            return redirect(request.url)
        
        
        print("files: ",request.files)
        print("Data: ",request.form)

        file = request.files["image"]

        if request.form["data"] == "":
            flash("No data provided")
            return redirect(request.url)

        if file.filename == "":
            flash("No selected image")
            return redirect(request.url)

        data = request.form["data"]

        image_bytes = BytesIO()
        file.save(image_bytes)
        image_bytes.seek(0)

        img = Image.open(image_bytes)

        print("Exec image processing...")
        try:

            encode = stepic.encode(img, bytes(data, encoding='utf-8'))
            
            print("Encoded done..")

            img_byte_arr = BytesIO()
            encode.save(img_byte_arr, format='PNG')
            i = img_cvt.htmlFormat(img_byte_arr)
            
            return jsonify({"img": i, "status": True, "filename": file.filename})

        except Exception as e:
            print(f"Error processing image: {str(e)}")
            return jsonify({"status": False})

    return render_template("home.html")


@image.route("/decode-result", methods=['POST', 'GET'])
def image_decode_result():
    """
    A function to decode the result of an image, handling POST and GET requests. It checks if an image is present in the request, and if so, processes the image and returns the decoded data with a status of true. If an error occurs during image processing, it returns a status of false. Returns a rendered template for GET requests.
    """
    if request.method == "POST":
        if "image" not in request.files:
            flash("No image found")
            return redirect(request.url)

        file = request.files["image"]

        if file.filename == "":
            flash("No selected image")
            return redirect(request.url)

        image_bytes = BytesIO()
        file.save(image_bytes)
        image_bytes.seek(0)

        img = Image.open(image_bytes)

        try:

            decode = stepic.decode(img)


            return jsonify({"data": decode, "status": True})

        except Exception as e:
            print(f"Error processing image: {str(e)}")
            return jsonify({"status": False})

    return render_template("home.html")
