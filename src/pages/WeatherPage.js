import React,{useState, useEffect} from 'react'
import { Grid, TextField,Typography, Button } from '@material-ui/core'
import {  makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete';
import moment from 'moment'

//redux
import { useDispatch, useSelector } from 'react-redux';
import * as weatherActions from '../redux/Weather/weatherSlice'


import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';





function WeatherPage() {

    const classes = useStyles()
    const dispatch = useDispatch()
    const locations = useSelector(state => state.weather.locations)
    const location = useSelector(state => state.weather.currentLocation)
    const favorites = useSelector(state=> state.weather.favorites)
    const forecast = useSelector(state=> state.weather.currentLocation.forecast)
   
    
    const [search, setSearch] = useState('Tel Aviv')
    const [currentLocation,setCurrentLocation] = useState(null)
    const [favorite, setFavorite] = useState(false)
    

    console.log(currentLocation,'currentlocation')

    useEffect(() => {
        setFavorite(false)        
        if(location) {            
            dispatch(weatherActions.getCurrentWeather(location.locationKey))
            dispatch(weatherActions.getWeatherForecast(location.locationKey))
            if(favorites.find(fav => fav.id === location.locationKey) !== undefined){
                setFavorite(true)
            }
        } 
    },[location])

    useEffect(() => {
        if(search !== '') {
            const delayDebounceFn = setTimeout(() => {
                dispatch(weatherActions.getLocationsData(search))    
            },1000)
            return () => clearTimeout(delayDebounceFn)
        }
        else {            
            dispatch(weatherActions.setLocations([]))
        }        
    }, [search])

    useEffect(() => {
        if(currentLocation) {
            dispatch(weatherActions.setCurrentLocation(currentLocation))
            // dispatch(weatherActions.getCurrentWeather(currentLocation.Key))
        }
       
    }, [currentLocation])

    const addToFavorite = () => {
        setFavorite(true)
        dispatch(weatherActions.addToFavorite(location))
        
    }
    const removeFromFavorite = () => {
        setFavorite(false)
        dispatch(weatherActions.removeFromFavorite(location))
    }

    return (
        <Grid container style={{ paddingTop: 60 }} justifyContent='center'>
            <Grid item xs={8}>
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    autoComplete='off'
                    options={locations && locations.map((option) => option.LocalizedName)} 
                    onChange={(e, newValue) => setCurrentLocation(locations.find(item => item.LocalizedName === newValue))}
                    onInputChange={(event, newInputValue) => {
                        setSearch(newInputValue)
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search input"
                            margin="normal"
                            variant="outlined"
                            InputProps={{ ...params.InputProps, type: 'search' }}
                        />
                    )}
                />
            </Grid>
            {location && location.currentWeather && <Grid item xs={10} className={classes.currentWeatherContainer}>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Grid container>
                                    <Grid item>
                                        {/* picture */}
                                    </Grid>
                                    <Grid item>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                    <Typography>{location.locationName}</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                    <Typography>{location.currentWeather[0].Temperature.Metric.Value} {location.currentWeather[0].Temperature.Metric.Unit}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container justifyContent='flex-end'>                                    
                                    {favorite ? <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className={classes.capitalize}
                                        startIcon={<FavoriteIcon/>}
                                        onClick={(e) => removeFromFavorite()}
                                    >
                                        Remove from Favorite
                                    </Button>:
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className={classes.capitalize}
                                        startIcon={<FavoriteBorderIcon/>}
                                        onClick={(e) => addToFavorite()}
                                    >
                                        Add to Favorite
                                    </Button>}
                                </Grid>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} justifyContent='center'>
                        {/* <ScatteredClouds /> */}
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent='space-around' className={classes.forecastContainer}>
                        {/* five day forecast */}
                        {forecast && forecast.map(day => (
                            <Grid item xs={12} sm={8} md={2} style={{padding: 5, margin: 5, border: '1px solid black'}}>
                                <Grid container justifyContent='center'>
                                    <Grid item xs={12}>
                                        <Typography className={classes.center}>{moment(day.Date).format('dddd')}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography className={classes.center}>{day.Temperature.Maximum.Value} {day.Temperature.Maximum.Unit}</Typography>
                                    </Grid>
                                    <Grid item container xs={12} justifyContent='center'>
                                        <CloudQueueIcon/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        }
        </Grid>
    )
}

export default WeatherPage

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