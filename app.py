from flask import Flask,render_template,request
import base64
#from modelrun import run


app = Flask(__name__)

# In this case, the URL route is 'displaylocations'.
@app.route('/')
def main():
    return render_template("index.html")

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
    app.run()