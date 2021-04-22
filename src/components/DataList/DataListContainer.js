import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import DataList from './DataList';
import EditDialog from '../HomePage/EditDialog';
import { fetchProductList } from '../../redux/Products/actions';

const useStyles = makeStyles((theme) => ({
    listContainer: {
        [theme.breakpoints.down('sm')]: {
            padding: '0px',
        },
        height: 'calc(100vh - 60px)',
        marginTop: '60px',
        padding: '0px 24px',
        backgroundColor: '#333',
        overflow: 'auto',

    }
}));
export default function DataListContainer() {
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(fetchProductList());
    }, [])
    return (
        <div className={classes.listContainer}>
            <EditDialog />
            <DataList />
        </div>

    );
}