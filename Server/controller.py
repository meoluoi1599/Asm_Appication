from flask import Flask, render_template,jsonify, json, request,send_from_directory,send_file
import json

import model 
from model import database
database = database() 

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'
app.config['JWT_SECRET_KEY'] = 'Meow meow meow'

@app.route('/rate', methods = ['POST'])
def rate():
    restaurantName = request.json.get('restaurantName')
    restaurantType = request.json.get('restaurantType')
    price = request.json.get('price')
    date =  request.json.get('date')
    serviceRating = request.json.get('serviceRating')
    foodRating = request.json.get('foodRating')
    cleanlinessRating = request.json.get('cleanlinessRating')
    total = request.json.get('total')
    note = request.json.get('note')
    values = (restaurantName, restaurantType, price, date, serviceRating, foodRating, cleanlinessRating, total ,note)
    result = database.rate(values)
    return jsonify({'row-affect': result})

@app.route('/get_rating')
def get_rating():
    result = database.get_rating() 
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True,host="127.0.0.1", port=5000)