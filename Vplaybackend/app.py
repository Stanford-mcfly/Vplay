from flask import Flask
from video_routes import video_bp
from auth_routes import auth_bp
from signup_routes import signup_bp
from comment_routes import comment_bp
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = 'your_secret_key'
CORS(app, supports_credentials=True)

# Register blueprints
app.register_blueprint(video_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(signup_bp)
app.register_blueprint(comment_bp)

if __name__ == '__main__':
    app.run(debug=True)
