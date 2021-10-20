import axios from 'axios';
import { createSlice, current } from '@reduxjs/toolkit';

import { BASE_URL, END_POINT, API_KEY } from '../../constants';
import data from '../../config/dummy.json'


export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        currentLocation: {           
            locationName: 'Tel Aviv',
            locationKey: '215854',    
            currentWeather: null,
            forecast: null            
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
        },
        setWeatherForecast: (state, action) => {
            state.currentLocation.forecast = action.payload
        },
        addToFavorite: (state,action) => {
            console.log(action.payload)
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
        setTheme: (state,action) => {
            state.theme = action.payload
        }


    },
});

export const getCurrentWeather = (locationId) => async (dispatch) => {
    
    let params = new URLSearchParams();    
    params.append('apikey', 'e3ular37pllAU8UwDpNojKUNWgxhNQAG');   
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
        // const res = await axios.get(BASE_URL + END_POINT.CURRENT_WEATHER + '/' + locationId, request);
        const res = data.currentWeather

        // if (res.status === 200) {
        //     dispatch(setCurrentLocationWeather(res.data));
        // }
        // const res = data.locations
        dispatch(setCurrentLocationWeather(res));
        
    } catch (error) { }
};

export const getWeatherForecast = (locationId) => async (dispatch) => {
    
    let params = new URLSearchParams();    
    params.append('apikey', 'e3ular37pllAU8UwDpNojKUNWgxhNQAG');   
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
        // const res = await axios.get(BASE_URL + END_POINT.CURRENT_WEATHER + '/' + locationId, request);
        const res = data.DailyForecasts

        // if (res.status === 200) {
        //     dispatch(setCurrentLocationWeather(res.data));
        // }
        // const res = data.locations
        dispatch(setWeatherForecast(res));
        
    } catch (error) { }
};

export const getLocationsData = (search) => async (dispatch) => {
    
    let params = new URLSearchParams();
    if (search !== undefined && search !== null && search !== '') {
        params.append('apikey', 'e3ular37pllAU8UwDpNojKUNWgxhNQAG');
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
        // const res = await axios.get(BASE_URL + END_POINT.LOCATIONS, request);

        // if (res.status === 200) {
        //     dispatch(setLocations(res.data));
        // }
        const res = data.locations
        dispatch(setLocations(res));
        
    } catch (error) { }
};




export const {
    setLocations,
    setCurrentLocation,
    setCurrentLocationWeather,
    setWeatherForecast,
    addToFavorite,
    removeFromFavorite,
    setTheme
} = weatherSlice.actions;

export default weatherSlice.reducer;

