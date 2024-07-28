import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Animal Shelter
        </Typography>
        <Button color="inherit" component={Link} to="/list">
          List Animals
        </Button>
        <Button color="inherit" component={Link} to="/create">
          Register Animal
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
