import React, { useState, useEffect } from 'react'
import { Grid, TextField, Typography, Button, Paper } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete';
import moment from 'moment'

//redux
import { useDispatch, useSelector } from 'react-redux';
import * as weatherActions from '../redux/Weather/weatherSlice'


import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import { ReactComponent as MagnifingGlassIcon } from '../assets/Magnifing-glass.svg';





function WeatherPage() {

    const classes = useStyles()
    const dispatch = useDispatch()
    const locations = useSelector(state => state.weather.locations)
    const location = useSelector(state => state.weather.currentLocation)
    const weatherLoading = useSelector(state=>state.weather.currentLocation.loadingWeather)    
    const favorites = useSelector(state => state.weather.favorites)
    const forecast = useSelector(state => state.weather.currentLocation.forecast)
    const forecastLoading = useSelector(state=>state.weather.currentLocation.loadingForecast) 


    const [search, setSearch] = useState(null)
    const [currentLocation, setCurrentLocation] = useState(null)
    const [favorite, setFavorite] = useState(false)


    useEffect(() => {
        setFavorite(false)
        if (location) {
                        
            dispatch(weatherActions.getCurrentWeather(location.locationKey))
            dispatch(weatherActions.getWeatherForecast(location.locationKey))
            if (favorites.find(fav => fav.id === location.locationKey) !== undefined) {
                setFavorite(true)
            }
        }
    }, [location.locationName])

    useEffect(() => {
        if (search && search !== '') {
            const delayDebounceFn = setTimeout(() => {
                dispatch(weatherActions.getLocationsData(search))
            }, 1000)
            return () => clearTimeout(delayDebounceFn)
        }
        else {
            dispatch(weatherActions.setLocations([]))
        }
    }, [search])

    useEffect(() => {
        if (currentLocation !== null && currentLocation !== undefined) {             
            dispatch(weatherActions.setCurrentLocation(currentLocation))            
        }
    }, [currentLocation])

    const addToFavorite = () => {
        setFavorite(true)
        dispatch(weatherActions.addCityToFavorite(location))

    }
    const removeFromFavorite = () => {
        setFavorite(false)
        dispatch(weatherActions.removeCityToFavorite(location))
    }

    return (
        <Grid container style={{ paddingTop: 60 }} justifyContent='center'>
            <Grid item xs={8} style={{ paddingTop: 40 }}>
                <StyledAutoComplete
                    id="city"                                       
                    options={locations && locations}
                    autoHighlight
                    popupIcon={<MagnifingGlassIcon className={classes.magnifier} />}
                    filterOptions={(options, state) => options}
                    getOptionLabel={(option) => option.LocalizedName || ''}
                    onChange={(e, newValue) => setCurrentLocation(locations.find(item => item.Key === newValue?.Key))}                                       
                    onInputChange={(event, newInputValue) => {
                        setSearch(newInputValue)
                    }}
                    renderInput={(params) => {
                        return (
                            <TextField
                                placeholder="City"
                                {...params}
                                inputProps={{
                                    ...params.inputProps,
                                }}
                            />
                        )
                    }}
                />
            </Grid>
            {!weatherLoading && location && location.currentWeather && <Grid item xs={10} className={classes.currentWeatherContainer}>
                <Grid container>
                    <Grid item xs={12} style={{ paddingRight: 20, paddingLeft: 20 }}>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                 <Grid container>
                                    <Grid item>
                                        <LocationCityIcon style={{ fontSize: 40, fill: '#1CAFFF' }} />
                                    </Grid>
                                    <Grid item>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography variant='h1' className={classes.center}>{location.locationName}</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant='subtitle2' className={classes.center}>{location.currentWeather[0].Temperature.Metric.Value} {location.currentWeather[0].Temperature.Metric.Unit}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid container justifyContent='flex-end'>
                                    {favorite ?
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            className={classes.favoriteButton}
                                            startIcon={<FavoriteIcon />}
                                            onClick={(e) => removeFromFavorite()}
                                        >
                                            Remove from Favorite
                                        </Button> :
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            className={classes.favoriteButton}
                                            startIcon={<FavoriteBorderIcon />}
                                            onClick={(e) => addToFavorite()}
                                        >
                                            Add to Favorite
                                        </Button>}
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {/* <ScatteredClouds /> */}
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent='space-around' className={classes.forecastContainer}>
                            {/* five day forecast */}
                            {!forecastLoading && forecast && forecast.DailyForecasts.map((day, i) => (
                                <Grid item xs={12} sm={8} md={2} style={{ margin: 5 }} key={i}>
                                    <Paper elevation={3} className={classes.itemWeather}>
                                        <Grid container justifyContent='center'>
                                            <Grid item xs={12}>
                                                <Typography className={classes.center} variant='subtitle1'>{moment(day.Date).format('dddd')}</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography className={classes.center} variant='subtitle2'>{day.Temperature.Maximum.Value} {day.Temperature.Maximum.Unit}</Typography>
                                            </Grid>
                                            <Grid item xs={12} >
                                                <Grid container justifyContent='center'>
                                                    <CloudQueueIcon style={{ fill: '#1CAFFF' }} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
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
        border: `1px solid ${theme.palette.primary.main}`,
        marginTop: 40,
        padding: 20,
        borderRadius: 4,
        backgroundColor: theme.palette.background.container

    },
    magnifier: {
        width: 20,
        height: 20,
        marginRight: 10,
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
    border: {
        border: '1px solif #E1EBEE'
    },
    favoriteButton: {
        textTransform: 'capitalize',
        width: 250,
        backgroundColor: theme.palette.button.main,
        '&:hover': {
            backgroundColor: theme.palette.button.hover
        },
        color: theme.palette.button.text
    },
    itemWeather: {
        backgroundColor: theme.palette.background.paper,
        padding: 5
    },



}))

export const StyledAutoComplete = withStyles((theme) => ({
    popupIndicatorOpen: {
        transform: 'rotate(0deg)',
    },
    root: {
        '& .MuiFormControl-root ': {

            '& .MuiInputBase-input': {
                color: theme.palette.text.main, // Text color
            },
            '& .MuiInput-underline:before': {
                borderBottomColor: theme.palette.input.placeholder, // Semi-transparent underline
            },
            '& .MuiInput-underline:hover:before': {
                borderBottomColor: theme.palette.input.placeholder, // Solid underline on hover
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: theme.palette.input.underline, // Solid underline on focus
            },
        }
    },
    inputRoot: {
        '&.MuiOutlinedInput-root ': {
            borderRadius: 5,
            height: '45px',

        },
        '&.MuiIconButton-root': {
            color: '#212529'
        },

        color: theme.palette.input.placeholder,
        fontWeight: 300,
        fontSize: 16,
        backgroundColor: 'inherit',
        "& input::placeholder": {
            color: theme.palette.input.placeholder,
            fontSize: 16,
            opacity: 1
        },

        '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
            padding: '3.3px 0'
        },
        '&.MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
            padding: '2px 8px 4px 8px'
        },
        '& .MuiOutlinedInput-notchedOutline': {

            border: 'none'
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {

            border: 'none'
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {            
            border: 'none'
        }
    },
    paper: {
        '&.MuiAutocomplete-paper': {
            backgroundColor: theme.palette.input.main,
            margin: 0,            
            borderRadius: 5,
            padding: 0,
            width: '100%'
        },
        '& .MuiAutocomplete-noOptions': {
            color: '#B6B6B6',
            fontSize: 14
        }
    },
    listbox: {
        '&.MuiAutocomplete-listbox': {
            '&::-webkit-scrollbar': {
                width: '3px',
                height: '3px'

            },
            '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 5px grey',
                borderRadius: '10px'                
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#FFFFFF',
                borderRadius: '10px'
            },
          
        }
    },
    popupIndicator: {
        '&.MuiAutocomplete-popupIndicator': {
            color: '#B6B6B6',
            '& .MuiSvgIcon-root': {
                width: '0.8em'
            }
        }
    },
    option: {
        '&.MuiAutocomplete-option': {
            color: '#B6B6B6',
            fontSize: 14,
            '&:hover': {
                backgroundColor: theme.palette.background.paper
            }
        }
    },
    clearIndicator: {
        '&.MuiAutocomplete-clearIndicator': {
            color: '#B6B6B6',
            '& .MuiSvgIcon-fontSizeSmall': {
                width: '0.6em'
            }
        }
    }
}))(Autocomplete)