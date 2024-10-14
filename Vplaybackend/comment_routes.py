from flask import Blueprint, request, jsonify, session
from pymongo import MongoClient
from bson import ObjectId

comment_bp = Blueprint('comment_bp', __name__)

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['mydb']
videos_collection = db['videos']
comments_collection = db['comments']

@comment_bp.route('/comments/<video_id>', methods=['GET'])
def get_comments(video_id):
    comments = comments_collection.find({'video_id': video_id})
    comments_list = []
    for comment in comments:
        comments_list.append({
            'userId': comment['userId'],
            'text': comment['text']
        })
    return jsonify(comments_list), 200

@comment_bp.route('/comments/<video_id>', methods=['POST'])
def add_comment(video_id):
    user_id = session.get('user_id')
    comment_text = request.json.get('text')

    if not user_id or not comment_text:
        return jsonify({'message': 'Invalid input'}), 400

    comment = {
        'userId': user_id,
        'text': comment_text,
        'video_id': video_id  # Store the associated video ID
    }

    comment_id = comments_collection.insert_one(comment).inserted_id

    # Update the video collection to include this comment ID
    videos_collection.update_one(
        {'_id': ObjectId(video_id)},
        {'$addToSet': {'commentIds': comment_id}}  # Store comment ID in the video
    )

    return jsonify({'message': 'Comment added successfully'}), 201
