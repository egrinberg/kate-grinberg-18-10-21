export const BASE_URL = process.env.REACT_APP_BASE_URL + '/';
export const API_KEY = 'KhoZ0U2NnE57nkjeogZoA72E82vgsW44'


export const END_POINT = {
  LOCATIONS: 'locations/v1/cities/autocomplete',
  CURRENT_WEATHER:'currentconditions/v1',
  FORECAST: 'forecasts/v1/daily/5day' 
};


export const darkThemeColors = {
    background: { main: '#1A1A1A', appbar: '#292929', container: '#292929', paper: '#333333',input: '#232323' },
    primary: { main: '#292929', light: '#656565' },
    secondary: { main: '#292929' },    
    success: { main: '#1B9B48' },
    error: { main: '#EF2F10' },    
    button: { main: '#0396E6', hover: '#1CAFFF', text: '#F9F9F9',  link: '#179AE1' },     
    text: { main: '#F9F9F9', light: '#c4c4c4', input: '#AAAAAA', secondary: '#B7B7B7'  }, 
    input: {bottomLine: '#3A3A3A',underline: '#0396E6',placeholder: '#6C7678'},
    toggle: {hover: '#3A3A3A' }


  };
  
  
  
  export const lightThemeColors = {
    background: { main: '#f6f6f6', appbar: '#d9d9d9', container: '#ffffff', paper: '#F6F6F6', input: '#ffffff' },
    primary: { main: '#ffffff', light: '#e4e4e4' },
    secondary: { main: '#e4e4e4'}, 
    success: { main: '#1B9B48' },
    error: { main: '#F30B0B' },     
    button: { main: '#0396E6', hover: '#1CAFFF', text: '#F9F9F9',  link: '#179AE1'}, 
    text: { main: '#1A1A1A', light: '#CBD6D9', input: '#F9F9F9',  secondary: '#6C7678'},
    input: {bottomLine: '#E7E7E7',underline: '#0396E6',placeholder: '#BABABA'},
    toggle: {hover: '#E7E7E7'}

  };