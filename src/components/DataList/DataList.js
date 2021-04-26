import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

import { openDialog } from '../../redux/Dialog/actions';

const useStyles = makeStyles((theme) => ({
    loader: {
        position: 'absolute',
        top: 'calc(50% - 20px)',
        left: 'calc(50% - 20px)',
    },
    list: {
        margin: 'auto',
        width: '70%',
        backgroundColor: '#424242',
        color: 'white',
        [theme.breakpoints.down('sm')]: {
            width: '95%',
        }
    },
    error: {
        textAlign: 'center',
        color: 'red'
    }
}));
export default function DataList() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { products, isLoading, isError } = useSelector(({ productState }) => productState)

    const showDialog = (ele) => {
        dispatch(openDialog(ele))
    }
    if (isError) {
        return <p className={classes.error}>Server error</p>
    }
    if (products.length > 0) {
        return (
            <List className={classes.list} data-testid="list">
                {products.map((ele, idx) => {
                    return (
                        <ListItem key={idx} button onClick={() => showDialog(ele)} data-testid="list-item">
                            <ListItemText primary={`${idx + 1} ${ele.title}`} />
                        </ListItem>
                    )
                })}
            </List>
        )
    }
    return <CircularProgress className={classes.loader} data-testid="loader" />

}