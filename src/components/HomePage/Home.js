import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Navbar from '../Navbar/Navbar';
import { fetchProductList } from '../../redux/Products/actions';
import TableContainer from '../Table/TableContainer';


export default function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProductList());
    }, [])
    return (
        <div className="home-page" data-testid="home-page">
            <Navbar />
            <TableContainer />
        </div>
    );
}
