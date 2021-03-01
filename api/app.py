import time
import os
import hashlib
import jwt
from firebase_admin import credentials, firestore, initialize_app
from flask import Flask, request, jsonify
from flask_cors import CORS


# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# Initialize Firestore DB
cred = credentials.Certificate('./serviceAccountKey.json')
default_app = initialize_app(cred)
db = firestore.client()
user_ref = db.collection('users')
post_ref = db.collection('posts')

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/post', methods=['POST'])
def createPost():
  try:
    post_ref.document().set(
      {
        "title": request.json['title'],
        "content": request.json['content'],
        "tags": request.json['tags'],
        "userId": request.json['user']
      }
    )
    return jsonify(
      {
        "success": True,
      }
    ), 200
  except Exception as e:
    return f"An Error Occured: {e}"

@app.route('/posts', methods=['GET'])
def allPosts():
  try:
    docs = [doc.to_dict() for doc in post_ref.stream()]
    return jsonify(docs), 200
  except Exception as e:
    return f"An Error Occured: {e}"

@app.route('/user/<user>/post', methods=['GET'])
def allUserPosts(user):
  try:
    docs = [doc.to_dict() for doc in post_ref.where(u'userId', u'==', user).stream()]
    return jsonify(docs), 200
  except Exception as e:
    return f"An Error Occured: {e}"

@app.route('/signup', methods=['POST'])
def signup():
  try:
    email = request.json['email']
    doc = user_ref.document(email).get()
    if doc.exists:
      return jsonify(
        {
          "success": False,
          "message": "Usuario existente"
        }
      ), 200
    else:
      password = hashlib.sha256(request.json['password'].encode())
      user_ref.document().set(
        {
          "email": request.json['email'],
          "password": password.hexdigest()
        }
      )
      return jsonify(
        {
          "success": True,
        }
      ), 200
  except Exception as e:
    return f"An Error Occured: {e}"

@app.route('/login', methods=['POST'])
def login():
  try:
    email = request.json['email']
    doc = next(user_ref.where(u'email', u'==', email).stream())
    hashedPass = hashlib.sha256(request.json['password'].encode())
    if doc.exists and doc.to_dict()['password'] == hashedPass.hexdigest():
      payload = {
        "email": doc.to_dict()['email'],
        "id": doc.id
      }
      token = jwt.encode(payload, "secret", algorithm="HS256")
      return jsonify(
        {
          "success": True,
          "token": token
        }
      ), 200
    else:
      return jsonify(
        {
          "success": False,
          "token": "token",
          "message": "Usuario no existente o la contraseña es incorrecta"
        }
      ), 200
  except Exception as e:
    return f"An Error Occured: {e}"

if __name__ == '__main__':
  app.run()