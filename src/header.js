import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: '#212413',
  },
  grow: {
    flexGrow: 1,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root} styles={styles.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow} styles={styles.grow}>
            Placement Cell GEC Thrissur
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
