from flask import Blueprint, request, jsonify, send_file
from gridfs import GridFS
from pymongo import MongoClient

# Initialize MongoDB client and GridFS
client = MongoClient('mongodb://localhost:27017/')
db = client['mydb']
fs = GridFS(db)

video_bp = Blueprint('video_bp', __name__)

@video_bp.route('/upload', methods=['POST'])
def upload_video():
    if 'video' not in request.files:
        return 'No video part', 400
    file = request.files['video']
    file_id = fs.put(file, filename=file.filename, contentType='video/mp4')
    return jsonify({'file_id': str(file_id), 'filename': file.filename})

@video_bp.route('/videos', methods=['GET'])
def get_videos():
    files = fs.find({'contentType': 'video/mp4'})
    video_list = [{'filename': file.filename, 'file_id': str(file._id)} for file in files]
    return jsonify(video_list)

@video_bp.route('/video/<filename>', methods=['GET'])
def get_video(filename):
    file = fs.find_one({'filename': filename})
    if not file:
        return 'File not found', 404
    return send_file(file, mimetype='video/mp4')