import React from "react";
// Material-UI
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { Collapse, IconButton, Typography } from "@material-ui/core";

// Redux
import { useDispatch, useSelector } from "react-redux";
import * as actionSnackBar from "../redux/SnackBar/snackbarSlice";

export default function CustomizedSnackBars() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const snackBarOBJ = useSelector(state => state.snackBar);
	

	return (
		<div className={classes.root}>
			<Collapse in={snackBarOBJ.visible} timeout={400}>
				<Alert
					elevation={4}
					variant="filled"
					severity={snackBarOBJ.type}>
					<Typography data-cy="snackbar-msg" style={{ color: "#FFFFFF" }}>{snackBarOBJ.message}</Typography>
				</Alert>
			</Collapse>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top:'69px',
    right:'30px',
    width:'auto',
    zIndex: 1400,
    opacity:0.8,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      position: 'absolute',
      zIndex: 1400,
      width:'90%',
      right:'5%',
    },
  },
}));
