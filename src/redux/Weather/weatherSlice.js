import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

import { BASE_URL, END_POINT, API_KEY } from '../../constants';


export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        locations: null
    },
    reducers: {

        getLocations: (state, action) => {
            state.locations = action.payload.locations;
            
          },
       
    },
});
export const getLocationsData = (search) => async (dispatch) => {

   let params = new URLSearchParams();


  if (search !== undefined && search !== null && search !== '') {
    params.append('apikey', API_KEY)  
    params.append('search', search);
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
      const res = await axios.get(BASE_URL + END_POINT.LOCATION,request);
  
      if (res.status === 200) {
        dispatch(getLocations(res.data));
      }
    } catch (error) { }
};

export const {
    getLocations
} = weatherSlice.actions;

export default weatherSlice.reducer;