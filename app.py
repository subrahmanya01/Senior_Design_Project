
from flask_cors import CORS
from flask import Flask, jsonify,render_template,request
from processdata import processdata
import argparse
import os
import platform
import sys
from pathlib import Path
import base64


app = Flask(__name__)
CORS(app)
# In this case, the URL route is 'displaylocations'.
@app.route('/')
def main():
    return render_template("index.html")

@app.route("/contribute")
def contribute():
    return render_template("location.html")

@app.route('/displaylocations')
def displaylocations():
    # Obtain the CSV data.
    l = processdata()
    # Forward the data to the source that called this API.
    return jsonify(l)

@app.route("/api", methods=['GET','POST'])
def api():
    if request.method  =='GET':
        return "NO PICTURE"
    if request.method =='POST':
        image_data = request.form.get("content").split(",")[1]
        with open("static/Pothole/client_image.png","wb") as f:
            f.write(base64.b64decode(image_data))
        res  = True
        if(res):
            return "Potholes Detected"
        else:
            return "Good road"

    
    
if __name__ == '__main__':
    app.run(debug=True)
