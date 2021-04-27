import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { matchSorter } from 'match-sorter'

import TableView from './TableView';
import EditDialog from './EditDialog';
import { openDialog } from '../../redux/Dialog/actions';
import { Typography } from '@material-ui/core';
import Error from './Error';

const useStyles = makeStyles({
    tableContainer: {
        width: '90%',
        margin: 'auto',
        marginTop: '65px',
    },
    loader: {
        position: 'absolute',
        top: 'calc(50% - 20px)',
        left: 'calc(50% - 20px)',
    },
});



export default function TableContainer() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [allRows, setAllRows] = useState([])
    const { products, isLoading, searchedValue, isError } = useSelector(({ productState }) => productState);
    const [tableRows, setTableRows] = useState([]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Sr.no',
                accessor: 'sr_no', // accessor is the "key" in the data
            },
            {
                Header: 'Title',
                accessor: 'title',
            },
            {
                Header: 'Description',
                accessor: 'description',
            },
        ],
        []
    )
    useEffect(() => {
        if (!isLoading && products.length > 0) {
            // let rows = createTableRows();
            setTableRows(products);
        }
    }, [products]);
    useEffect(() => {
        handleSearch();
    }, [searchedValue])
    // const handleInputChange = (e) => {
    //     setSearchValue(e.target.value);
    // }
    const handleSearch = () => {
        if (searchedValue.length > 0) {
            const rows = matchSorter(products, searchedValue, { keys: ['title'] })
            setTableRows(rows);
        }
        else {
            setTableRows(products);
        }
    }
    const showDialog = (ele) => {
        dispatch(openDialog(ele))
    }
    return (
        <div className={classes.tableContainer}>
            <EditDialog />
            {isError && <Error />}
            {!isError && !isLoading && <TableView
                tableRows={tableRows}
                tableColumns={columns}
                showDialog={showDialog}
            />
            }
            {isLoading && <CircularProgress className={classes.loader} data-testid="loader" />}

        </div>
    )
}