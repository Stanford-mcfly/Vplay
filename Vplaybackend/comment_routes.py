from flask import Blueprint, request, jsonify, session
from pymongo import MongoClient
from bson import ObjectId

client = MongoClient('mongodb://localhost:27017/')
db = client['mydb']
videos_collection = db['videos']
comments_collection = db['comments']

comment_bp = Blueprint('comment_bp', __name__)

@comment_bp.route('/comment', methods=['POST'])
def add_comment():
    user_id = session.get('user_id')
    video_id = request.form.get('video_id')
    comment_text = request.form.get('comment')

    comment = {
        'userId': user_id,
        'text': comment_text
    }

    comment_id = comments_collection.insert_one(comment).inserted_id
    videos_collection.update_one({'_id': ObjectId(video_id)}, {'$push': {'comments': comment_id}})

    return jsonify({'message': 'Comment added successfully'}), 201
