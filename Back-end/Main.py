from flask import Flask, jsonify
from flask_cors import CORS
import requests
from requests.auth import HTTPBasicAuth
import certifi

app = Flask(__name__)
CORS(app)  # Allow front-end to access this API

# Spireon API credentials
API_URL = "https://services.spireon.com/v0/rest/assets"
TOKEN = "803ea778-2d93-4824-a9a6-19fecd598da3"
USERNAME = "spireonintegration@redwoodmaterials.com"
PASSWORD = "ReDw34#$Mat"

@app.route("/api/assets", methods=["GET"])
def get_assets():
    headers = {
        "X-Nspire-AppToken": TOKEN,
        "Content-Type": "application/json",
    }
    try:
        # Fetch data from Spireon API
        response = requests.get(
            API_URL,
            headers=headers,
            auth=HTTPBasicAuth(USERNAME, PASSWORD),
            verify=certifi.where()
        )
        response.raise_for_status()
        return jsonify(response.json())  # Return JSON data to the front-end
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Failed to fetch assets: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
