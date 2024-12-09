import pg8000 
from .config import DB_config

def get_db_connection():

    return pg8000.connect(
        user=DB_config["user"],
        password=DB_config["password"],
        host=DB_config["host"],
        database=DB_config["database"]
    )

