
import './App.css';
import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import WeatherPage from './pages/WeatherPage'
import FavoritePage from './pages/FavoritePage'
import HeaderComponent from './components/HeaderComponent';

function App() {

  const mainTheme = createTheme({
    typography: {
      
      fontFamily: [
        ` 'Roboto',
          sans-serif
          `
      ].join(','),
      
    },
    overrides: {
      
    }
  })

  return (
    <ThemeProvider theme={mainTheme}> 
        <HeaderComponent />     
        <div style={{ 
        height: '100vh',
        backgroundColor: '#F6F6F6' }}>
          <Switch>
            <Route exact path='/' component={WeatherPage} />
            <Route exact path='/favorite' component={FavoritePage} />            
          </Switch>
        </div>
      
    </ThemeProvider>
  );
}

export default App;
