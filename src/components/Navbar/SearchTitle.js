import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search';

import { openDialog } from '../../redux/Dialog/actions';
import { searchValue } from '../../redux/Products/actions';

const useStyles = makeStyles((theme) => ({
    formContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    form: {
        display: "flex",
        alignItems: "center",
        backgroundColor: 'white',
        maxWidth: '300px'
    },
    searchBtn: {
        marginLeft: '5px',
        [theme.breakpoints.down('xs')]: {
            minWidth: '40px',
            padding: '3px',
        },
        [theme.breakpoints.down(450)]: {
            minWidth: '32px'
        }
    },
    inputField: {
        color: 'black'
    },
    inputRoot: {
        backgroundColor: 'white',
    },
    label: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
    },
    root: {
        display: 'inline-block',

        [theme.breakpoints.up('sm')]: {
            width: '250px',
        },
        [theme.breakpoints.up('md')]: {
            width: '320px',
        },
        [theme.breakpoints.down('xs')]: {
            width: '200px',
            "& label.MuiInputLabel-filled": {
                transform: "translate(12px, 8px) scale(1)",
            },
            "& label.Mui-focused": {
                display: 'none',
            },
            '& .MuiAutocomplete-inputRoot': {
                paddingTop: '0px'
            }
        },
        [theme.breakpoints.down(450)]: {
            width: '160px',
        }
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
    const [searchedValue, setValue] = useState("");
    const [options, setOptions] = useState([]);
    const dispatch = useDispatch();
    const { products } = useSelector(({ productState }) => productState);

    useEffect(() => {
        if (products.length > 0) {
            setOptions(products);
        }
    }, [products])


    const handleChange = (event, value, reason) => {
        if (reason === 'select-option') {
            setValue(value.title);
            let product = products.filter(ele => ele.id === value.id)[0];
            dispatch(openDialog(product))
        }
        if (reason === 'clear') {
            setValue("")
            dispatch(searchValue(""));
        }
    };
    const handleInput = (event, value, reason) => {
        if (reason === "input") {
            setValue(value)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searchValue(searchedValue));
    }

    return (
        <div data-testid="search-title" className={classes.formContainer} >
            <form onSubmit={handleSubmit} className={classes.form} id="search-form">
                <Autocomplete
                    id="search-title"
                    options={options}
                    classes={{
                        input: classes.inputField,
                        inputRoot: classes.inputRoot,
                        root: classes.root,
                    }}
                    getOptionLabel={(option) => option.title}
                    onChange={handleChange}
                    onInputChange={handleInput}
                    inputValue={searchedValue}
                    size="small"
                    renderInput={(params) => <TextField {...params} label="Search Title" variant="filled" />}
                />
            </form>
            <Button variant="contained" data-testid="search-btn" form="search-form" className={classes.searchBtn} color="primary" type="submit">
                <SearchIcon />
            </Button>

        </div>

    )
}