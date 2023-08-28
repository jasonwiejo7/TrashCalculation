import os
import uuid
import time
import base64

from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO

UPLOAD_FOLDER = './images'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
Model = YOLO("../backend/best3.pt")

@app.route("/images", methods=['POST'])
def upload_picture():
    try:
        if 'photo' in request.files:
            photo = request.files['photo']
            global filename
            filename = str(uuid.uuid4()) + '.jpg'
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            photo.save(file_path)
            time.sleep(1)

            try :
                prediksi = Model.predict("../backend/images/" + filename, conf=0.5, imgsz=800, save=True)
                boxes = prediksi[0].boxes
                object = boxes.data
                test = object[0,5]
                test1= int(test)
                global valueSampah
                if (test1 == 0):
                    valueSampah = "Botol Plastik 1500 mL"
                elif (test1 == 1):
                    valueSampah = "Botol Plastik 330 mL"
                elif (test1 == 2):
                    valueSampah = "Botol Plastik 600 mL"
                elif (test1 == 3):
                    valueSampah = "Susu Ultra 1000 mL"
                elif (test1 == 4):
                    valueSampah = "Susu Ultra 125 mL"
                elif (test1 == 5):
                    valueSampah = "Susu Ultra 250 mL"
                elif (test1 == 6):
                    valueSampah = "Teh Kotak 300 mL"
                elif (test1 == 7):
                    valueSampah = "Teh Kotak 500 mL"
                elif (test1 == 8):
                    valueSampah = "Tumpukan"
                
            except IndexError:
                valueSampah = "None"
            
        else:
            return 'no file'
        
    except Exception as e:
        print(e)

    return("OK")

@app.route("/hasil", methods=['POST'])
def get_hasil():
    data = request.json
    global volume, TPS
    volume = data.get('total')
    TPS = data.get('TPS')
    return("OK")

@app.route("/image", methods=['GET'])
def send_image():
    image_path = "../backend/runs/detect/predict/" + filename
    if os.path.isfile(image_path):
        image_uri = f"data:image/jpeg;base64,{base64.b64encode(open(image_path, 'rb').read()).decode()}"
        return jsonify({'image_uri': image_uri})
    else:
        return jsonify({'error': 'Image not found'})

@app.route("/volume", methods=['GET'])
def send_volume():
    return jsonify(volume=volume)

@app.route("/tps", methods=['GET'])
def send_tps():
    return TPS

@app.route("/value", methods=['GET'])
def send_data():
    return valueSampah

@app.route('/test')
def test():
    return("Hello World")

if __name__ == '__main__':
    app.run()