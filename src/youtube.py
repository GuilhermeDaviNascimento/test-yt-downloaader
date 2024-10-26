from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from pytubefix import YouTube
import os

app = Flask(__name__)
CORS(app)

@app.route('/baixar_video', methods=['POST'])
def baixar_video():
    data = request.get_json()
    link = data.get("link")

    yt = YouTube(link)
    stream = yt.streams.get_highest_resolution()
    video_path = stream.download()

    # Envia o vídeo como arquivo para download
    return send_file(video_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
