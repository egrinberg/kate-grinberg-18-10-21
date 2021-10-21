import { combineReducers } from '@reduxjs/toolkit'
import weatherSlice from '../redux/Weather/weatherSlice'
import snackBarSLice from '../redux/SnackBar/snackbarSlice'



const RootReducer = combineReducers({
   weather: weatherSlice,
   snackBar: snackBarSLice
})



export default RootReducer