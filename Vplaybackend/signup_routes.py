from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from werkzeug.security import generate_password_hash
from flask_cors import CORS
import base64

signup_bp = Blueprint('signup_bp', __name__)
CORS(signup_bp, supports_credentials=True)

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['yourdbname']
users_collection = db['users']

@signup_bp.route('/signup', methods=['POST'])
def signup():
    user_id = request.form.get('userId')
    name = request.form.get('name')
    email = request.form.get('email')
    password = request.form.get('password')
    profile_picture = request.files.get('profilePicture')

    if users_collection.find_one({'email': email}):
        return jsonify({'message': 'Email already exists'}), 400

    hashed_password = generate_password_hash(password)

    if profile_picture:
        profile_picture_base64 = base64.b64encode(profile_picture.read()).decode('utf-8')
    else:
        profile_picture_base64 = None

    user = {
        'userId': user_id,
        'name': name,
        'email': email,
        'password': hashed_password,
        'profilePicture': profile_picture_base64,
        'subscribedUsers': [],
        'followers': []
    }

    users_collection.insert_one(user)
    return jsonify({'message': 'Signup successful'}), 201