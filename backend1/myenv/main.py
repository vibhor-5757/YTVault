# from fastapi import FastAPI
# from pytube import YouTube

# app = FastAPI()

# @app.get('/')
# def sendData():
#     return {'message': 'hello world'}

# @app.post("/download/{link:path}")
# def display_videos(link:str ):
#     ytobj = YouTube(link)
#     video = ytobj.streams.get_highest_resolution()
#     video.download()
#     return {"message": "Video downloaded successfully."}
    

from fastapi import FastAPI, HTTPException
from pytube import YouTube
from fastapi.middleware.cors import CORSMiddleware
import logging

app = FastAPI()
logging.basicConfig(level=logging.INFO)


@app.get('/')
def sendData():
    return {'message': 'hello world'}

@app.post("/download/")
def download_video(link: str):
    try:
        logging.info(f"Attempting to download video from link: {link}")
        ytobj = YouTube(link)
        logging.info("YouTube object created successfully")
        
        streams = ytobj.streams
        for stream in streams:
            logging.info(f"Stream: {stream} - {stream.mime_type} - {stream.resolution}")
        
        # # Attempt to get highest resolution video
        video = streams.get_highest_resolution()
        logging.info(f"Selected video stream: {video}")
        
        video.download()  
        return {"message": "Video downloaded successfully."}
    except Exception as e:
        logging.error(f"Error downloading video: {e}")
        raise HTTPException(status_code=400, detail=str(e))


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )