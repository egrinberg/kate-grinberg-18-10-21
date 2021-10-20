import { Toolbar, AppBar, Grid, Typography } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react'

import { NavLink } from 'react-router-dom';

import * as weatherActions from '../redux/Weather/weatherSlice'



function HeaderComponent() {
    const classes = useStyles()
    const styleMode = useSelector(state => state.weather.theme)
    const dispatch = useDispatch()

    const handleChange = (event, newAlignment) => {
        dispatch(weatherActions.setTheme(newAlignment))
    };

    
     
    
    

    return (
        <AppBar position='fixed' elevation={0} className={classes.appBar}>
            <Toolbar style={{ paddingLeft: 20, minHeight: 50 }}>
                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Grid item xs={4}>
                        <Grid container alignItems='center'>
                            <Grid item xs={12}>
                                <Typography variant='h1'>
                                    Herolo Home Task
                                </Typography>
                            </Grid>                           
                            
                        </Grid>
                        
                    </Grid>
                    <Grid item xs={4}>
                    <ToggleButtonGroup size="small" value={styleMode} exclusive onChange={handleChange}>
                        <ToggleButton value="light">
                            <Typography fontSize="small">Light Mode</Typography>
                        </ToggleButton>
                        <ToggleButton value="dark">
                            <Typography fontSize="small">Dark Mode</Typography>
                        </ToggleButton>                        
                    </ToggleButtonGroup>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container justifyContent='flex-end'>
                            <Grid item style={{margin: 5}}>
                        <NavLink
                            to='/'                            
                            className={classes.navButton}                           
                        >
                            Home
                        </NavLink>
                        </Grid>
                        <Grid item style={{margin: 5}}>
                        <NavLink
                            to='/favorite'                            
                            className={classes.navButton}                           
                        >
                            Favorite
                        </NavLink> 
                        </Grid>                      
                        </Grid>
                         
                    </Grid>
                    
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderComponent

const useStyles = makeStyles((theme) => ({
    appBar: {
      backgroundColor: theme.palette.background.appbar,
    }, 
    navButton: {
        color: theme.palette.button.main,
        textDecoration: 'none',
        fontWeight: 400,
        fontSize: 16,
        '&:hover': {
          transition: '.2s',
          backgroundColor: 'transparent',
          color: theme.palette.button.main,
          textDecoration: 'underline'
        },        
    }  
    
  }));
