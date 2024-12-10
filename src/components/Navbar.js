import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Asset Manager
        </Typography>
        <Button color="inherit" href="#mapview">
          Map View
        </Button>
        <Button color="inherit" href="#datatable">
          Data Table
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
