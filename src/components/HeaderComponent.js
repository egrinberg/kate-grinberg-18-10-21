import { Toolbar, AppBar, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react'

import { NavLink, useLocation, useHistory } from 'react-router-dom';



function HeaderComponent() {
    const classes = useStyles()
     
    const history = useHistory()  
    

    return (
        <AppBar position='fixed' elevation={0} className={classes.appBar}>
            <Toolbar style={{ paddingLeft: 20, minHeight: 50 }}>
                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Grid item xs={6}>
                        <Grid container alignItems='center'>
                            <Grid item xs={12}>
                                Herolo Home Task
                            </Grid>                           
                            
                        </Grid>
                        
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justifyContent='flex-end'>
                        <Button className={classes.logoutButton} onClick={() => history.push('/')}>
                            Home                           
                        </Button>  
                        <Button className={classes.logoutButton} onClick={() => history.push('/favorite')}>
                            Favorite                            
                        </Button> 
                        </Grid>
                         
                    </Grid>
                    
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderComponent

const useStyles = makeStyles((theme) => ({
    appBar: {
      backgroundColor: theme.palette.background.appbar,
    },    
    
  }));
