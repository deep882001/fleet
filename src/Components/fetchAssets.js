import axios from "axios";

// Function to fetch asset locations and statuses
const fetchAssets = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/api/assets"); // Flask endpoint
    const assets = response.data.content || []; // Extract assets from response

    // Filter for locations and add status
    const filteredAssets = assets
      .filter((asset) => asset.lastLocation) // Ensure asset has a location
      .map((asset) => ({
        id: asset.id,
        name: asset.name || "Unnamed Asset",
        location: asset.lastLocation,
        status: asset.status || "Unknown", // Add status (e.g., Stopped, Moving)
      }));

    return filteredAssets; // Return formatted assets
  } catch (err) {
    console.error("Error fetching assets:", err);
    throw new Error("Failed to fetch asset data.");
  }
};

export default fetchAssets;
