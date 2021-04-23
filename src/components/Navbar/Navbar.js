import { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search';
import SearchTitle from './SearchTitle';


const useStyles = makeStyles((theme) => ({
    appbar: {
        padding: '12px',
    },
    title: {
        textAlign: 'left',
        paddingLeft: '1rem',
        fontWeight: 500,
        fontSize: '1.3rem',
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.5rem',
            paddingLeft: '4rem'
        },
    },
    form: {
        display: "flex",
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(1),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 1),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },

}));

export default function Navbar() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [searchValue, setSearchValue] = useState('')
    const handleSearch = (e) => {
        e.preventDefault();
        // console.log("searchValue: ", searchValue)
    }
    const handleInput = (e) => {
        setSearchValue(e.target.value);
    }

    return (
        <div className="Navbar">
            <AppBar position="fixed" className={classes.appbar}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography component="h1" className={classes.title}>
                            JSON Data
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <SearchTitle />
                        {/* <form onSubmit={handleSearch} className={classes.form}>
                            <div className={classes.search}>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={handleInput}
                                    value={searchValue}
                                />
                            </div>
                            <Button variant="contained" color="primary" type="submit">
                                <SearchIcon />
                            </Button>
                        </form> */}
                    </Grid>

                </Grid>
            </AppBar>

        </div>
    );
}
