import React,{useState, useEffect} from 'react'
import { Grid, TextField,Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom';



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
                <Grid item xs={12} sm={8} md={2}   style={{padding: 5,margin: 5, border: '1px solid black'}} onClick={(e) => getMoreDetails(favorite)}>
                    <Grid container justifyContent='center'>
                        <Grid item xs={12}>
                            <Typography className={classes.center}>{favorite.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.center}>{favorite.currentWeather[0].Temperature.Metric.Value} {favorite.currentWeather[0].Temperature.Metric.Unit}</Typography>
                        </Grid>
                        <Grid item container xs={12} justifyContent='center'>
                            <Typography className={classes.center}>{favorite.currentWeather[0].WeatherText}</Typography>
                        </Grid>
                     </Grid>
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
    }

    
}))