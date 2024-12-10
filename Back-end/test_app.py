import unittest
from flask import Flask
from app import create_app
from app.routes import routes
from unittest.mock import patch, MagicMock


class TestAssetLocationAPI(unittest.TestCase):
    def setUp(self):
        """Set up the test environment."""
        self.app = create_app()
        self.app.register_blueprint(routes)
        self.client = self.app.test_client()

    def test_home(self):
        """Test the home route."""
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"message": "Welcome to the Asset Location API"})

    def test_favicon(self):
        """Test the favicon route."""
        response = self.client.get('/favicon.ico')
        self.assertEqual(response.status_code, 204)

    @patch('app.routes.get_Database_connection')
    def test_get_locations(self, mock_db_connection):
        """Test the get_locations route."""
        # Mock database connection and query results
        mock_connection = MagicMock()
        mock_connection.execute.return_value.fetchall.return_value = [
            (1, "asset_123", 12.34, 56.78, "2024-12-10T10:00:00Z"),
            (2, "asset_456", 23.45, 67.89, "2024-12-10T11:00:00Z"),
        ]
        mock_db_connection.return_value = mock_connection

        response = self.client.get('/get-locations')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, [
            {
                "id": 1,
                "asset_id": "asset_123",
                "last_location_lat": 12.34,
                "last_location_lng": 56.78,
                "last_updated": "2024-12-10T10:00:00Z"
            },
            {
                "id": 2,
                "asset_id": "asset_456",
                "last_location_lat": 23.45,
                "last_location_lng": 67.89,
                "last_updated": "2024-12-10T11:00:00Z"
            }
        ])

    @patch('app.routes.requests.get')
    @patch('app.routes.get_Database_connection')
    def test_fetch_locations(self, mock_db_connection, mock_requests_get):
        """Test the fetch_locations function."""
        # Mock API response
        mock_requests_get.return_value.status_code = 200
        mock_requests_get.return_value.json.return_value = {
            "content": [
                {
                    "id": "asset_123",
                    "lastLocation": {"lat": 12.34, "lng": 56.78},
                    "lastUpdated": "2024-12-10T10:00:00Z"
                },
                {
                    "id": "asset_456",
                    "lastLocation": {"lat": 23.45, "lng": 67.89},
                    "lastUpdated": "2024-12-10T11:00:00Z"
                },
            ]
        }

        # Mock database connection
        mock_connection = MagicMock()
        mock_db_connection.return_value = mock_connection

        from app.routes import fetch_locations
        response = fetch_locations()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"saved_locations": ["asset_123", "asset_456"], "total_fetched": 2})

        # Ensure database insertion occurred
        self.assertEqual(mock_connection.execute.call_count, 2)
        mock_connection.commit.assert_called_once()

if __name__ == '__main__':
    unittest.main()
