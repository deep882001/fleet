from flask import Blueprint, jsonify
import requests
from .db import get_db_connection  # PodStage pooled connection
from .config import API_CONFIG

routes = Blueprint('routes', __name__)

@routes.route('/', methods=['GET'])
def home():
    """Default route for the application."""
    return jsonify({"message": "Welcome to the Asset Location API"}), 200

@routes.route('/favicon.ico')
def favicon():
    """Return an empty response for favicon requests."""
    return '', 204

@routes.route('/get-locations', methods=['GET'])
def get_locations():
    """Fetch all asset locations from the database."""
    conn = get_db_connection()  # Get connection from PodStage
    try:
        query = "SELECT * FROM asset_locations"
        rows = conn.execute(query).fetchall()  # Fetch all rows
    finally:
        conn.close()  # Return the connection to the pool

    # Transform rows into a list of dictionaries
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

def fetch_locations():
    """Fetch asset locations from the API and store them in the database."""
    headers = {"X-Nspire-AppToken": API_CONFIG["api_token"]}
    response = requests.get(API_CONFIG["api_url"], headers=headers)
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch assets"}), response.status_code

    assets = response.json().get("content", [])
    saved_locations = []

    conn = get_db_connection()
    try:
        for asset in assets:
            location = asset.get("lastLocation")
            if location:
                query = """
                    INSERT INTO asset_locations (
                        asset_id, last_location_lat, last_location_lng, last_updated
                    ) VALUES (%s, %s, %s, %s)
                    ON CONFLICT (asset_id) DO UPDATE SET
                        last_location_lat = EXCLUDED.last_location_lat,
                        last_location_lng = EXCLUDED.last_location_lng,
                        last_updated = EXCLUDED.last_updated
                """
                conn.execute(
                    query,
                    (
                        asset["id"],
                        location.get("lat"),
                        location.get("lng"),
                        asset.get("lastUpdated"),
                    )
                )
                saved_locations.append(asset["id"])

        conn.commit()  # Commit all changes
    except Exception as e:
        print(f"Error saving locations: {e}")
        conn.rollback()  # Rollback changes on error
    finally:
        conn.close()

    return jsonify({"saved_locations": saved_locations, "total_fetched": len(assets)})
