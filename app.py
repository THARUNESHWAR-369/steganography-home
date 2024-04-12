import os
from flask import Flask, render_template
from modes.Image.image import image

app = Flask(__name__)
app.secret_key = "<Your Key>"

app.register_blueprint(image, url_prefix="/image")


@app.route("/")
def home():
    return render_template("home.html")

if __name__ == "__main__":
    app.run(debug=True)