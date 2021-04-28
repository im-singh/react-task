import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SearchTitle from './SearchTitle';


const useStyles = makeStyles((theme) => ({
    appbar: {
        padding: '12px',
    },
    title: {
        textAlign: 'left',
        // paddingLeft: '1rem',
        fontWeight: 500,
        fontSize: '1rem',
        paddingTop: "3px",
        [theme.breakpoints.up(460)]: {
            fontSize: '1.3rem',
            paddingTop: "0px",

        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.5rem',
            paddingLeft: '2rem'
        },
        [theme.breakpoints.up('md')]: {
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
    return (
        <div className="Navbar" data-testid="navbar">
            <AppBar position="fixed" className={classes.appbar}>
                <Grid container spacing={3}>
                    <Grid item xs={5} md={6}>
                        <Typography component="h1" className={classes.title}>
                            Product Details
                        </Typography>
                    </Grid>
                    <Grid item xs={7} md={6}>
                        <SearchTitle />
                    </Grid>

                </Grid>
            </AppBar>

        </div>
    );
}
