import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles, fade, makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search';

import { openDialog } from '../../redux/Dialog/actions';
import { searchValue } from '../../redux/Products/actions';
const useStyles = makeStyles((theme) => ({
    form: {
        display: "flex",
        alignItems: "center"
    },
    searchBtn: {
        marginLeft: '5px'
    },
    inputField: {
        color: 'black'
    },
    inputRoot: {
        backgroundColor: 'white',
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

}));
export default function SearchTitle() {
    const classes = useStyles();
    const [searchedValue, setValue] = useState();
    const [options, setOptions] = useState([]);
    const dispatch = useDispatch();
    const { products } = useSelector(({ productState }) => productState);

    useEffect(() => {
        if (products.length > 0) {
            setOptions(products);
        }
    }, [products])


    const handleChange = (event, value, reason) => {
        // console.log("s: ", searchedValueOption, value)
        if (reason === 'select-option') {
            setValue(value.title);
            let product = products.filter(ele => ele.id === value.id)[0];
            dispatch(openDialog(product))
        }
    };
    const handleInput = (event, value, reason) => {
        console.log("input: ", value);
        if (reason === "input") {
            setValue(value)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searchValue(searchedValue));
    }

    return (
        <div data-testid="search-title" >
            <form onSubmit={handleSubmit} className={classes.form}>
                <Autocomplete
                    id="search-title"
                    options={options}
                    classes={{ input: classes.inputField, inputRoot: classes.inputRoot }}
                    getOptionLabel={(option) => option.title}
                    onChange={handleChange}
                    onInputChange={handleInput}
                    inputValue={searchedValue}
                    size="small"
                    style={{ width: 300, display: 'inline-block' }}
                    renderInput={(params) => <TextField {...params} label="Search Title" variant="outlined" />}
                />
                <Button variant="contained" data-testid="search-btn" className={classes.searchBtn} color="primary" type="submit">
                    <SearchIcon />
                </Button>
            </form>

        </div>

    )
}