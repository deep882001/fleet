def fetch_locations():
    """Fetch asset locations from the API and store new ones in the database."""
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
        conn.rollback()  # Rollback in case of an error
    finally:
        conn.close()

    return jsonify({"saved_locations": saved_locations, "total_fetched": len(assets)})
