from flask import Flask, request,jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route('/',methods=['GET'])
def runApi():
    return 'Api rodando'

@app.route('/predict',methods=['POST'])
def predict():
    req_data = request.get_json()
    
    model = joblib.load('./data/model_svm.joblib')
    
    features = req_data
    
    data_array = np.array([list(features.values())])
    
    prediction = model.predict(data_array)
    
    return jsonify(prediction.tolist())


app.run(debug=True,port=3000)
