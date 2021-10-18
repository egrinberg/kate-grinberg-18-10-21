import React from 'react'
import {Grid, TextField, Typography} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useSelector, useDispatch } from 'react-redux'

function WeatherPage() {

    console.log('hereeee')
    // const locations = useSelector(state => state.weather.locations)
    const locations = [
        {
          "Version": 1,
          "Key": "215854",
          "Type": "City",
          "Rank": 31,
          "LocalizedName": "Tel Aviv",
          "Country": {
            "ID": "IL",
            "LocalizedName": "Israel"
          },
          "AdministrativeArea": {
            "ID": "TA",
            "LocalizedName": "Tel Aviv"
          }
        },
        {
          "Version": 1,
          "Key": "3431644",
          "Type": "City",
          "Rank": 45,
          "LocalizedName": "Telanaipura",
          "Country": {
            "ID": "ID",
            "LocalizedName": "Indonesia"
          },
          "AdministrativeArea": {
            "ID": "JA",
            "LocalizedName": "Jambi"
          }
        },
        {
          "Version": 1,
          "Key": "300558",
          "Type": "City",
          "Rank": 45,
          "LocalizedName": "Telok Blangah New Town",
          "Country": {
            "ID": "SG",
            "LocalizedName": "Singapore"
          },
          "AdministrativeArea": {
            "ID": "05",
            "LocalizedName": "South West"
          }
        },
        {
          "Version": 1,
          "Key": "325876",
          "Type": "City",
          "Rank": 51,
          "LocalizedName": "Telford",
          "Country": {
            "ID": "GB",
            "LocalizedName": "United Kingdom"
          },
          "AdministrativeArea": {
            "ID": "TFW",
            "LocalizedName": "Telford and Wrekin"
          }
        },
        {
          "Version": 1,
          "Key": "169072",
          "Type": "City",
          "Rank": 51,
          "LocalizedName": "Telavi",
          "Country": {
            "ID": "GE",
            "LocalizedName": "Georgia"
          },
          "AdministrativeArea": {
            "ID": "KA",
            "LocalizedName": "Kakheti"
          }
        },
    ]

    return (
        <Grid container justifyContent='center' style={{paddingTop: 60}}>
            <Grid item xs={8}>
                
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={locations.map((option) => option.LocalizedName)}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search input"
                        margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                    )}
                />

            </Grid>
            <Grid item xs={10}>

            </Grid>

        </Grid>
    )
}

export default WeatherPage

