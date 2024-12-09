from flask import Blueprint, jsonify
import requests
from .db import get_db_connection
from .config import API_CONFIG

routes = Blueprint('routes', __name__)


routes = Blueprint('routes', __name__)

@routes.route('/', methods=['GET'])
def home():
    """Default route for the application."""
    return jsonify({"message": "Welcome to the Asset Location API"}), 200

@routes.route('/favicon.ico')
def favicon():
    return '', 204  # Return an empty response for favicon requests

def fetch_locations():
    """Fetch asset locations from the API and store new ones in the database."""
    headers = {"X-Nspire-AppToken": API_CONFIG["api_token"]}
    response = requests.get(API_CONFIG["api_url"], headers=headers)
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch assets"}), response.status_code

    assets = response.json().get("content", [])
    saved_locations = []

    conn = get_db_connection()
    cursor = conn.cursor()

    for asset in assets:
        location = asset.get("lastLocation")
        if location:
            try:
                cursor.execute(
                    """
                    INSERT INTO asset_locations (
                        asset_id, last_location_lat, last_location_lng, last_updated
                    ) VALUES (%s, %s, %s, %s)
                    ON CONFLICT (asset_id) DO UPDATE SET
                        last_location_lat = EXCLUDED.last_location_lat,
                        last_location_lng = EXCLUDED.last_location_lng,
                        last_updated = EXCLUDED.last_updated
                    """,
                    (
                        asset["id"],
                        location.get("lat"),
                        location.get("lng"),
                        asset.get("lastUpdated")
                    )
                )
                saved_locations.append(asset["id"])
            except Exception as e:
                print(f"Error saving location for asset {asset['id']}: {e}")
    
    conn.commit()
    cursor.close()
    conn.close()
    
    return jsonify({"saved_locations": saved_locations, "total_fetched": len(assets)})

@routes.route('/get-locations', methods=['GET'])
def get_locations():
    """Fetch all asset locations from the database."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM asset_locations")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    locations = [
        {
            "id": row[0],
            "asset_id": row[1],
            "last_location_lat": row[2],
            "last_location_lng": row[3],
            "last_updated": row[4]
        }
        for row in rows
    ]
    return jsonify(locations)
