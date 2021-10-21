import axios from 'axios';
import { createSlice, current } from '@reduxjs/toolkit';

import { BASE_URL, END_POINT, API_KEY } from '../../constants';
import * as actionSnackBar from "../SnackBar/snackbarSlice";
import data from '../../config/dummy.json'


export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        currentLocation: {
            locationName: 'Tel Aviv',
            locationKey: '215854',
            currentWeather: null,
            forecast: null,
            loadingWeather: false,
            loadingForecast: false
        },
        favorites: [],
        locations: [],
        theme: 'dark'
    },
    reducers: {
        setLocations: (state, action) => {
            state.locations = action.payload;
        },
        setCurrentLocation: (state, action) => {
            state.currentLocation.locationName = action.payload.LocalizedName
            state.currentLocation.locationKey = action.payload.Key
            
        },
        setCurrentLocationWeather: (state, action) => {
            state.currentLocation.currentWeather = action.payload
            state.currentLocation.loadingWeather = false
        },
        setWeatherForecast: (state, action) => {
            state.currentLocation.forecast = action.payload
            state.currentLocation.loadingForecast = false
        },
        addToFavorite: (state, action) => {
            const favorites = state.favorites
            const favorite = {
                id: action.payload.locationKey,
                name: action.payload.locationName,
                currentWeather: action.payload.currentWeather
            }
            favorites.push(favorite)
            state.favorites = favorites
        },
        removeFromFavorite: (state, action) => {
            const newFavorites = state.favorites.filter((fav) => fav.id !== action.payload.locationKey)
            state.favorites = newFavorites
        },
        setTheme: (state, action) => {
            state.theme = action.payload
        },
        setLoadingWeather: (state,action) => {
            state.currentLocation.loadingWeather = action.payload
        },
        setLoadingForecast: (state,action) => {
            state.currentLocation.loadingForecast = action.payload
        }


    },
});

export const getCurrentWeather = (locationId) => async (dispatch) => {
    setLoadingWeather(true)
    let params = new URLSearchParams();
    params.append('apikey', API_KEY);
    let request = {
        params,
        paramsSerializer: (params) => {
            let result = '';
            for (const [key, value] of params) {
                result += `${key}=${encodeURIComponent(value)}&`;
            }
            return result.substr(0, result.length - 1);
        },
    };

    try {
        const res = await axios.get(BASE_URL + END_POINT.CURRENT_WEATHER + '/' + locationId, request);

        if (res.status === 200) {
            dispatch(setCurrentLocationWeather(res.data));
        }

    } catch (error) {
        
        dispatch(actionSnackBar.setSnackBar("error", 'Server error', 2000));
    }
};

export const getWeatherForecast = (locationId) => async (dispatch) => {
    setLoadingForecast(true)
    let params = new URLSearchParams();
    params.append('apikey', API_KEY);
    params.append('metric', 'true')
    let request = {
        params,
        paramsSerializer: (params) => {
            let result = '';
            for (const [key, value] of params) {
                result += `${key}=${encodeURIComponent(value)}&`;
            }
            return result.substr(0, result.length - 1);
        },
    };
    
    try {
        const res = await axios.get(BASE_URL + END_POINT.FORECAST + '/' + locationId, request);

        if (res.status === 200) {        
            dispatch(setWeatherForecast(res.data));
        }
    } catch (error) {
        
        dispatch(actionSnackBar.setSnackBar("error", 'Server error', 2000));
    }
};

export const getLocationsData = (search) => async (dispatch) => {
    
    let params = new URLSearchParams();
    if (search !== undefined && search !== null && search !== '') {
        params.append('apikey', API_KEY);
        params.append('q', search);
    }


    let request = {
        params,
        paramsSerializer: (params) => {
            let result = '';
            for (const [key, value] of params) {
                result += `${key}=${encodeURIComponent(value)}&`;
            }
            return result.substr(0, result.length - 1);
        },
    };

    try {
        const res = await axios.get(BASE_URL + END_POINT.LOCATIONS, request);

        if (res.status === 200) {
            dispatch(setLocations(res.data));
        }     
        
    } catch (error) {
        
        dispatch(actionSnackBar.setSnackBar("error", 'Server error', 2000));
    }
};

export const addCityToFavorite = (city) => (dispatch) => {
    try {
        dispatch(addToFavorite(city))
        dispatch(actionSnackBar.setSnackBar('success', `${city.locationName} is added to your favorites`, 3000))
    }
    catch (error) {
        dispatch(actionSnackBar.setSnackBar("error", 'Something went wrong', 2000));
    }
}

export const removeCityToFavorite = (city) => (dispatch) => {
    try {
        dispatch(removeFromFavorite(city))
        dispatch(actionSnackBar.setSnackBar('success', `${city.locationName} is removed from your favorites`, 3000))
    }
    catch (error) {
        dispatch(actionSnackBar.setSnackBar("error", 'Something went wrong', 2000));
    }
}




export const {
    setLocations,
    setCurrentLocation,
    setCurrentLocationWeather,
    setWeatherForecast,
    addToFavorite,
    removeFromFavorite,
    setTheme,
    setLoadingWeather,
    setLoadingForecast
} = weatherSlice.actions;

export default weatherSlice.reducer;



