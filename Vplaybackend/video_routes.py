from flask import Blueprint, request, jsonify, send_file, session
from gridfs import GridFS
from pymongo import MongoClient
import base64

client = MongoClient('mongodb://localhost:27017/')
db = client['mydb']
fs = GridFS(db)
videos_collection = db['videos']
users_collection = db['users']

video_bp = Blueprint('video_bp', __name__)

@video_bp.route('/upload', methods=['POST'])
def upload_video():
    if 'video' not in request.files or 'thumbnail' not in request.files:
        return 'Video and thumbnail are required', 400

    title = request.form.get('title')
    description = request.form.get('description')
    owner_id = session.get('user_id')

    video_file = request.files['video']
    thumbnail_file = request.files['thumbnail']

    # Store thumbnail as base64
    thumbnail_base64 = base64.b64encode(thumbnail_file.read()).decode('utf-8')

    # Store video in GridFS
    file_id = fs.put(video_file, filename=video_file.filename, contentType='video/mp4')

    video = {
        'ownerId': owner_id,
        'title': title,
        'description': description,
        'filename': video_file.filename,
        'thumbnail': thumbnail_base64,
        'file_id': file_id,
        'likes': 0,
        'comments': []
    }
    videos_collection.insert_one(video)
    return jsonify({'message': 'Video uploaded successfully'}), 201

@video_bp.route('/videos', methods=['GET'])
def get_videos():
    videos = videos_collection.find()
    video_list = []
    for video in videos:
        owner = users_collection.find_one({'userId': video['ownerId']})
        video_list.append({
            'title': video['title'],
            'thumbnail': video['thumbnail'],
            'filename': video['filename'],
            'ownerName': owner['name'],
            'ownerProfilePicture': owner['profilePicture']
        })
    return jsonify(video_list)

@video_bp.route('/video/<filename>', methods=['GET'])
def get_video(filename):
    file = fs.find_one({'filename': filename})
    if not file:
        return 'File not found', 404
    return send_file(file, mimetype='video/mp4')
