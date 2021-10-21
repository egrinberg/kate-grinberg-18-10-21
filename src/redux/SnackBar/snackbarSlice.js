import { createSlice } from '@reduxjs/toolkit';


export const snackbarSlice = createSlice({
    name: 'snackBar',
    initialState: {
        visible: false,
        timeout: 3000,
        message: '',
        type: 'success'// error | warning | info | success
    },
    reducers: {
        setSnackbar: (state, action) => {                
                state.visible = true
                state.timeout = action.payload.timeout
                state.message = action.payload.message
                state.type = action.payload.type
        },
        disableSnackbar: (state, action) => {            
            state.visible = false
        },

    },
});

let timeoutInstance = null;

export const disableSnackBar = () => dispatch =>{
  dispatch(disableSnackBar());
  clearTimeout(timeoutInstance);
}

export const setSnackBar = (type, message, timeout=2000) => dispatch =>{
  dispatch(setSnackbar({type,message,timeout}))
  timeoutInstance = setTimeout(() => {
    dispatch(disableSnackbar());
  }, timeout);
}

export const {
    setSnackbar,
    disableSnackbar,
} = snackbarSlice.actions;

export default snackbarSlice.reducer;

