import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { openDialog } from '../../redux/Dialog/actions';

export default function SearchTitle() {
    const [selected, setValue] = useState();
    const [options, setOptions] = useState();
    const dispatch = useDispatch();
    const { products } = useSelector(({ productState }) => productState);
    const customStyle = {
        control: styles => ({ ...styles, backgroundColor: 'white' }),
        option: styles => {
            return {
                ...styles, backgroundColor: '#dbdbdb', color: 'black',
                ':active': {
                    backgroundColor: 'blue',
                }
            }
        }

    }
    useEffect(() => {
        if (products.length > 0) {
            let options = products.map(ele => {
                let obj = { value: ele.title, label: ele.title, id: ele.id };
                return obj;
            });
            setOptions(options);
        }
    }, [products])


    const handleChange = (selectedOption, action) => {
        console.log('acitons: ', action, selectedOption);
        setValue(selectedOption);
        let product = products.filter(ele => ele.id === selectedOption.id)[0];
        console.log("pro: ", product)
        dispatch(openDialog(product))

    };
    const handleFocus = () => {
        setValue('')
    }
    return (
        <div data-testid="search-title">
            <Select
                value={selected}
                isClearable={true}
                isSearchable={true}
                onChange={handleChange}
                placeholder={'Search title..'}
                options={options}
                styles={customStyle}
                onFocus={handleFocus}
            />
        </div>

    )
}