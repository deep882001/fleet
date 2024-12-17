import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import "../styles/AssetTable.css"; // Optional for custom styling

function AssetTable() {
  const [data, setData] = useState([]); // Store the data here
  const [loading, setLoading] = useState(true); // To handle loading state

  // Columns definition for the table
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id", // Data property for ID
      },
      {
        Header: "Location",
        accessor: "location", // Data property for location
      },
    ],
    []
  );

  // Fetch data from back-end API when the component mounts
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/assets") // Your back-end API endpoint
      .then((response) => response.json())
      .then((data) => {
        setData(data); // Set data when it is fetched
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  // Use the useTable hook to handle the table logic
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  if (loading) {
    return <div>Loading...</div>; // Loading message while data is fetched
  }

  return (
    <div className="asset-table-container">
      <h2>Asset Table</h2>
      <table {...getTableProps()} className="asset-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AssetTable;
