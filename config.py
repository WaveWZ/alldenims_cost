# might be necessary if database connection is required
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'so-secret-key'
    
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'mysql+mysqlconnector://user:password@host/dbname' 
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False