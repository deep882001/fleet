import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";

const DataTable = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    axios
      .get("/get-locations") // Backend API endpoint
      .then((response) => {
        setAssets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching assets:", error);
      });
  }, []);

  return (
    <div id="datatable" style={{ marginTop: "20px" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset ID</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Longitude</TableCell>
              <TableCell>Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>{asset.asset_id}</TableCell>
                <TableCell>{asset.last_location_lat}</TableCell>
                <TableCell>{asset.last_location_lng}</TableCell>
                <TableCell>{asset.last_updated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataTable;
