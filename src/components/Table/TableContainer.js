import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableView from './TableView';
import EditDialog from './EditDialog';
import { openDialog } from '../../redux/Dialog/actions';
import Error from './Error';

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        width: '90%',
        margin: 'auto',
        marginTop: '100px',
        marginBottom: "8px",
        maxWidth: "1200px",
        [theme.breakpoints.down("xs")]: {
            marginTop: '70px',
        }
    },
    loader: {
        position: 'absolute',
        top: 'calc(50% - 20px)',
        left: 'calc(50% - 20px)',
    },
}));

export default function TableContainer() {
    const dispatch = useDispatch();
    const classes = useStyles();
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
            // setTableRows(products);
            handleSearch();
        }
    }, [products]);
    useEffect(() => {
        handleSearch();
    }, [searchedValue])

    const handleSearch = () => {
        if (searchedValue.length > 0) {
            const rows = filterRows(products, searchedValue)
            setTableRows(rows);
        }
        else {
            setTableRows(products);
        }
    }
    const filterRows = (arr, value) => {
        return arr.filter(ele => {
            let rg = new RegExp(`${value}`, 'i');
            if (ele.title.match(rg)) {
                return true
            }
            return false;
        })
    }
    const showDialog = (ele) => {
        dispatch(openDialog(ele))
    }
    return (
        <div className={classes.tableContainer}>
            <EditDialog />
            {isError && <Error />}
            {!isError && !isLoading &&
                <TableView
                    tableRows={tableRows}
                    tableColumns={columns}
                    showDialog={showDialog}
                />
            }
            {isLoading && <CircularProgress className={classes.loader} data-testid="loader" />}
        </div>
    )
}