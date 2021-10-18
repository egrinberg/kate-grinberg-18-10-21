import { combineReducers } from '@reduxjs/toolkit'
import weatherSlice from '../redux/Weather/weatherSlice'



const RootReducer = combineReducers({
   weather: weatherSlice
})



export default RootReducer