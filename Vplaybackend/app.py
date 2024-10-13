from flask import Flask
from video_routes import video_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Register the blueprint
app.register_blueprint(video_bp)

if __name__ == '__main__':
    app.run(debug=True)