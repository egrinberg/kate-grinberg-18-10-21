
import './App.css';
import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import WeatherPage from './pages/WeatherPage'
import FavoritePage from './pages/FavoritePage'
import HeaderComponent from './components/HeaderComponent';
import SnackBar from './components/SnackBar';
import { lightThemeColors, darkThemeColors } from './constants';
import { useSelector } from 'react-redux';

function App() {

  const theme = useSelector(state => state.weather.theme)

  const darkTheme = createTheme({
    palette: darkThemeColors,
    typography: {
      fontFamily: ['Urbanist', 'Quicksand', 'sans-serif'].join(','),
      h1: {
        fontSize: 20,
        color: '#6C7678'
      },
      subtitle1: {
        fontSize: 16,
        fontWeight: 500,
        color: '#6C7678'
      },
      subtitle2: {
        fontSize: 16,
        color: '#FFFFFF'
      }

    },
    overrides: {

    }
  })

  const lightTheme = createTheme({
    palette: lightThemeColors,
    typography: {
      fontFamily: ['Urbanist', 'Quicksand', 'sans-serif'].join(','),
      h1: {
        fontSize: 20,
        color: '#BABABA'
      },
      subtitle1: {
        fontSize: 16,
        fontWeight: 500,
        color: '#BABABA'
      },
      subtitle2: {
        fontSize: 16,
        color: '#1A1A1A'
      }

    },
    overrides: {

    }
  })

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <HeaderComponent />
      <div style={{
        minHeight: '100vh',
        backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F6F6F6'
      }}>
        <SnackBar />
        <Switch>
          <Route exact path='/' component={WeatherPage} />
          <Route exact path='/favorite' component={FavoritePage} />
        </Switch>
      </div>

    </ThemeProvider>
  );
}

export default App;
