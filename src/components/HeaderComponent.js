import { Toolbar, AppBar, Grid, Typography } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react'

import { NavLink } from 'react-router-dom';

import * as weatherActions from '../redux/Weather/weatherSlice'


import WbSunnyIcon from '@material-ui/icons/WbSunny'
import NightsStayIcon from '@material-ui/icons/NightsStay';



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
                                    Weather App
                                </Typography>
                            </Grid>

                        </Grid>

                    </Grid>
                    <Grid item xs={4}>
                        <Grid container justifyContent='center'>
                            <StyledToggleButtonGroup size="small" value={styleMode} exclusive onChange={handleChange}>
                                <StyledToggleButton value="light" className={classes.toggle}>
                                    <WbSunnyIcon className={classes.toggleIcon} />
                                </StyledToggleButton>
                                <StyledToggleButton value="dark" className={classes.toggle}>
                                    <NightsStayIcon className={classes.toggleIcon} />
                                </StyledToggleButton>
                            </StyledToggleButtonGroup>

                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container justifyContent='flex-end'>
                            <Grid item style={{ margin: 5 }}>
                                <NavLink
                                    to='/'
                                    className={classes.navButton}
                                >
                                    Home
                                </NavLink>
                            </Grid>
                            <Grid item style={{ margin: 5 }}>
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
    },
    toggle: {
        textTransform: 'capitalize',
    },
    toggleIcon: {
        fill: theme.palette.button.text
    }

}));


const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
        margin: theme.spacing(0.5),
        border: 'none',
        '&:not(:first-child)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-child': {
            borderRadius: theme.shape.borderRadius,
        },
    },

}))(ToggleButtonGroup);

const StyledToggleButton = withStyles((theme) => ({
    root: {
        '&.Mui-selected': {
            backgroundColor: theme.palette.button.main,
            '&:hover': {
                backgroundColor: theme.palette.button.hover
            },
        },
        '&:hover': {
            backgroundColor: theme.palette.toggle.hover
        }
    }

}))(ToggleButton)