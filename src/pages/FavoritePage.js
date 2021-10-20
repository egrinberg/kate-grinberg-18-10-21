import React,{useState, useEffect} from 'react'
import { Grid, Typography,  Paper } from '@material-ui/core'

import { useHistory } from 'react-router-dom';

import {  withStyles, makeStyles } from '@material-ui/core/styles'


//redux
import { useDispatch, useSelector } from 'react-redux';
import * as weatherActions from '../redux/Weather/weatherSlice'

function FavoritePage() {

    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const favorites = useSelector(state => state.weather.favorites)

    const getMoreDetails = (location) => {
        dispatch(weatherActions.setCurrentLocation({LocalizedName: location.name, Key: location.id}))
        history.push('/')
    }

    return (
        <Grid container style={{ padding: 60 }} justifyContent='space-around' space={2}>
            {favorites && favorites.map(favorite => (
                <Grid item xs={12} sm={8} md={2}  style={{margin: 5, cursor: 'pointer'}} onClick={(e) => getMoreDetails(favorite)}>
                    <Paper elevation={3}  className={classes.itemWeather}>
                    <Grid container justifyContent='center'>
                        <Grid item xs={12}>
                            <Typography variant='subtitle1' className={classes.center}>{favorite.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.center} variant='subtitle2'>{favorite.currentWeather[0].Temperature.Metric.Value} {favorite.currentWeather[0].Temperature.Metric.Unit}</Typography>
                        </Grid>
                        <Grid item container xs={12} justifyContent='center'>
                            <Typography className={classes.center} variant='subtitle2' >{favorite.currentWeather[0].WeatherText}</Typography>
                        </Grid>
                     </Grid>
                     </Paper>
                </Grid>
            ))}
        </Grid>
    )
}

export default FavoritePage


const useStyles = makeStyles((theme) => ({
    currentWeatherContainer: {
      border: '1px solid black',
      marginTop: 40,
      padding: 20
      
    },
    center: {
        textAlign: 'center'
    },
    forecastContainer: {
        marginTop: 30
    },
    capitalize: {
        textTransform: 'capitalize'
    },
    itemWeather: {
        backgroundColor: theme.palette.background.paper,
        padding:5
    },

    
}))